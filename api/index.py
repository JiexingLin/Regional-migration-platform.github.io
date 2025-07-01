from http.server import BaseHTTPRequestHandler
import json
import asyncio

try:
    from local_migration import JapaneseMigrationAgent
    from chat_service import ChatBotService
    
    # サービスインスタンスの初期化（完全機能版を使用）
    migration_agent = JapaneseMigrationAgent()
    chat_service = ChatBotService()
    
except ImportError as e:
    print(f"Import error: {e}")
    # インポートに失敗した場合、モックサービスを作成
    class MockChatService:
        async def generate_simple_response(self, message, session_id):
            return f"メッセージを受信: {message} (モック応答)"
        
        def get_service_status(self):
            return {"status": "mock", "error": "サービスが正しく読み込まれていません"}
    
    class MockMigrationAgent:
        async def process_migration_consultation(self, user_profile):
            return {"error": "移住サービスが正しく読み込まれていません", "user_profile": user_profile}
    
    chat_service = MockChatService()
    migration_agent = MockMigrationAgent()
except Exception as e:
    print(f"Service initialization error: {e}")
    # 初期化に失敗した場合（APIキー不足など）、モックサービスを使用
    class MockChatService:
        async def generate_simple_response(self, message, session_id):
            return f"API未設定、モック応答: {message}"
        
        def get_service_status(self):
            return {"status": "mock", "error": f"初期化に失敗: {str(e)}"}
    
    class MockMigrationAgent:
        async def process_migration_consultation(self, user_profile):
            return {"error": f"サービス初期化に失敗: {str(e)}", "user_profile": user_profile}
    
    chat_service = MockChatService()
    migration_agent = MockMigrationAgent()

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        """GETリクエストの処理"""
        try:
            # URLパスの解析
            path = self.path
            
            if '/health' in path:
                self._send_json_response({
                    'status': 'healthy',
                    'services': {
                        'migration': 'active',
                        'chat': 'active'
                    },
                    'version': '1.0.0',
                    'environment': 'production'
                })
            elif '/chat/status' in path:
                status = chat_service.get_service_status()
                self._send_json_response(status)
            else:
                self._send_json_response({
                    'message': 'Vercel Python API は正常に動作しています',
                    'available_endpoints': [
                        'POST /api/chat',
                        'POST /api/migration/search', 
                        'GET /api/chat/status',
                        'GET /api/health'
                    ]
                })
                
        except Exception as e:
            self._send_error_response(500, f"サーバーエラー: {str(e)}")

    def do_POST(self):
        """POSTリクエストの処理"""
        try:
            # リクエストボディの読み取り
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            # JSONの解析
            if content_length > 0:
                body = json.loads(post_data.decode('utf-8'))
            else:
                body = {}
            
            path = self.path
            
            if '/chat' in path and '/status' not in path:
                self._handle_chat(body)
            elif '/migration/search' in path:
                self._handle_migration_search(body)
            else:
                self._send_error_response(404, "APIエンドポイントが見つかりません")
                
        except json.JSONDecodeError:
            self._send_error_response(400, "無効なJSON形式です")
        except Exception as e:
            self._send_error_response(500, f"サーバーエラー: {str(e)}")

    def _handle_chat(self, body):
        """チャットリクエストの処理"""
        message = body.get('message')
        session_id = body.get('session_id', 'default')
        
        if not message:
            self._send_error_response(400, "メッセージ内容は空にできません")
            return
        
        try:
            # 同期関数内で非同期関数を呼び出し
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
            
        except Exception as e:
            self._send_error_response(500, f"チャットサービスエラー: {str(e)}")

    def _handle_migration_search(self, body):
        """移住検索リクエストの処理"""
        user_profile = body.get('user_profile')
        
        if not user_profile:
            self._send_error_response(400, "ユーザープロファイル情報は空にできません")
            return
        
        try:
            try:
                loop = asyncio.get_event_loop()
            except RuntimeError:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
            
            result = loop.run_until_complete(
                migration_agent.process_migration_consultation(user_profile)
            )
            
            self._send_json_response(result)
            
        except Exception as e:
            self._send_error_response(500, f"移住サービスエラー: {str(e)}")

    def _send_json_response(self, data, status_code=200):
        """JSON応答の送信"""
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        response_json = json.dumps(data, ensure_ascii=False, indent=2)
        self.wfile.write(response_json.encode('utf-8'))

    def _send_error_response(self, status_code, message):
        """エラー応答の送信"""
        self._send_json_response({
            'error': message,
            'status_code': status_code
        }, status_code)

    def do_OPTIONS(self):
        """CORSプリフライトリクエストの処理"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers() 