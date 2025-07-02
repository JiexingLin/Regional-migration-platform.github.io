import json
import asyncio
from urllib.parse import urlparse, parse_qs

try:
    from local_migration import JapaneseMigrationAgent
    from chat_service import ChatBotService
    
    # 初始化服务（只初始化一次，提高性能）
    migration_agent = JapaneseMigrationAgent()
    chat_service = ChatBotService()
    
except ImportError as e:
    print(f"Import error: {e}")
    # 导入失败时使用模拟服务
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
    # 初始化失败时使用模拟服务
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

def handler(event, context):
    """
    Vercel无服务器函数处理器
    处理来自前端的 /api/python/* 请求
    """
    
    try:
        # 获取HTTP方法
        method = event.get('httpMethod') or event.get('method', 'GET')
        
        # 获取请求路径 - Vercel会通过queryStringParameters传递路径
        path_params = event.get('queryStringParameters') or {}
        path = path_params.get('path', '') or event.get('rawPath', '')
        
        # 如果没有path参数，尝试从headers获取
        if not path:
            headers = event.get('headers', {})
            referer = headers.get('referer', '')
            if '/api/python/' in referer:
                path = referer.split('/api/python/')[-1]
        
        print(f"Processing request: {method} {path}")
        
        # 解析请求体
        body = {}
        if method == 'POST':
            body_str = event.get('body', '{}')
            if body_str:
                try:
                    # 处理base64编码的body
                    if event.get('isBase64Encoded', False):
                        import base64
                        body_str = base64.b64decode(body_str).decode('utf-8')
                    body = json.loads(body_str)
                except json.JSONDecodeError as e:
                    return {
                        'statusCode': 400,
                        'headers': _get_cors_headers(),
                        'body': json.dumps({'error': 'Invalid JSON format'})
                    }
        
        # 路由分发
        if method == 'GET':
            if 'health' in path:
                return _handle_health_check()
            elif 'chat/status' in path:
                return _handle_chat_status()
            else:
                return _handle_default_get()
                
        elif method == 'POST':
            if 'chat' in path and 'status' not in path:
                return _handle_chat(body)
            elif 'migration/search' in path:
                return _handle_migration_search(body)
            else:
                return {
                    'statusCode': 404,
                    'headers': _get_cors_headers(),
                    'body': json.dumps({'error': 'API endpoint not found'})
                }
                
        elif method == 'OPTIONS':
            return _handle_options()
            
        else:
            return {
                'statusCode': 405,
                'headers': _get_cors_headers(),
                'body': json.dumps({'error': 'Method not allowed'})
            }
            
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return {
            'statusCode': 500,
            'headers': _get_cors_headers(),
            'body': json.dumps({
                'error': 'Internal server error',
                'detail': str(e)
            })
        }

def _get_cors_headers():
    """获取CORS头"""
    return {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    }

def _handle_health_check():
    """健康检查"""
    return {
        'statusCode': 200,
        'headers': _get_cors_headers(),
        'body': json.dumps({
            'status': 'healthy',
            'services': {
                'migration': 'active',
                'chat': 'active'
            },
            'version': '1.0.0',
            'environment': 'production'
        }, ensure_ascii=False)
    }

def _handle_chat_status():
    """聊天状态检查"""
    try:
        status = chat_service.get_service_status()
        return {
            'statusCode': 200,
            'headers': _get_cors_headers(),
            'body': json.dumps(status, ensure_ascii=False)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': _get_cors_headers(),
            'body': json.dumps({
                'error': 'Status check failed',
                'detail': str(e)
            })
        }

def _handle_default_get():
    """默认GET请求处理"""
    return {
        'statusCode': 200,
        'headers': _get_cors_headers(),
        'body': json.dumps({
            'message': 'Vercel Python API 正常运行',
            'available_endpoints': [
                'POST /api/python/chat',
                'POST /api/python/migration/search',
                'GET /api/python/chat/status',
                'GET /api/python/health'
            ]
        }, ensure_ascii=False)
    }

def _handle_chat(body):
    """处理聊天请求"""
    message = body.get('message')
    session_id = body.get('session_id', 'default')
    
    if not message:
        return {
            'statusCode': 400,
            'headers': _get_cors_headers(),
            'body': json.dumps({'error': 'Message is required'})
        }
    
    try:
        # 同步函数中调用异步函数
        try:
            loop = asyncio.get_event_loop()
        except RuntimeError:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
        
        response = loop.run_until_complete(
            chat_service.generate_simple_response(message, session_id)
        )
        
        return {
            'statusCode': 200,
            'headers': _get_cors_headers(),
            'body': json.dumps({
                'response': response,
                'session_id': session_id,
                'type': 'complete'
            }, ensure_ascii=False)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': _get_cors_headers(),
            'body': json.dumps({
                'error': 'Chat service error',
                'detail': str(e)
            })
        }

def _handle_migration_search(body):
    """处理移住搜索请求"""
    user_profile = body.get('user_profile')
    
    if not user_profile:
        return {
            'statusCode': 400,
            'headers': _get_cors_headers(),
            'body': json.dumps({'error': 'User profile is required'})
        }
    
    try:
        try:
            loop = asyncio.get_event_loop()
        except RuntimeError:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
        
        result = loop.run_until_complete(
            migration_agent.process_migration_consultation(user_profile)
        )
        
        return {
            'statusCode': 200,
            'headers': _get_cors_headers(),
            'body': json.dumps(result, ensure_ascii=False)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': _get_cors_headers(),
            'body': json.dumps({
                'error': 'Migration service error',
                'detail': str(e)
            })
        }

def _handle_options():
    """处理CORS预检请求"""
    return {
        'statusCode': 200,
        'headers': _get_cors_headers(),
        'body': ''
    } 