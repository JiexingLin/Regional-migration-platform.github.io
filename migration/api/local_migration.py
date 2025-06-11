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
            あなたは、日本の「地方移住」希望者のための優秀なアシスタントAIです。
            ユーザーから提供される以下の「ユーザー情報」を注意深く分析し、そのユーザーが地方移住を検討する上で**最も重要視している、あるいは最も解決したいと考えているであろう「3つの主要な疑問点または関心事」**を抽出してください。

            これらの疑問点・関心事は、後ほどSerpAPIなどの検索エンジンAPIを利用して関連情報を検索するための基礎となります。そのため、具体的かつ検索に適した形で記述することが望ましいです。ユーザーが直接的に質問していなくても、その記述内容から推測される潜在的なニーズや不安を的確に捉えてください。
            出力例：
            １、子供たちがのびのび暮らせる自然環境と、子育て支援制度が充実している移住先はどこか？
            ２、リモートワークをしながら地域コミュニティにも参加しやすい移住先と、その方法は？
            ３、家族で週末に楽しめるレジャースポットが近くにある移住先はどこか？
            
            以下は、ユーザー情報です。
            「ユーザー情報」：
            {user_profile}

            """
        )
        
        # 创建地点推荐提示模板
        self.location_recommendation_prompt = PromptTemplate(
            input_variables=['user_profile', 'search_results'],
            template="""
            あなたは、日本の「地方移住」希望者のための高度な提案を行うAIアシスタントです。
            提供される「ユーザー情報」と「検索結果」を詳細に分析してください。

            その分析に基づき、ユーザーの希望や条件に最も合致すると考えられる具体的な移住先候補の「市」または「町」レベルの地域を3つ提案してください。
            重要な注意点:
            提案するすべての情報（特に「推奨理由」「特徴」「支援政策」の内容）は、必ず提供された「ユーザー情報」および「検索結果」の記述内容に厳密に基づいていなければなりません。
            検索結果に明示的に記載されていない情報や、ユーザー情報から論理的に導き出せない情報を独自に創作したり、推測で補ったりすることは絶対に避けてください。事実に基づいた正確な情報提供を最優先としてください。

            各提案地域について、以下の情報を簡潔にまとめてください。
            推奨理由 (reasons): ユーザーの個別のニーズ（JSON情報から読み取れる希望、ライフスタイル、懸念事項など）と、検索結果で見つかった情報を踏まえ、なぜその地域がユーザーにとって最適と考えられるかを具体的に記述します。複数記述可能です。
            特徴 (features): その地域の自然環境、生活環境、主要産業、アクセスの良さ、文化、コミュニティの雰囲気など、移住を検討する上で魅力となる特筆すべき点を記述します。複数記述可能です。
            支援政策 (policies): 検索結果から見つかった、国、都道府県、または市町村が提供する移住者支援金、住宅支援、子育て支援、就職・起業支援など、ユーザーに関連性の高い公的な支援策を記述します。複数記述可能です。
            出力は、以下の指定されたJSON形式のみで行い、他のテキスト（挨拶、前置き、後書きなど）は一切含めないでください。 locations 配列には必ず3つの地域情報オブジェクトを含めてください。
            {{
                "locations": [
                    {{
                        "name": "地域名1",
                        "reasons": ["理由1", "理由2",...],
                        "features": ["特徴1", "特徴2",...],
                        "policies": ["政策1", "政策2",...]
                    }},
                    {{
                        "name": "地域名2",
                        "reasons": ["理由1", "理由2",...],
                        "features": ["特徴1", "特徴2",...],
                        "policies": ["政策1", "政策2",...]
                    }},
                    {{
                        "name": "地域名3",
                        "reasons": ["理由1", "理由2",...],
                        "features": ["特徴1", "特徴2",...],
                        "policies": ["政策1", "政策2",...]
                    }}
                ]
            }}

            以下は、ユーザー情報と検索結果です。
            「ユーザー情報」：
            {user_profile}

            「検索結果」：
            {search_results}

            """
        )
        
        # 创建生活规划提示模板
        self.life_plan_prompt = PromptTemplate(
            input_variables=['user_profile', 'recommended_locations'],
            template="""
            あなたは、日本の「地方移住」を成功させるためのパーソナルプランナーAIです。
            提供される「ユーザー情報」と、「選択された移住先情報」を分析してください。

            これらの情報に基づき、ユーザーのための具体的な移住計画を策定してください。
            計画は「準備段階 (preparation)」「初期段階 (initial)」「定着段階 (settlement)」の3つの主要フェーズで構成してください。

            計画作成の指針:
            １、具体的かつ実行可能: 各フェーズの計画は、ユーザーが実際に行動に移せるような具体的なステップを含めてください。
            ２、簡潔な記述: 各ステップは簡潔かつ明確に記述してください。
            ３、ユーザー条件の考慮: ユーザーの家族構成（例：子供の年齢、学校の手続きの必要性）、仕事の状況（例：リモートワークか現地就職か）、移住に関する希望条件（「ユーザー情報」を参照）を計画全体に反映させてください。
            ４、地域特性の活用: 移住先の地域特性（「推奨地域」の「特徴」や「支援政策」を参照）を活かした、その地域ならではのステップや活動（例：地域のイベント参加、支援制度の申請タイミング）を提案に含めてください。
            ５、時系列と段階的進行: 時間の経過に沿って、無理なく進められるよう段階的に計画を構成してください。各フェーズの期間（period）も適切に設定してください。
            重要な注意点:
            提案する計画の全てのステップは、提供された「ユーザー情報」と「推奨地域」に明確に基づいている必要があります。提供された情報から逸脱した内容や、根拠のない憶測に基づく提案を含めないでください。事実とユーザーの状況に即した、実現可能な計画作成を最優先としてください。
            
            出力形式:
            以下の指定されたJSON形式のみで出力し、他のテキスト（挨拶、前置き、後書きなど）は一切含めないでください。余分な空白や改行は含めないでください。
            必ず"preparation"、"initial"、"settlement"の3つのキーを含めてください。
            {{
                "preparation": {{
                    "period": "6ヶ月前～移住1ヶ月前",
                    "steps": ["ステップ1", "ステップ2"]
                }},
                "initial": {{
                    "period": "移住後3ヶ月",
                    "steps": ["ステップ1", "ステップ2"]
                }},
                "settlement": {{
                    "period": "移住後1年後～",
                    "steps": ["ステップ1", "ステップ2"]
                }}
            }}
            
            以下は、ユーザー情報と推奨地域です。
            「ユーザー情報」：
            {user_profile}

            「推奨地域」：
            {recommended_locations}
            
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
        try:
            profile_str = "\n".join([f"{k}: {str(v)}" for k, v in user_profile.items()])
            
            # 搜索相关资源
            search_results = {}
            search_top_results = {}  # 存储每个问题的前两条搜索结果
            
            # 分析用户资料，生成问题
            questions_response = self.profile_analysis_chain.invoke({"user_profile": profile_str})
            # 从响应中提取文本内容
            questions_text = questions_response.get('text', '') if isinstance(questions_response, dict) else str(questions_response)
            questions = [q.strip() for q in questions_text.split('\n') if q.strip()]
            
            for question in questions:
                if question.startswith(('1.', '2.', '3.', '4.')):
                    # 去掉问题前面的序号
                    clean_question = question[2:].strip()
                else:
                    clean_question = question
                    
                # 执行搜索并获取完整结果和前两条结果
                full_result, top_three = await self.search_with_serpapi(clean_question)
                search_results[clean_question] = full_result
                search_top_results[clean_question] = top_three
            
            # 生成推荐地点
            response = self.location_recommendation_chain.invoke({
                "user_profile": profile_str,
                "search_results": str(search_results)
            })
            
            # 从响应中提取文本内容
            response_text = response.get('text', '') if isinstance(response, dict) else str(response)
            
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
                print(f"JSON解析にエラーが発生しました: {e}")
                print(f"問題のあるレスポンス: {response_text}")
                raise
                
        except Exception as e:
            print(f"処理中にエラーが発生しました: {str(e)}")
            raise

    async def generate_life_plan(self, user_profile: Dict, recommended_locations: str) -> str:
        """
        生成生活规划
        """
        try:
            profile_str = "\n".join([f"{k}: {str(v)}" for k, v in user_profile.items()])
            
            response = self.life_plan_chain.invoke({
                "user_profile": profile_str,
                "recommended_locations": recommended_locations
            })
            
            # 从响应中提取文本内容
            response_text = response.get('text', '') if isinstance(response, dict) else str(response)
            
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
                print(f"JSON解析にエラーが発生しました: {e}")
                print(f"問題のあるレスポンス: {response_text}")
                raise
                
        except Exception as e:
            print(f"処理中にエラーが発生しました: {str(e)}")
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
                "search_top_results": search_top_results
            }
            
        except Exception as e:
            print(f"処理中にエラーが発生しました: {str(e)}")
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