from http.server import BaseHTTPRequestHandler
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        """健康检查端点"""
        try:
            # 检查环境变量
            google_api_key = os.getenv('GOOGLE_API_KEY')
            serpapi_key = os.getenv('SERPAPI_API_KEY')
            use_python_backend = os.getenv('USE_PYTHON_BACKEND')
            
            # 基本健康检查
            health_status = {
                'status': 'healthy',
                'services': {
                    'migration': 'active' if google_api_key else 'config_missing',
                    'chat': 'active' if google_api_key else 'config_missing'
                },
                'version': '1.0.0',
                'environment': 'production',
                'timestamp': self._get_timestamp(),
                'configuration': {
                    'has_google_api_key': bool(google_api_key),
                    'google_api_key_length': len(google_api_key) if google_api_key else 0,
                    'has_serpapi_key': bool(serpapi_key),
                    'use_python_backend': use_python_backend,
                    'python_version': self._get_python_version()
                }
            }
            
            # 如果缺少关键配置，调整状态
            if not google_api_key:
                health_status['status'] = 'configuration_error'
                health_status['error'] = 'GOOGLE_API_KEY environment variable is not set'
                health_status['solution'] = {
                    'steps': [
                        '1. Go to Vercel Dashboard',
                        '2. Select your project',
                        '3. Navigate to Settings → Environment Variables',
                        '4. Add GOOGLE_API_KEY with your Google AI API key',
                        '5. Redeploy the project'
                    ],
                    'api_key_link': 'https://makersuite.google.com/app/apikey'
                }
            
            self._send_json_response(health_status)
            
        except Exception as e:
            self._send_error_response(500, f"Health check failed: {str(e)}")

    def do_OPTIONS(self):
        """处理CORS预检请求"""
        self._send_cors_headers()

    def _get_timestamp(self):
        """获取当前时间戳"""
        from datetime import datetime
        return datetime.utcnow().isoformat() + 'Z'
    
    def _get_python_version(self):
        """获取Python版本信息"""
        import sys
        return f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"

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
            'status_code': status_code,
            'timestamp': self._get_timestamp()
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