import os
import json
import asyncio
from typing import Dict, List, Optional, Set, Any
import google.generativeai as genai
from datetime import datetime
import re
from serpapi import GoogleSearch
import logging
import time
import socket

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 网络优化配置
def configure_network():
    """配置网络设置以优化连接"""
    try:
        # 设置环境变量以优化gRPC连接
        os.environ['GRPC_DNS_RESOLVER'] = 'native'
        
        # 如果设置了强制IPv4环境变量，则强制使用IPv4
        if os.getenv('FORCE_IPV4', '').lower() in ('true', '1', 'yes'):
            logger.info("强制使用IPv4连接")
            # 覆盖socket.getaddrinfo以只返回IPv4地址
            original_getaddrinfo = socket.getaddrinfo
            def ipv4_only_getaddrinfo(*args, **kwargs):
                kwargs['family'] = socket.AF_INET
                return original_getaddrinfo(*args, **kwargs)
            socket.getaddrinfo = ipv4_only_getaddrinfo
            
    except Exception as e:
        logger.warning(f"网络配置设置失败: {e}")

# 在模块加载时配置网络
configure_network()


class JapaneseMigrationAgent:
    def __init__(
        self, 
        google_api_key: str = None,
        serpapi_key: str = None
    ):
        # 获取API密钥
        google_api_key = google_api_key or os.getenv('GOOGLE_API_KEY')
        serpapi_key = serpapi_key or os.getenv('SERPAPI_API_KEY')

        # 初始化 Google Generative AI
        try:
            genai.configure(api_key=google_api_key)
            self.model = genai.GenerativeModel('gemini-2.0-flash')
        except Exception as e:
            raise RuntimeError("モデルの初期化に失敗しました: {}".format(e))
            
        # 初始化搜索工具
        self.serpapi_key = serpapi_key
        
        # 对话历史
        self.chat_history = []
        
        # 移住相关关键词集合（优化查找性能）
        self.migration_keywords: Set[str] = {
            '移住', '転居', '引っ越し', '移転', '地方', '田舎', '都道府県', '市町村',
            '支援制度', '補助金', '助成金', '住宅', '仕事', '就職', '農業', '漁業',
            '子育て', '教育', '医療', '交通', 'アクセス', '生活費', '物価', '自然',
            '北海道', '青森', '岩手', '宮城', '秋田', '山形', '福島',
            '茨城', '栃木', '群馬', '埼玉', '千葉', '東京', '神奈川',
            '新潟', '富山', '石川', '福井', '山梨', '長野', '岐阜', '静岡', '愛知',
            '三重', '滋賀', '京都', '大阪', '兵庫', '奈良', '和歌山',
            '鳥取', '島根', '岡山', '広島', '山口',
            '徳島', '香川', '愛媛', '高知',
            '福岡', '佐賀', '長崎', '熊本', '大分', '宮崎', '鹿児島', '沖縄',
            '基本情報', '希望条件', '移住理由', '年代', '居住地', '家族構成',
            'ライフスタイル', 'キャリア', '住まい', '不安', '懸念', '移住計画'
        }
        
        # 预编译正则表达式（性能优化）
        self.injection_patterns = [
            re.compile(pattern, re.IGNORECASE) for pattern in [
                r'ignore\s+previous',
                r'forget\s+everything',
                r'act\s+as',
                r'pretend\s+to',
                r'system\s*:',
                r'</?\w+>',  # XML标签
                r'無視',
                r'忘れ',
                r'新しい指示'
            ]
        ]
        
        # 字段优先级（用于智能截断）
        self.field_priority = {
            '基本情報': 1, '移住理由': 1, '年代': 1, '現在の居住地': 1, '家族構成': 1,
            '希望条件': 2, 'ライフスタイル': 2, '仕事': 2, 'キャリア': 2, '住まい': 2,
            '教育': 3, '子育て': 3, '不安': 3, '移住計画': 3
        }
        
        # 安全检查缓存（避免重复检查）
        self._security_cache = {}
        
    def _detect_prompt_injection(self, user_input: str) -> bool:
        """检测提示词注入攻击（优化版）"""
        if not user_input:
            return False
        
        # 使用缓存避免重复检查
        input_hash = hash(user_input)
        if input_hash in self._security_cache:
            return self._security_cache[input_hash]
            
        user_input_str = str(user_input)
        
        # 使用预编译的正则表达式
        for pattern in self.injection_patterns:
            if pattern.search(user_input_str):
                logger.warning(f"Potential prompt injection detected: {pattern.pattern}")
                self._security_cache[input_hash] = True
                return True
        
        self._security_cache[input_hash] = False
        return False
     
    def _sanitize_user_input(self, user_input: str) -> str:
        """清理用户输入（优化版）"""
        if not user_input:
            return ""
        
        sanitized = str(user_input)
        
        # 移除XML/HTML标签
        sanitized = re.sub(r'<[^>]*>', '', sanitized)
        
        # 压缩多余空白字符
        sanitized = re.sub(r'\s+', ' ', sanitized.strip())
        
        # 智能截断（提高到2000字符）
        if len(sanitized) > 2000:
            sanitized = self._smart_truncate(sanitized, 2000)
            logger.info(f"User input optimized: {len(user_input)} -> {len(sanitized)} characters")
        
        return sanitized

    def _smart_truncate(self, text: str, max_length: int) -> str:
        """智能截断，优先保留重要信息"""
        if len(text) <= max_length:
            return text
            
        # 计算字段重要性分数
        field_scores = {}
        for field, priority in self.field_priority.items():
            if field in text:
                field_scores[field] = priority
        
        # 按重要性排序保留信息
        if field_scores:
            # 找到最重要的字段位置
            important_fields = sorted(field_scores.items(), key=lambda x: x[1])
            preserved_text = ""
            
            for field, _ in important_fields:
                field_start = text.find(field)
                if field_start != -1:
                    # 保留字段及其后续内容的一部分
                    remaining_length = max_length - len(preserved_text)
                    if remaining_length > 0:
                        field_content = text[field_start:field_start + remaining_length]
                        preserved_text += field_content + " "
                        
            return preserved_text.strip()
        else:
            # 没有识别到重要字段，直接截断
            return text[:max_length] + "..."

    def _process_user_data(self, user_data: Any) -> str:
        """优化用户数据处理，避免JSON序列化开销"""
        if isinstance(user_data, dict):
            # 直接字典操作，避免JSON序列化
            return self._compress_dict_to_string(user_data)
        else:
            return str(user_data)
    
    def _compress_dict_to_string(self, data: dict) -> str:
        """压缩字典为紧凑字符串格式"""
        compressed_parts = []
        
        for key, value in data.items():
            if value and value != "":  # 跳过空值
                if isinstance(value, dict):
                    # 递归处理嵌套字典
                    nested = self._compress_dict_to_string(value)
                    if nested:
                        compressed_parts.append(f"{key}: {nested}")
                elif isinstance(value, list):
                    # 处理列表
                    if value:  # 只处理非空列表
                        list_str = ", ".join(str(v) for v in value if v)
                        if list_str:
                            compressed_parts.append(f"{key}: [{list_str}]")
                else:
                    compressed_parts.append(f"{key}: {value}")
        
        return "; ".join(compressed_parts)
     
    def _validate_migration_related(self, user_input: dict) -> bool:
        """验证用户输入是否与移住相关（优化版）"""
        if not isinstance(user_input, dict):
            return False
        
        # 使用字典直接检查，避免JSON序列化开销
        input_text = self._process_user_data(user_input).lower()
        
        # 使用集合操作提高查找效率
        input_words = set(input_text.split())
        keyword_lowercase = {keyword.lower() for keyword in self.migration_keywords}
        
        # 检查是否有关键词交集
        keyword_found = bool(input_words & keyword_lowercase)
        
        # 检查文本中是否包含关键词片段
        if not keyword_found:
            for keyword in keyword_lowercase:
                if keyword in input_text:
                    keyword_found = True
                    break
        
        return keyword_found
     
    def _create_safe_prompt_template(self, template_type: str, user_data: str, additional_data: str = "") -> str:
        """创建安全的提示词模板（简化版）"""
        
        if template_type == "analyze_profile":
            return f"""あなたは日本の地方移住専門アドバイザーです。以下のユーザー情報から移住に関する3つの具体的な疑問点を抽出してください。

ユーザー情報:
{user_data}

回答形式:
1. [疑問点1]
2. [疑問点2]  
3. [疑問点3]

注意：移住に関する内容のみ扱い、番号付きリストで簡潔に回答してください。"""
        
        elif template_type == "location_recommendations":
            return f"""あなたは日本の地方移住専門アドバイザーです。ユーザー情報と検索結果に基づき、移住先を3つ推奨してください。

ユーザー情報:
{user_data}

検索結果:
{additional_data}

回答形式（JSON）:
{{
    "locations": [
        {{
            "name": "地域名",
            "reasons": ["理由1", "理由2"],
            "features": ["特徴1", "特徴2"],
            "policies": ["政策1", "政策2"]
        }}
    ]
}}

注意：JSONのみで回答し、提供されたデータに基づいて正確に記述してください。"""
        
        elif template_type == "life_plan":
            return f"""あなたは日本の地方移住専門アドバイザーです。移住計画を段階的に作成してください。

ユーザー情報:
{user_data}

推奨地域:
{additional_data}

回答形式（JSON）:
{{
    "preparation": {{
        "period": "準備期間",
        "steps": ["ステップ1", "ステップ2"]
    }},
    "initial": {{
        "period": "初期期間", 
        "steps": ["ステップ1", "ステップ2"]
    }},
    "settlement": {{
        "period": "定着期間",
        "steps": ["ステップ1", "ステップ2"]
    }}
}}

注意：JSONのみで回答し、実行可能で具体的な計画を提供してください。"""
        
        else:
            raise ValueError(f"Unknown template type: {template_type}")

    async def _generate_content(self, prompt: str, max_retries: int = 3) -> str:
        """
        使用 Google Generative AI 生成内容（带重试机制）
        """
        for attempt in range(max_retries):
            try:
                # 添加重试延迟
                if attempt > 0:
                    await asyncio.sleep(2 ** attempt)  # 指数退避
                
                response = await asyncio.to_thread(self.model.generate_content, prompt)
                return response.text
                
            except Exception as e:
                logger.warning(f"API调用失败 (尝试 {attempt + 1}/{max_retries}): {e}")
                if attempt == max_retries - 1:
                    logger.error(f"所有重试都失败了: {e}")
                    raise
                
        raise Exception("重试机制失败")

    async def _analyze_user_profile(self, user_profile: str) -> str:
        """
        分析用户档案，生成关键问题（优化版本）
        """
        # 使用安全的提示词模板（安全检查已在上级方法中完成）
        prompt = self._create_safe_prompt_template("analyze_profile", user_profile)
        
        return await self._generate_content(prompt)

    async def _generate_location_recommendations(self, user_profile: str, search_results: str) -> str:
        """
        生成地点推荐（优化版本）
        """
        # 使用安全的提示词模板（安全检查已在上级方法中完成）
        prompt = self._create_safe_prompt_template("location_recommendations", user_profile, search_results)
        
        return await self._generate_content(prompt)

    async def _generate_life_plan(self, user_profile: str, recommended_locations: str) -> str:
        """
        生成生活规划（优化版本）
        """
        # 使用安全的提示词模板（安全检查已在上级方法中完成）
        prompt = self._create_safe_prompt_template("life_plan", user_profile, recommended_locations)
        
        return await self._generate_content(prompt)

    async def search_with_serpapi(self, query: str) -> tuple:
        """
        使用SerpAPI进行搜索并返回完整结果和前两条结果的标题与URL
        """
        try:
            # 设置搜索参数
            params = {
                "q": query,
                "api_key": self.serpapi_key,
                "engine": "google",
                "google_domain": "google.co.jp",
                "gl": "jp",
                "hl": "ja"
            }
            
            # 正确初始化GoogleSearch
            search = GoogleSearch(params)
            
            # 获取结果字典
            results = search.get_dict()
            
            # 从organic_results中提取URL和标题
            title_url_pairs = []
            if isinstance(results, dict) and 'organic_results' in results and results['organic_results']:
                for result in results.get('organic_results', [])[:2]:
                    if result.get('link'):
                        title_url_pairs.append({
                            'title': result.get('title'),
                            'link': result.get('link')
                        })
            
            # 返回完整的organic_results和标题-URL对
            return results.get('organic_results', [])[:3], title_url_pairs
        except Exception as e:
            logger.error(f"検索中にエラーが発生しました: {e}")
            import traceback
            traceback.print_exc()
            return [], []

    async def generate_locations(self, user_profile: Dict) -> tuple:
        """
        生成推荐地点，并返回搜索结果（优化版本）
        """
        try:
            # 使用优化的数据处理方法
            profile_str = self._compress_dict_to_string(user_profile)
            
            # 搜索相关资源
            search_results = {}
            search_top_results = {}  # 存储每个问题的前两条搜索结果
            
            # 分析用户资料，生成问题
            questions_text = await self._analyze_user_profile(profile_str)
            questions = [q.strip() for q in questions_text.split('\n') if q.strip()]
            
            # 限制问题数量以避免过多的API调用
            questions = questions[:3]  # 只处理前3个问题
            
            for question in questions:
                if question.startswith(('1.', '2.', '3.', '4.')):
                    # 去掉问题前面的序号
                    clean_question = question[2:].strip()
                else:
                    clean_question = question
                    
                # 执行搜索并获取完整结果和前两条结果
                try:
                    full_result, top_three = await self.search_with_serpapi(clean_question)
                    search_results[clean_question] = full_result
                    search_top_results[clean_question] = top_three
                except Exception as e:
                    logger.warning(f"搜索失败 {clean_question}: {e}")
                    # 继续处理其他问题，不因一个搜索失败而中断
                    search_results[clean_question] = []
                    search_top_results[clean_question] = []
            
            # 压缩搜索结果
            search_results_str = self._compress_dict_to_string(search_results)
            
            # 生成推荐地点
            response_text = await self._generate_location_recommendations(profile_str, search_results_str)
            
            # 清理响应中的markdown标记和多余的空格
            response_text = response_text.replace('```json\n', '').replace('\n```', '').strip()
            response_text = re.sub(r'\n\s+', ' ', response_text)  # 移除多余的空格和换行
            
            try:
                # 验证JSON格式
                json_data = json.loads(response_text)
                if not isinstance(json_data, dict) or 'locations' not in json_data:
                    raise ValueError("Invalid JSON format: missing 'locations' key")
                return response_text, search_top_results
            except json.JSONDecodeError as e:
                logger.error(f"JSON解析にエラーが発生しました: {e}")
                logger.error(f"問題のあるレスポンス: {response_text}")
                raise
                
        except Exception as e:
            logger.error(f"処理中にエラーが発生しました: {str(e)}")
            raise

    async def generate_life_plan(self, user_profile: Dict, recommended_locations: str) -> str:
        """
        生成生活规划（优化版本）
        """
        try:
            # 使用优化的数据处理方法
            profile_str = self._compress_dict_to_string(user_profile)
            
            response_text = await self._generate_life_plan(profile_str, recommended_locations)
            
            # 清理响应中的markdown标记和多余的空格
            response_text = response_text.replace('```json\n', '').replace('\n```', '').strip()
            response_text = re.sub(r'\n\s+', ' ', response_text)  # 移除多余的空格和换行
            
            try:
                # 验证JSON格式
                json_data = json.loads(response_text)
                required_keys = ['preparation', 'initial', 'settlement']
                if not all(key in json_data for key in required_keys):
                    raise ValueError("Invalid JSON format: missing required keys")
                return response_text
            except json.JSONDecodeError as e:
                logger.error(f"JSON解析にエラーが発生しました: {e}")
                logger.error(f"問題のあるレスポンス: {response_text}")
                raise
                
        except Exception as e:
            logger.error(f"処理中にエラーが発生しました: {str(e)}")
            raise

    async def process_migration_consultation(self, user_profile: Dict) -> Dict:
        """
        执行完整的移居咨询流程（性能优化版本）
        """
        try:
            # 一次性安全检查和数据预处理
            logger.info(f"Processing user profile with {len(str(user_profile))} characters")
            
            # 安全验证用户输入
            if not self._validate_migration_related(user_profile):
                logger.warning("User input not related to migration")
                raise ValueError("移住に関連しない入力が検出されました。地方移住に関する情報のみ入力してください。")
            
            # 压缩并清理用户数据
            profile_str = self._process_user_data(user_profile)
            cleaned_profile_str = self._sanitize_user_input(profile_str)
            
            # 检查用户输入中是否包含提示词注入
            if self._detect_prompt_injection(cleaned_profile_str):
                logger.warning("Prompt injection detected in user profile")
                raise ValueError("不適切な入力が検出されました。移住に関する正常な情報のみ入力してください。")
            
            logger.info(f"User input processed: original={len(str(user_profile))}, optimized={len(cleaned_profile_str)} characters")
            
            # 生成推荐地点和生活计划，同时获取搜索结果
            recommended_locations, search_top_results = await self.generate_locations(user_profile)
            life_plan = await self.generate_life_plan(user_profile, recommended_locations)
            
            # 确保返回的数据是解析后的字典格式，并包含搜索结果
            return {
                "timestamp": datetime.now().strftime("%Y%m%d_%H%M%S"),
                "user_profile": user_profile,
                "recommended_locations": json.loads(recommended_locations),
                "life_plan": json.loads(life_plan),
                "search_top_results": search_top_results
            }
            
        except Exception as e:
            logger.error(f"処理中にエラーが発生しました: {str(e)}")
            raise

def main():
    try:
        # 创建Agent实例
        migration_agent = JapaneseMigrationAgent()
        
        # 示例用户配置
        user_profile = {
            "性別": "女性",
            "婚姻状況": "既婚、双子持ち",
            "職業": "ソフトウェアエンジニア",
            "優先地域": ["広島県", "福岡県"],
            "具体的な要件（重要度順）": ["技術系職種の機会", "女性に優しい環境", "育児に適した環境"]
        }
        
        # 执行咨询
        import asyncio
        result = asyncio.run(migration_agent.process_migration_consultation(user_profile))
        print(json.dumps(result, ensure_ascii=False, indent=2))
        
    except Exception as e:
        logger.error(f"実行中にエラーが発生しました: {e}")

if __name__ == '__main__':
    main()