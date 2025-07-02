# Vercel API 结构说明

本项目按照 [Vercel Python Runtime 官方文档](https://vercel.com/docs/functions/runtimes/python) 标准实现，每个API端点对应一个独立的Python文件。

## 📁 API 文件结构

```
migration/api/
├── chat.py                    # 聊天API - /api/chat
├── health.py                  # 健康检查 - /api/health  
├── migration/
│   └── search.py             # 移住搜索 - /api/migration/search
├── chat_service.py           # 聊天服务模块
├── local_migration.py        # 移住推荐服务模块
├── requirements.txt          # Python依赖
└── main.py                   # 本地开发用FastAPI服务器
```

## 🔗 API 端点映射

| 前端调用路径 | 实际API端点 | Python文件 | 功能描述 |
|------------|------------|------------|----------|
| `/api/chat` | `/api/chat` | `chat.py` | AI聊天功能 |
| `/api/migration/search` | `/api/migration/search` | `migration/search.py` | 移住地推荐 |
| `/api/health` | `/api/health` | `health.py` | 健康检查 |

## ⚙️ Vercel 配置

### vercel.json
```json
{
  "version": 2,
  "env": {
    "USE_PYTHON_BACKEND": "true",
    "NODE_ENV": "production"
  },
  "builds": [
    {
      "src": "next.config.js",
      "use": "@vercel/next"
    },
    {
      "src": "api/**/*.py",
      "use": "@vercel/python"
    }
  ]
}
```

### 特点
- ✅ **标准化**: 按照Vercel官方标准实现
- ✅ **简化配置**: 无需复杂的rewrites规则
- ✅ **自动映射**: Vercel自动将`api/*.py`映射为函数端点
- ✅ **独立函数**: 每个端点独立部署，提高性能

## 🚀 部署要求

1. **Vercel项目设置**:
   - Root Directory: `migration`
   - Framework: Next.js
   - Node.js Version: 18.x

2. **环境变量**:
   ```
   GOOGLE_API_KEY=your_google_api_key
   SERPAPI_API_KEY=your_serpapi_key
   USE_PYTHON_BACKEND=true
   NODE_ENV=production
   ```

## 📋 Python 函数标准格式

每个Python函数都按照以下格式实现：

```python
from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # 处理POST请求
        pass
    
    def do_GET(self):
        # 处理GET请求
        pass
    
    def do_OPTIONS(self):
        # 处理CORS预检请求
        pass
```

## 🔧 本地开发

对于本地开发，可以使用 `main.py` 中的FastAPI服务器：

```bash
cd migration/api
python main.py
```

这将在 `http://127.0.0.1:8000` 启动本地开发服务器。 