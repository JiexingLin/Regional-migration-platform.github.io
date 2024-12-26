import os
import json
from typing import Dict, List
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.agents import initialize_agent, Tool, AgentType
from langchain.utilities import SerpAPIWrapper
from langchain.memory import ConversationBufferMemory
from langchain_google_genai import ChatGoogleGenerativeAI
#import pandas as pd
from datetime import datetime

# 设置OpenAI和SerpApi的API密钥
os.environ["GOOGLE_API_KEY"] = ""
os.environ["SERPAPI_API_KEY"] = ""

class JapaneseMigrationAgent:
    def __init__(
        self, 
        google_api_key: str = None,
        serpapi_key: str = None
    ):
        """
        初始化日本移居咨询Agent
        
        :param google_api_key: OpenAI API密钥
        :param serpapi_key: SerpAPI搜索密钥
        """
        # 如果没有传入API Key，则尝试从环境变量获取
        google_api_key = google_api_key or os.environ["GOOGLE_API_KEY"]
        serpapi_key = serpapi_key or os.environ["SERPAPI_API_KEY"]

        # 检查API Key
        if not google_api_key:
            raise ValueError("Please provide Google API Key")
        if not serpapi_key:
            raise ValueError("Please provide SerpAPI Key")

        # 初始化大语言模型
        try:
            self.llm  = ChatGoogleGenerativeAI(model="gemini-1.5-flash", streaming=True)
        except Exception as e:
            raise RuntimeError("モデルの初期化に失敗しました: {}".format(e))
        # 初始化搜索工具
        self.search = SerpAPIWrapper(serpapi_api_key=serpapi_key)
        
        # 对话记忆
        self.memory = ConversationBufferMemory(
            memory_key="chat_history", 
            return_messages=True
        )
        
        # 创建专业分析提示模板
        self.profile_analysis_prompt = PromptTemplate(
            input_variables=['user_profile'],
            template="""
            専門の日本地方移住コンサルタントとして、以下のユーザー情報に基づき、移住ニーズを3-4つの具体的なサブ質問に分解してください。地方の定義は、人口30万人以下の地域を「地方」、人口10万人以下の地域を「特に地方」とし、大都市圏は除外します。：

            ユーザー情報：
            {user_profile}

            以下の形式でサブ質問を出力してください：
            1. 具体的なサブ質問1
            2. 具体的なサブ質問2
            3. 具体的なサブ質問3
            """
        )
        
        # 创建地点推荐提示模板
        self.location_recommendation_prompt = PromptTemplate(
            input_variables=['user_profile', 'search_results'],
            template="""
            ユーザー情報と検索結果に基づき、ユーザー情報にある地域に基づき、適切な日本移住先を推奨してください、市まで特定してください：

            ユーザー情報：
            {user_profile}

            検索結果：
            {search_results}

            以下の形式で推奨地域と詳細な理由を出力してください：
            1. 地域名
            - 推奨理由
            - 生活に適した特徴
            - 関連支援政策

            2. 地域名
            - 推奨理由
            - 生活に適した特徴
            - 関連支援政策
            ...
            """
        )
        
        # 创建生活规划提示模板
        self.life_plan_prompt = PromptTemplate(
            input_variables=['user_profile', 'recommended_locations'],
            template="""
            日本での移住生活に関する詳細な計画提案を提供してください：

            ユーザー情報：
            {user_profile}

            推奨地域：
            {recommended_locations}

            以下を考えに含む移住生活計画を提供してください：
            1. 初期適応アドバイス
            2. キャリア発展パス
            3. 社会生活とコミュニケーションの提案
            4. 長期的な発展計画

            そして計画は以下の形式で提案してください：
            1. 移住準備（6ヶ月前～移住1ヶ月前）の計画
            2. 移住初期（移住後3ヶ月）の計画
            3. 定着と発展（移住後1年後～）の計画
            
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
        
        # 创建工具列表
        self.tools = [
            Tool(
                name="日本の地方政策検索",
                func=self.search.run,
                description="日本各地域の政策、補助金、生活情報を検索"
            )
        ]
        
        # 初始化Agent
        self.agent = initialize_agent(
            tools=self.tools,
            llm=self.llm,
            agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION,
            memory=self.memory,
            verbose=True
        )
    
    def process_migration_consultation(self, user_profile: Dict) -> Dict:
        """
        执行完整的移居咨询流程并保存为JSON
        
        :param user_profile: 用户信息
        :return: 咨询结果
        """
        # 转换用户配置为字符串
        profile_str = "\n".join([f"{k}: {str(v)}" for k, v in user_profile.items()])
        
        try:
            # 分析用户画像，获取子问题
            sub_questions = self.profile_analysis_chain.run(
                user_profile=profile_str
            )
            
            # 搜索相关资源
            search_results = {}
            for question in sub_questions.split('\n'):
                if question.strip():
                    search_results[question] = self.search.run(question)
            
            # 推荐移居地点
            recommended_locations = self.location_recommendation_chain.run(
                user_profile=profile_str,
                search_results=str(search_results)
            )
            
            # 规划生活
            life_plan = self.life_plan_chain.run(
                user_profile=profile_str,
                recommended_locations=recommended_locations
            )
            
            # 准备JSON数据
            result = {
                "timestamp": datetime.now().strftime("%Y%m%d_%H%M%S"),
                "user_profile": user_profile,
                "consultation_result": {
                    "sub_questions": sub_questions,
                    "search_results": search_results,
                    "recommended_locations": recommended_locations,
                    "life_plan": life_plan
                }
            }
            
            # 保存为JSON文件
            self._save_to_json(result)
            
            return result
        except Exception as e:
            print(f"処理中にエラーが発生しました: {e}")
            return {}

    def _save_to_json(self, result: Dict):
        """
        将结果保存为JSON文件
        
        :param result: 咨询结果
        """
        try:
            timestamp = result["timestamp"]
            filename = f"migration_consultation_{timestamp}.json"
            
            with open("./data/"+filename, 'w', encoding='utf-8') as f:
                json.dump(result, f, ensure_ascii=False, indent=2)
                
            print(f"結果を{filename}に保存しました。")
            
        except Exception as e:
            print(f"JSONファイルの保存中にエラーが発生しました: {e}")

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
        result = migration_agent.process_migration_consultation(user_profile)
        
    except Exception as e:
        print(f"実行中にエラーが発生しました: {e}")

if __name__ == '__main__':
    main()