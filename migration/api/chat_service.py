# AI聊天服务模块
import os
import re
import asyncio
from typing import List, Dict, Any, AsyncGenerator
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
import logging

# 加载环境变量
load_dotenv()

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ChatBotService:
    """AI聊天机器人服务类"""
    
    def __init__(self):
        self.model = None
        self.system_prompt = self._create_system_prompt()
        self.conversation_history = {}  # 存储用户对话历史
        
    def _create_system_prompt(self) -> str:
        """创建系统提示词"""
        return """
あなたは日本の地方移住をサポートする専門的なAIアシスタントです。

**回答形式の厳格な要求:**
- 回答は必ず3点以内で簡潔にまとめる
- 各ポイントは具体的で実用的な情報を含む
- 重要な情報は**太字**で強調する
- 必ず関連する公式サイトのURLを提供する

**URL提供の必須要求:**
- 回答の最後に「詳細情報」セクションを設ける
- 関連する公式サイトのURLを以下の形式で提供：
  [サイト名](URL)
- 例：[福岡市公式サイト](https://www.city.fukuoka.lg.jp/)
- 市役所、県庁、支援機関の公式URLを優先的に提供

**回答構造の例:**
1. **ポイント1**: 具体的な情報
2. **ポイント2**: 実用的な情報  
3. **ポイント3**: 注意事項や補足

**詳細情報:**
- [関連サイト名](URL)
- [関連サイト名](URL)

あなたの役割：
- 地方移住に関する簡潔で実用的な情報提供
- 移住希望者の具体的な質問に効率的に対応
- 各地域の特色、支援制度、生活環境の要点説明
- 正確な公式情報源の提供

応答の特徴：
- 簡潔で分かりやすい日本語
- 3点以内での要点整理
- 具体的な数値や制度名を含む
- 必ず公式URLを含める
- 読み手が迅速に必要な情報を得られる構成

注意事項：
- 常に最新で正確な情報提供
- 公式サイトのURLは実在するものを提供
- 移住の重要性を理解した慎重なアドバイス
- 客観的で実用的な情報を重視
"""
    
    def _initialize_model(self):
        """Google AI モデルを初期化"""
        if self.model is None:
            api_key = os.getenv('GOOGLE_API_KEY')
            if not api_key:
                raise ValueError("GOOGLE_API_KEY environment variable is not set")
            
            self.model = ChatGoogleGenerativeAI(
                google_api_key=api_key,
                model="gemini-2.0-flash",  # 使用最新的Gemini模型
                temperature=0.7,
                max_tokens=1024,
                streaming=True
            )
            logger.info("Google AI model initialized successfully")
        
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
    
    def _build_messages(self, user_message: str, session_id: str) -> List:
        """构建消息列表"""
        messages = [SystemMessage(content=self.system_prompt)]
        
        # 添加历史对话
        history = self._get_conversation_history(session_id)
        for msg in history[-10:]:  # 只使用最近10条消息作为上下文
            if msg['type'] == 'user':
                messages.append(HumanMessage(content=msg['content']))
            elif msg['type'] == 'assistant':
                messages.append(AIMessage(content=msg['content']))
        
        # 添加当前用户消息
        messages.append(HumanMessage(content=user_message))
        
        return messages
    
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
            messages = self._build_messages(user_message, session_id)
            
            logger.info(f"Generating response for session {session_id}: {user_message[:50]}...")
            
            # 更新用户消息到历史
            self._update_conversation_history(session_id, {
                'type': 'user',
                'content': user_message,
                'timestamp': asyncio.get_event_loop().time()
            })
            
            full_response = ""
            
            # 流式生成响应
            async for chunk in model.astream(messages):
                if chunk.content:
                    full_response += chunk.content
                    
                    yield {
                        'type': 'chunk',
                        'content': chunk.content,
                        'session_id': session_id
                    }
            
            # 后处理完整响应
            processed_response = self._post_process_response(full_response)
            
            # 更新AI响应到历史
            self._update_conversation_history(session_id, {
                'type': 'assistant',
                'content': processed_response,
                'timestamp': asyncio.get_event_loop().time()
            })
            
            # 发送结束信号
            yield {
                'type': 'end',
                'full_response': processed_response,
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
            messages = self._build_messages(user_message, session_id)
            
            response = await model.ainvoke(messages)
            
            # 更新对话历史
            self._update_conversation_history(session_id, {
                'type': 'user',
                'content': user_message,
                'timestamp': asyncio.get_event_loop().time()
            })
            
            self._update_conversation_history(session_id, {
                'type': 'assistant',
                'content': response.content,
                'timestamp': asyncio.get_event_loop().time()
            })
            
            return response.content
            
        except Exception as e:
            logger.error(f"Error in simple response: {str(e)}")
            return "申し訳ございません。現在システムに問題が発生しています。しばらくしてから再度お試しください。"
    
    def get_service_status(self) -> Dict[str, Any]:
        """获取服务状态"""
        return {
            'status': 'active',
            'model': 'gemini-1.5-flash',
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

# 全局聊天服务实例
chat_service = ChatBotService() 