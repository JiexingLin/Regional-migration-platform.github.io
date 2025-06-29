# AI聊天服务模块
import os
import re
import asyncio
import aiohttp
from typing import List, Dict, Any, AsyncGenerator
import google.generativeai as genai
import logging

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ChatBotService:
    """AI聊天机器人服务类"""
    
    def __init__(self):
        self.model = None
        self.system_prompt = self._create_system_prompt()
        self.conversation_history = {}  # 存储用户对话历史
        self.trusted_urls = self._load_trusted_urls()  # 可信URL数据库
        self._initialize_model()
        
    def _load_trusted_urls(self) -> Dict[str, str]:
        """加载可信的官方URL数据库"""
        return {
            # 都道府県公式サイト
            'hokkaido': 'https://www.pref.hokkaido.lg.jp/',
            'aomori': 'https://www.pref.aomori.lg.jp/',
            'iwate': 'https://www.pref.iwate.jp/',
            'miyagi': 'https://www.pref.miyagi.jp/',
            'akita': 'https://www.pref.akita.lg.jp/',
            'yamagata': 'https://www.pref.yamagata.jp/',
            'fukushima': 'https://www.pref.fukushima.lg.jp/',
            'ibaraki': 'https://www.pref.ibaraki.jp/',
            'tochigi': 'https://www.pref.tochigi.lg.jp/',
            'gunma': 'https://www.pref.gunma.jp/',
            'saitama': 'https://www.pref.saitama.lg.jp/',
            'chiba': 'https://www.pref.chiba.lg.jp/',
            'tokyo': 'https://www.metro.tokyo.lg.jp/',
            'kanagawa': 'https://www.pref.kanagawa.jp/',
            'niigata': 'https://www.pref.niigata.lg.jp/',
            'toyama': 'https://www.pref.toyama.jp/',
            'ishikawa': 'https://www.pref.ishikawa.lg.jp/',
            'fukui': 'https://www.pref.fukui.lg.jp/',
            'yamanashi': 'https://www.pref.yamanashi.jp/',
            'nagano': 'https://www.pref.nagano.lg.jp/',
            'gifu': 'https://www.pref.gifu.lg.jp/',
            'shizuoka': 'https://www.pref.shizuoka.jp/',
            'aichi': 'https://www.pref.aichi.jp/',
            'mie': 'https://www.pref.mie.lg.jp/',
            'shiga': 'https://www.pref.shiga.lg.jp/',
            'kyoto': 'https://www.pref.kyoto.jp/',
            'osaka': 'https://www.pref.osaka.lg.jp/',
            'hyogo': 'https://web.pref.hyogo.lg.jp/',
            'nara': 'https://www.pref.nara.jp/',
            'wakayama': 'https://www.pref.wakayama.lg.jp/',
            'tottori': 'https://www.pref.tottori.lg.jp/',
            'shimane': 'https://www.pref.shimane.lg.jp/',
            'okayama': 'https://www.pref.okayama.jp/',
            'hiroshima': 'https://www.pref.hiroshima.lg.jp/',
            'yamaguchi': 'https://www.pref.yamaguchi.lg.jp/',
            'tokushima': 'https://www.pref.tokushima.lg.jp/',
            'kagawa': 'https://www.pref.kagawa.lg.jp/',
            'ehime': 'https://www.pref.ehime.jp/',
            'kochi': 'https://www.pref.kochi.lg.jp/',
            'fukuoka': 'https://www.pref.fukuoka.lg.jp/',
            'saga': 'https://www.pref.saga.lg.jp/',
            'nagasaki': 'https://www.pref.nagasaki.lg.jp/',
            'kumamoto': 'https://www.pref.kumamoto.jp/',
            'oita': 'https://www.pref.oita.jp/',
            'miyazaki': 'https://www.pref.miyazaki.lg.jp/',
            'kagoshima': 'https://www.pref.kagoshima.jp/',
            'okinawa': 'https://www.pref.okinawa.jp/',
            
            # 移住関連の公式サイト
            'ijyu_portal': 'https://www.chisou.go.jp/',  # 地方創生
            'furusato_kaiki': 'https://www.furusatokaiki.net/',  # ふるさと回帰支援センター
            'join': 'https://www.iju-join.jp/',  # JOIN移住・交流推進機構
        }
    
    def _create_system_prompt(self) -> str:
        """创建系统提示词"""
        return """
あなたは日本の地方移住をサポートする専門的なAIアシスタントです。

**回答形式の厳格な要求:**
- 回答は必ず3点以内で簡潔にまとめる
- 各ポイントは具体的で実用的な情報を含む
- 重要な情報は**太字**で強調する

**URL提供に関する重要な注意:**
- **確実に存在するURLのみを提供する**
- 不確実なURLは提供しない
- 代わりに「○○県公式サイト」「○○市役所」等の検索キーワードを提案
- 一般的な政府系サイトのみ言及可能（例：地方創生サイト、JOIN等）

**回答構造の例:**
1. **ポイント1**: 具体的な情報
2. **ポイント2**: 実用的な情報  
3. **ポイント3**: 注意事項や補足

**詳細情報の取得方法:**
- 「○○県公式サイト」で検索してください
- 「○○市 移住支援」で最新情報を確認してください
- 地方創生ポータルサイトもご参考ください

あなたの役割：
- 地方移住に関する簡潔で実用的な情報提供
- 移住希望者の具体的な質問に効率的に対応
- 各地域の特色、支援制度、生活環境の要点説明
- 正確で検証可能な情報源の案内

応答の特徴：
- 簡潔で分かりやすい日本語
- 3点以内での要点整理
- 具体的な数値や制度名を含む
- 検索方法の案内を含める
- 読み手が迅速に必要な情報を得られる構成

重要な制約：
- **絶対に不確実なURLを提供しない**
- 公式サイトの存在が不明な場合は検索方法を案内
- 移住の重要性を理解した慎重なアドバイス
- 客観的で実用的な情報を重視
- 情報の正確性を最優先する
"""
    
    def _initialize_model(self):
        """Google AI モデルを初期化"""
        if self.model is None:
            api_key = os.getenv('GOOGLE_API_KEY')
            if not api_key:
                raise ValueError("GOOGLE_API_KEY environment variable is not set")
            
            try:
                genai.configure(api_key=api_key)
                self.model = genai.GenerativeModel(
                    'gemini-2.0-flash',
                    generation_config=genai.types.GenerationConfig(
                        temperature=0.7,
                        max_output_tokens=1024,
                    )
                )
                logger.info("Google AI model initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize model: {e}")
                raise
        
        return self.model
    
    def _get_conversation_history(self, session_id: str) -> List[Dict]:
        """获取对话历史"""
        return self.conversation_history.get(session_id, [])
    
    def _update_conversation_history(self, session_id: str, message: Dict):
        """更新对话历史"""
        if session_id not in self.conversation_history:
            self.conversation_history[session_id] = []
        
        self.conversation_history[session_id].append(message)
        
        # 保持最近20条消息
        if len(self.conversation_history[session_id]) > 20:
            self.conversation_history[session_id] = self.conversation_history[session_id][-20:]
    
    def _build_prompt(self, user_message: str, session_id: str) -> str:
        """构建完整的提示"""
        prompt_parts = [self.system_prompt]
        
        # 添加历史对话
        history = self._get_conversation_history(session_id)
        for msg in history[-10:]:  # 只使用最近10条消息作为上下文
            if msg['type'] == 'user':
                prompt_parts.append(f"ユーザー: {msg['content']}")
            elif msg['type'] == 'assistant':
                prompt_parts.append(f"アシスタント: {msg['content']}")
        
        # 添加当前用户消息
        prompt_parts.append(f"ユーザー: {user_message}")
        prompt_parts.append("アシスタント:")
        
        return "\n\n".join(prompt_parts)
    
    def _post_process_response(self, content: str) -> str:
        """后处理AI响应文本，改善格式"""
        if not content:
            return content
        
        # 添加适当的段落分隔
        processed = content
        
        # 确保数字列表项前后有换行
        processed = re.sub(r'(\d+\.)\s*([^\n])', r'\n\n\1 \2', processed)
        
        # 确保重要标题后有换行（特别是"詳細情報"部分）
        processed = re.sub(r'([^:])(:)\s*([^\s])', r'\1\2\n\3', processed)
        processed = re.sub(r'(\*\*詳細情報\*\*)', r'\n\n\1', processed)
        
        # 处理句子结束后的适当换行
        processed = re.sub(r'([。！？])([^\s\n])', r'\1\n\n\2', processed)
        
        # 确保链接列表项前有换行
        processed = re.sub(r'(\[[^\]]+\]\([^)]+\))', r'\n- \1', processed)
        
        # 清理多余的空行
        processed = re.sub(r'\n{3,}', '\n\n', processed)
        
        return processed.strip()
    
    async def generate_streaming_response(
        self, 
        user_message: str, 
        session_id: str = "default"
    ) -> AsyncGenerator[Dict[str, Any], None]:
        """生成流式AI响应"""
        try:
            model = self._initialize_model()
            prompt = self._build_prompt(user_message, session_id)
            
            logger.info(f"Generating response for session {session_id}: {user_message[:50]}...")
            
            # 更新用户消息到历史
            self._update_conversation_history(session_id, {
                'type': 'user',
                'content': user_message,
                'timestamp': asyncio.get_event_loop().time()
            })
            
            full_response = ""
            
            # 使用 generate_content_async 进行流式生成
            try:
                # 由于 google-generativeai 的流式API可能不完全支持asyncio，我们使用同步版本
                response = await asyncio.to_thread(
                    model.generate_content,
                    prompt,
                    stream=True
                )
                
                # 处理流式响应
                for chunk in response:
                    if chunk.text:
                        full_response += chunk.text
                        
                        yield {
                            'type': 'chunk',
                            'content': chunk.text,
                            'session_id': session_id
                        }
                        
                        # 添加小延迟以模拟实时流式效果
                        await asyncio.sleep(0.01)
                        
            except Exception as stream_error:
                logger.warning(f"Streaming failed, falling back to non-streaming: {stream_error}")
                # 如果流式失败，退回到非流式生成
                response = await asyncio.to_thread(model.generate_content, prompt)
                full_response = response.text
                
                # 模拟流式输出
                chunk_size = 50
                for i in range(0, len(full_response), chunk_size):
                    chunk = full_response[i:i + chunk_size]
                    yield {
                        'type': 'chunk',
                        'content': chunk,
                        'session_id': session_id
                    }
                    await asyncio.sleep(0.05)
            
            # 后处理完整响应
            processed_response = self._post_process_response(full_response)
            
            # 验证和修复URL
            validated_response = await self._validate_and_fix_urls(processed_response)
            
            # 更新AI响应到历史
            self._update_conversation_history(session_id, {
                'type': 'assistant',
                'content': validated_response,
                'timestamp': asyncio.get_event_loop().time()
            })
            
            # 发送结束信号
            yield {
                'type': 'end',
                'full_response': validated_response,
                'session_id': session_id
            }
            
            logger.info(f"Response generated successfully for session {session_id}")
            
        except Exception as e:
            logger.error(f"Error generating response: {str(e)}")
            
            error_message = "申し訳ございません。現在システムに問題が発生しています。しばらくしてから再度お試しください。"
            
            yield {
                'type': 'chunk',
                'content': error_message,
                'session_id': session_id
            }
            
            yield {
                'type': 'end',
                'full_response': error_message,
                'session_id': session_id,
                'error': True
            }
    
    async def generate_simple_response(
        self, 
        user_message: str, 
        session_id: str = "default"
    ) -> str:
        """生成简单的非流式响应（备用方案）"""
        try:
            model = self._initialize_model()
            prompt = self._build_prompt(user_message, session_id)
            
            response = await asyncio.to_thread(model.generate_content, prompt)
            
            # 更新对话历史
            self._update_conversation_history(session_id, {
                'type': 'user',
                'content': user_message,
                'timestamp': asyncio.get_event_loop().time()
            })
            
            processed_response = self._post_process_response(response.text)
            
            # 验证和修复URL
            validated_response = await self._validate_and_fix_urls(processed_response)
            
            self._update_conversation_history(session_id, {
                'type': 'assistant',
                'content': validated_response,
                'timestamp': asyncio.get_event_loop().time()
            })
            
            return validated_response
            
        except Exception as e:
            logger.error(f"Error in simple response: {str(e)}")
            return "申し訳ございません。現在システムに問題が発生しています。しばらくしてから再度お試しください。"
    
    def get_service_status(self) -> Dict[str, Any]:
        """获取服务状态"""
        return {
            'status': 'active',
            'model': 'gemini-2.0-flash-exp',
            'has_api_key': bool(os.getenv('GOOGLE_API_KEY')),
            'active_sessions': len(self.conversation_history),
            'model_initialized': self.model is not None
        }
    
    def clear_session(self, session_id: str) -> bool:
        """清除会话历史"""
        if session_id in self.conversation_history:
            del self.conversation_history[session_id]
            return True
        return False

    async def _validate_url(self, url: str) -> bool:
        """URL的有效性验证（异步）"""
        try:
            async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=5)) as session:
                async with session.head(url) as response:
                    return response.status < 400
        except Exception as e:
            logger.warning(f"URL validation failed for {url}: {e}")
            return False
    
    def _extract_urls_from_text(self, text: str) -> List[str]:
        """从文本中提取URL"""
        url_pattern = r'https?://[^\s\]）)>]+'
        return re.findall(url_pattern, text)
    
    def _get_trusted_url_for_region(self, region_name: str) -> str:
        """根据地区名获取可信的URL"""
        region_key = region_name.lower().replace('県', '').replace('府', '').replace('都', '')
        return self.trusted_urls.get(region_key, '')
    
    async def _validate_and_fix_urls(self, content: str) -> str:
        """验证并修复内容中的URL"""
        urls = self._extract_urls_from_text(content)
        
        if not urls:
            return content
        
        # 验证URL并替换无效的URL
        fixed_content = content
        for url in urls:
            try:
                is_valid = await self._validate_url(url)
                if not is_valid:
                    # 移除无效URL，替换为搜索建议
                    logger.warning(f"Invalid URL detected and removed: {url}")
                    fixed_content = fixed_content.replace(
                        f'[{url}]({url})', 
                        '公式サイトで検索してください'
                    )
                    fixed_content = re.sub(
                        r'\[([^\]]+)\]\(' + re.escape(url) + r'\)',
                        r'「\1」で検索してください',
                        fixed_content
                    )
            except Exception as e:
                logger.error(f"Error validating URL {url}: {e}")
                # 出错时也移除URL
                fixed_content = re.sub(
                    r'\[([^\]]+)\]\(' + re.escape(url) + r'\)',
                    r'「\1」で検索してください',
                    fixed_content
                )
        
        return fixed_content

# 全局聊天服务实例
chat_service = ChatBotService() 