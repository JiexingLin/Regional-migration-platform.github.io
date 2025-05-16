import os
import json
import asyncio
from typing import Dict, List, Optional
# from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
# from langchain.agents import initialize_agent, Tool, AgentType
# from langchain.utilities import SerpAPIWrapper
from langchain.memory import ConversationBufferMemory
from langchain_google_genai import ChatGoogleGenerativeAI
#import pandas as pd
from datetime import datetime
import re
from serpapi import GoogleSearch
from langchain_community.chat_models import ChatOpenAI




class JapaneseMigrationAgent:
    def __init__(
        self, 
        google_api_key: str = None,
        serpapi_key: str = None
    ):
        # 获取API密钥
        google_api_key = google_api_key or os.getenv('GOOGLE_API_KEY')
        serpapi_key = serpapi_key or os.getenv('SERPAPI_API_KEY')

        # 初始化大语言模型
        try:
            self.llm = ChatGoogleGenerativeAI(
                model="gemini-2.0-flash",
                google_api_key=google_api_key
            )
        except Exception as e:
            raise RuntimeError("モデルの初期化に失敗しました: {}".format(e))
        # 初始化搜索工具
        self.serpapi_key = serpapi_key
        
        # 对话记忆
        self.memory = ConversationBufferMemory(
            memory_key="chat_history", 
            return_messages=True
        )
        
        # 创建专业分析提示模板
        self.profile_analysis_prompt = PromptTemplate(
            input_variables=['user_profile'],
            template="""
            専門の日本地方移住コンサルタントとして、以下のユーザー情報に基づき、移住ニーズを3-4つの具体的なサブ質問に分解してください。地方の定義は、人口30万人以下の地域を「地方」、人口10万人以下の地域を「地方」とし、大都市圏は除外します。：

            ユーザー情報：
            {user_profile}

            以下の形式でサブ質問だけ出力してください：
            1. 具体的なサブ質問1
            2. 具体的なサブ質問2
            3. 具体的なサブ質問3
            """
        )
        
        # 创建地点推荐提示模板
        self.location_recommendation_prompt = PromptTemplate(
            input_variables=['user_profile', 'search_results'],
            template="""
            あなたは地方移住コンサルタントとして、以下のユーザー情報と検索結果に基づいて、制約に従って回答してください：
            ユーザー情報：
            {user_profile}

            検索結果：
            {search_results}
            制約：
            - 人口30万人以下の地域を「地方」、人口10万人以下の地域を「特に地方」とする
            - 大都市圏は除外する
            - 提案は具体的な市町村レベルまで三つを特定する
            - 提案する地域はユーザーの優先地域の中から選ぶ
            - 各地域について3つの観点（推奨理由、特徴、支援政策）で説明する
            - 各説明は200文字以内で簡潔に記述する
            - 必ず以下のJSON形式だけで出力してください,JSON以外の出力は絶対不要：
            {{
                "locations": [
                    {{
                        "name": "地域名",
                        "reasons": [
                            "理由1",
                            "理由2"
                        ],
                        "features": [
                            "特徴1",
                            "特徴2"
                        ],
                        "policies": [
                            "政策1",
                            "政策2"
                        ]
                    }}
                ]
            }}
            """
        )
        
        # 创建生活规划提示模板
        self.life_plan_prompt = PromptTemplate(
            input_variables=['user_profile', 'recommended_locations'],
            template="""
            あなたは地方移住コンサルタントとして、以下のユーザー情報と検索結果に基づいて、制約に従って移住計画を提案してください：
            ユーザー情報：
            {user_profile}

            推奨地域：
            {recommended_locations}
            制約：
            - 各フェーズの計画は具体的で実行可能な内容にする
            - 各ステップは150文字以内で簡潔に記述する
            - ユーザーの職業と家族構成を考慮する
            - 地域特性を活かした提案をする
            - 時系列に沿って段階的に計画を立てる
            - 必ず以下のJSON形式で出力してください,JSON以外の出力は絶対不要：

            

            以下のJSON形式で出力してください：
            {{
                "preparation": {{
                    "period": "6ヶ月前～移住1ヶ月前",
                    "steps": [
                        "ステップ1",
                        "ステップ2"
                    ]
                }},
                "initial": {{
                    "period": "移住後3ヶ月",
                    "steps": [
                        "ステップ1",
                        "ステップ2"
                    ]
                }},
                "settlement": {{
                    "period": "移住後1年後～",
                    "steps": [
                        "ステップ1",
                        "ステップ2"
                    ]
                }}
            }}
            """
        )
        
        # 创建链
        self.profile_analysis_chain = LLMChain(
            llm=self.llm, 
            prompt=self.profile_analysis_prompt
        )
        
        self.location_recommendation_chain = LLMChain(
            llm=self.llm, 
            prompt=self.location_recommendation_prompt
        )
        
        self.life_plan_chain = LLMChain(
            llm=self.llm, 
            prompt=self.life_plan_prompt
        )
        
        # # 创建工具列表
        # self.tools = [
        #     Tool(
        #         name="日本の地方政策検索",
        #         func=self.search.run,
        #         description="日本各地域の政策、補助金、生活情報を検索"
        #     )
        # ]
        
        # # 初始化Agent
        # self.agent = initialize_agent(
        #     tools=self.tools,
        #     llm=self.llm,
        #     agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION,
        #     memory=self.memory,
        #     verbose=True
        # )
    
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
            print(f"検索中にエラーが発生しました: {e}")
            import traceback
            traceback.print_exc()
            return [], []

    async def generate_locations(self, user_profile: Dict) -> tuple:
        """
        生成推荐地点，并返回搜索结果
        """
        profile_str = "\n".join([f"{k}: {str(v)}" for k, v in user_profile.items()])
        
        # 搜索相关资源
        search_results = {}
        search_top_results = {}  # 存储每个问题的前两条搜索结果
        
        # 分析用户资料，生成问题
        questions_text = self.profile_analysis_chain.run(user_profile=profile_str)
        questions = [q.strip() for q in questions_text.split('\n') if q.strip()]
        
        for question in questions:
            if question.startswith(('1.', '2.', '3.', '4.')):
                # 去掉问题前面的序号
                clean_question = question[2:].strip()
            else:
                clean_question = question
                
            # 执行搜索并获取完整结果和前两条结果
            full_result, top_two = await self.search_with_serpapi(clean_question)
            search_results[clean_question] = full_result
            search_top_results[clean_question] = top_two
        
        # 生成推荐地点
        response = self.location_recommendation_chain.run(
            user_profile=profile_str,
            search_results=str(search_results)
        )
        # 清理响应中的markdown标记
        response = response.replace('```json\n', '').replace('\n```', '').strip()
        
        try:
            # 验证JSON格式
            json.loads(response)
            return response, search_top_results
        except json.JSONDecodeError as e:
            print(f"JSON解析にエラーが発生しました: {e}")
            raise

    async def generate_life_plan(self, user_profile: Dict, recommended_locations: str) -> str:
        """
        生成生活规划
        """
        profile_str = "\n".join([f"{k}: {str(v)}" for k, v in user_profile.items()])
        
        response = self.life_plan_chain.run(
            user_profile=profile_str,
            recommended_locations=recommended_locations
        )
        response = response.replace('```json\n', '').replace('\n```', '').strip()
        
        try:
            json.loads(response)
            return response
        except json.JSONDecodeError as e:
            print(f"JSON解析にエラーが発生しました: {e}")
            raise 
    
    async def process_migration_consultation(self, user_profile: Dict) -> Dict:
        """
        执行完整的移居咨询流程
        """
        try:
            # 生成推荐地点和生活计划，同时获取搜索结果
            recommended_locations, search_top_results = await self.generate_locations(user_profile)
            life_plan = await self.generate_life_plan(user_profile, recommended_locations)
            
            # 确保返回的数据是解析后的字典格式，并包含搜索结果
            return {
                "timestamp": datetime.now().strftime("%Y%m%d_%H%M%S"),
                "user_profile": user_profile,
                "recommended_locations": json.loads(recommended_locations),
                "life_plan": json.loads(life_plan),
                "search_top_results": search_top_results  # 添加前两条搜索结果到返回数据中
            }
            
        except Exception as e:
            print(f"処理中にエラーが発生しました: {e}")
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
        print(f"実行中にエラーが発生しました: {e}")

if __name__ == '__main__':
    main()