from http.server import BaseHTTPRequestHandler
import json
import asyncio
import sys
import os

# 添加父目录到Python路径以导入模块
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

try:
    from local_migration import JapaneseMigrationAgent
    
    # 初始化移住服务
    migration_agent = JapaneseMigrationAgent()
    
except ImportError as e:
    print(f"Import error: {e}")
    # 导入失败时使用模拟服务
    class MockMigrationAgent:
        async def process_migration_consultation(self, user_profile):
            return {
                "error": "移住サービスが正しく読み込まれていません", 
                "user_profile": user_profile,
                "status": "mock"
            }
    
    migration_agent = MockMigrationAgent()

except Exception as e:
    print(f"Service initialization error: {e}")
    # 初始化失败时使用模拟服务
    class MockMigrationAgent:
        async def process_migration_consultation(self, user_profile):
            return {
                "error": f"サービス初期化に失敗: {str(e)}", 
                "user_profile": user_profile,
                "status": "error"
            }
    
    migration_agent = MockMigrationAgent()

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """处理移住搜索请求"""
        try:
            # 读取请求体
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > 0:
                post_data = self.rfile.read(content_length)
                body = json.loads(post_data.decode('utf-8'))
            else:
                self._send_error_response(400, "Empty request body")
                return
            
            user_profile = body.get('user_profile')
            
            if not user_profile:
                self._send_error_response(400, "User profile is required")
                return
            
            # 同步函数中调用异步函数
            try:
                loop = asyncio.get_event_loop()
            except RuntimeError:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
            
            result = loop.run_until_complete(
                migration_agent.process_migration_consultation(user_profile)
            )
            
            self._send_json_response(result)
            
        except json.JSONDecodeError:
            self._send_error_response(400, "Invalid JSON format")
        except Exception as e:
            self._send_error_response(500, f"Migration service error: {str(e)}")

    def do_GET(self):
        """处理GET请求 - 显示API信息"""
        self._send_json_response({
            'message': 'Migration Search API endpoint',
            'methods': ['POST'],
            'description': 'Send user profile to get migration recommendations',
            'example_request': {
                'user_profile': {
                    '基本情報': '30代、IT関連',
                    '移住理由': '自然環境の良い場所での生活',
                    '希望条件': '在宅勤務可能、子育て支援充実'
                }
            }
        })

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