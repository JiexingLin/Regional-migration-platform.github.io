from http.server import BaseHTTPRequestHandler
import json
import asyncio

try:
    from chat_service import ChatBotService
    
    # 初始化聊天服务
    chat_service = ChatBotService()
    print("✅ ChatBotService initialized successfully")
    
except ImportError as e:
    print(f"❌ Import error: {e}")
    # 导入失败时使用模拟服务
    class MockChatService:
        async def generate_streaming_response(self, message, session_id):
            # 模拟流式响应
            yield {"type": "chunk", "content": f"❌ サービス初期化エラー: 必要なモジュールが見つかりません。\n"}
            yield {"type": "chunk", "content": f"メッセージ: {message}\n"}
            yield {"type": "chunk", "content": f"管理者にお問い合わせください。"}
            yield {"type": "end"}
        
        async def generate_simple_response(self, message, session_id):
            return f"❌ サービス初期化エラー: 必要なモジュールが見つかりません。メッセージ: {message}"
        
        def get_service_status(self):
            return {"status": "error", "error": "Import failed - missing dependencies"}
    
    chat_service = MockChatService()

except Exception as e:
    error_msg = str(e)
    print(f"❌ Service initialization error: {error_msg}")
    
    # 环境变量相关错误的特殊处理
    if "GOOGLE_API_KEY" in error_msg:
        print("💡 解决方案: Vercelダッシュボードでenvironment variablesを設定してください")
    
    # 初始化失败时使用模拟服务
    class MockChatService:
        async def generate_streaming_response(self, message, session_id):
            # 模拟流式响应
            if "GOOGLE_API_KEY" in error_msg:
                yield {"type": "chunk", "content": "❌ Google APIキーが設定されていません。\n\n"}
                yield {"type": "chunk", "content": "【解決方法】\n"}
                yield {"type": "chunk", "content": "1. Vercelダッシュボードにアクセス\n"}
                yield {"type": "chunk", "content": "2. プロジェクト設定 → Environment Variables\n"}
                yield {"type": "chunk", "content": "3. GOOGLE_API_KEY を追加\n"}
                yield {"type": "chunk", "content": "4. 再デプロイ\n\n"}
                yield {"type": "chunk", "content": f"お送りいただいたメッセージ: {message}"}
            else:
                yield {"type": "chunk", "content": f"❌ システムエラー: {error_msg}\n"}
                yield {"type": "chunk", "content": f"メッセージ: {message}\n"}
                yield {"type": "chunk", "content": "管理者にお問い合わせください。"}
            yield {"type": "end"}
        
        async def generate_simple_response(self, message, session_id):
            if "GOOGLE_API_KEY" in error_msg:
                return f"❌ Google APIキーが設定されていません。Vercelの環境変数設定が必要です。メッセージ: {message}"
            else:
                return f"❌ システムエラー: {error_msg}. メッセージ: {message}"
        
        def get_service_status(self):
            return {"status": "error", "error": f"Initialization failed: {error_msg}"}
    
    chat_service = MockChatService()

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """处理聊天请求 - 支持流式响应"""
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
            stream = body.get('stream', True)  # 默认启用流式响应
            
            if not message:
                self._send_error_response(400, "Message is required")
                return
            
            # 同步函数中调用异步函数
            try:
                loop = asyncio.get_event_loop()
            except RuntimeError:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
            
            if stream:
                # 流式响应
                self._handle_streaming_response(message, session_id, loop)
            else:
                # 非流式响应
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

    def _handle_streaming_response(self, message, session_id, loop):
        """处理流式响应"""
        try:
            # 设置流式响应头
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Connection', 'keep-alive')
            self._send_cors_headers_only()
            self.end_headers()
            
            # 异步生成流式响应
            async def stream_response():
                try:
                    async for chunk in chat_service.generate_streaming_response(message, session_id):
                        # 将每个chunk转换为JSON字符串并发送
                        chunk_json = json.dumps(chunk, ensure_ascii=False)
                        yield chunk_json + '\n'
                except Exception as e:
                    # 发送错误chunk
                    error_chunk = json.dumps({
                        "type": "error",
                        "content": f"ストリーミングエラー: {str(e)}"
                    }, ensure_ascii=False)
                    yield error_chunk + '\n'
            
            # 运行流式响应
            async def run_stream():
                async for chunk in stream_response():
                    self.wfile.write(chunk.encode('utf-8'))
                    self.wfile.flush()
            
            loop.run_until_complete(run_stream())
            
        except Exception as e:
            print(f"Streaming error: {e}")
            # 如果流式响应失败，发送错误
            error_chunk = json.dumps({
                "type": "error",
                "content": f"ストリーミングエラーが発生しました: {str(e)}"
            }, ensure_ascii=False)
            self.wfile.write((error_chunk + '\n').encode('utf-8'))

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
                        'POST /api/chat': 'Send chat message (supports streaming)',
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