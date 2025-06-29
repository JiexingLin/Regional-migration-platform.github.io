from local_migration import JapaneseMigrationAgent
from chat_service import chat_service
import json
import asyncio
from typing import Dict, Any
from urllib.parse import urlparse, parse_qs

# 初始化服务（只初始化一次，提高性能）
migration_agent = JapaneseMigrationAgent()

async def handler(request):
    """
    统一的 Vercel 函数处理器 - 类似开发环境的 main.py
    根据请求路径自动路由到不同的处理函数
    """
    
    # 获取请求路径和方法
    if hasattr(request, 'url'):
        path = urlparse(request.url).path
    else:
        # Vercel 环境中的路径获取
        path = request.get('path', '/api/python/')
    
    method = getattr(request, 'method', 'GET')
    
    print(f"Processing request: {method} {path}")
    
    try:
        # 解析请求体
        body = {}
        if method == 'POST':
            if hasattr(request, 'json'):
                body = await request.json()
            else:
                import json
                body_str = request.get('body', '{}')
                if body_str:
                    body = json.loads(body_str)
        
        # 路由分发 - 就像 FastAPI 的路由一样
        if path.endswith('/chat') or 'chat' in path:
            return await handle_chat(body, method)
        elif path.endswith('/migration/search') or 'migration/search' in path:
            return await handle_migration_search(body, method)
        elif path.endswith('/chat/status') or 'chat/status' in path:
            return await handle_chat_status(body, method)
        elif path.endswith('/health') or 'health' in path:
            return await handle_health_check(body, method)
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({
                    'error': 'Not Found',
                    'path': path,
                    'available_endpoints': [
                        '/api/python/chat',
                        '/api/python/migration/search',
                        '/api/python/chat/status',
                        '/api/python/health'
                    ]
                })
            }
            
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Internal server error',
                'detail': str(e),
                'path': path
            })
        }

async def handle_chat(body: dict, method: str):
    """处理聊天请求 - 对应 main.py 的 /api/chat"""
    if method != 'POST':
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    message = body.get('message')
    session_id = body.get('session_id', 'default')
    stream = body.get('stream', False)
    
    if not message:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Message is required'})
        }
    
    try:
        # 注意：Vercel 函数不支持流式响应，所以统一使用简单响应
        response = await chat_service.generate_simple_response(message, session_id)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': json.dumps({
                'response': response,
                'session_id': session_id,
                'type': 'complete'
            }, ensure_ascii=False)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Chat service error',
                'detail': str(e)
            })
        }

async def handle_migration_search(body: dict, method: str):
    """处理迁移搜索请求 - 对应 main.py 的 /api/migration/search"""
    if method != 'POST':
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    user_profile = body.get('user_profile')
    
    if not user_profile:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'User profile is required'})
        }
    
    try:
        result = await migration_agent.process_migration_consultation(user_profile)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': json.dumps(result, ensure_ascii=False)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Migration service error',
                'detail': str(e)
            })
        }

async def handle_chat_status(body: dict, method: str):
    """处理聊天状态检查 - 对应 main.py 的 /api/chat/status"""
    if method != 'GET':
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        status = chat_service.get_service_status()
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': json.dumps(status, ensure_ascii=False)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Status check failed',
                'detail': str(e)
            })
        }

async def handle_health_check(body: dict, method: str):
    """健康检查 - 对应 main.py 的 /health"""
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
        },
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