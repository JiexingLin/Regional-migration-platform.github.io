from http.server import BaseHTTPRequestHandler
import json
import asyncio

try:
    from chat_service import ChatBotService
    
    # 初始化聊天服务
    chat_service = ChatBotService()
    
except ImportError as e:
    print(f"Import error: {e}")
    # 导入失败时使用模拟服务
    class MockChatService:
        async def generate_simple_response(self, message, session_id):
            return f"メッセージを受信: {message} (モック応答)"
        
        def get_service_status(self):
            return {"status": "mock", "error": "サービスが正しく読み込まれていません"}
    
    chat_service = MockChatService()

except Exception as e:
    print(f"Service initialization error: {e}")
    # 初始化失败时使用模拟服务
    class MockChatService:
        async def generate_simple_response(self, message, session_id):
            return f"API未設定、モック応答: {message}"
        
        def get_service_status(self):
            return {"status": "mock", "error": f"初期化に失敗: {str(e)}"}
    
    chat_service = MockChatService()

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """处理聊天请求"""
        try:
            # 读取请求体
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > 0:
                post_data = self.rfile.read(content_length)
                body = json.loads(post_data.decode('utf-8'))
            else:
                self._send_error_response(400, "Empty request body")
                return
            
            message = body.get('message')
            session_id = body.get('session_id', 'default')
            
            if not message:
                self._send_error_response(400, "Message is required")
                return
            
            # 同步函数中调用异步函数
            try:
                loop = asyncio.get_event_loop()
            except RuntimeError:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
            
            response = loop.run_until_complete(
                chat_service.generate_simple_response(message, session_id)
            )
            
            self._send_json_response({
                'response': response,
                'session_id': session_id,
                'type': 'complete'
            })
            
        except json.JSONDecodeError:
            self._send_error_response(400, "Invalid JSON format")
        except Exception as e:
            self._send_error_response(500, f"Chat service error: {str(e)}")

    def do_GET(self):
        """处理GET请求 - 检查聊天状态"""
        try:
            # 检查路径是否包含status
            if '/status' in self.path:
                status = chat_service.get_service_status()
                self._send_json_response(status)
            else:
                self._send_json_response({
                    'message': 'Chat API endpoint',
                    'methods': ['POST', 'GET'],
                    'endpoints': {
                        'POST /api/chat': 'Send chat message',
                        'GET /api/chat/status': 'Get service status'
                    }
                })
        except Exception as e:
            self._send_error_response(500, f"Status check failed: {str(e)}")

    def do_OPTIONS(self):
        """处理CORS预检请求"""
        self._send_cors_headers()

    def _send_json_response(self, data, status_code=200):
        """发送JSON响应"""
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self._send_cors_headers_only()
        self.end_headers()
        
        response_json = json.dumps(data, ensure_ascii=False, indent=2)
        self.wfile.write(response_json.encode('utf-8'))

    def _send_error_response(self, status_code, message):
        """发送错误响应"""
        self._send_json_response({
            'error': message,
            'status_code': status_code
        }, status_code)

    def _send_cors_headers(self):
        """发送CORS头（仅用于OPTIONS）"""
        self.send_response(200)
        self._send_cors_headers_only()
        self.end_headers()

    def _send_cors_headers_only(self):
        """只发送CORS头部，不发送响应"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type') 