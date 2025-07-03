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
  ],
  "functions": {
    "api/**/*.py": {
      "runtime": "python3.9"
    }
  }
}
```

## 🔑 **必须设置的环境变量**

### **Step 1: 获取Google AI API密钥**
1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 点击 "Create API Key"
3. 复制生成的API密钥

### **Step 2: 在Vercel中设置环境变量**
1. 访问您的 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目
3. 点击 **Settings** 标签页
4. 在左侧菜单中选择 **Environment Variables**
5. 添加以下环境变量：

| 变量名 | 值 | 说明 |
|-------|-----|------|
| `GOOGLE_API_KEY` | 您的Google AI API密钥 | **必需** - 用于AI聊天和移住推荐 |
| `SERPAPI_API_KEY` | 您的SerpAPI密钥（可选） | 可选 - 用于搜索官方URL |
| `USE_PYTHON_BACKEND` | `true` | 必需 - 启用Python后端 |
| `NODE_ENV` | `production` | 建议 - 生产环境标识 |

### **Step 3: 重新部署**
设置环境变量后，需要重新部署：
1. 在Vercel项目页面点击 **Deployments** 标签页
2. 点击最新部署右侧的三个点按钮
3. 选择 **Redeploy**
4. 等待部署完成

## 🚨 **常见问题解决**

### **聊天机器人显示"Google APIキーが設定されていません"**
- ✅ 检查是否正确设置了 `GOOGLE_API_KEY` 环境变量
- ✅ 确认API密钥有效且没有过期
- ✅ 重新部署项目

### **移住搜索功能不工作**
- ✅ 检查是否正确设置了 `GOOGLE_API_KEY` 环境变量
- ✅ 重新部署项目

### **部署成功但功能不工作**
1. 检查Vercel函数日志：
   - 项目页面 → Functions 标签页
   - 查看最近的函数调用日志
2. 验证环境变量：
   - 访问 `/api/health` 端点检查服务状态

## 🔧 **本地开发环境设置**

1. **创建 `.env` 文件**：
```bash
GOOGLE_API_KEY=your_google_api_key_here
SERPAPI_API_KEY=your_serpapi_key_here  # 可选
USE_PYTHON_BACKEND=true
```

2. **安装依赖**：
```bash
cd migration/api
pip install -r requirements.txt
```

3. **运行开发服务器**：
```bash
cd migration
npm run dev
```

## 🚀 部署要求

1. **Vercel项目设置**:
   - Root Directory: `migration`
   - Framework: Next.js
   - Node.js Version: 18.x

2. **环境变量**（在Vercel Dashboard中设置）:
   ```
   GOOGLE_API_KEY=your_google_api_key
   SERPAPI_API_KEY=your_serpapi_key  # 可选
   USE_PYTHON_BACKEND=true
   NODE_ENV=production
   ```

## 📋 Python 函数标准格式

每个API端点都必须按照Vercel Python Runtime标准实现：

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
        self._send_cors_headers()
    
    def _send_cors_headers(self):
        # CORS头部设置
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
```

### 特点
- ✅ **标准化**: 按照Vercel官方标准实现
- ✅ **简化配置**: 无需复杂的rewrites规则
- ✅ **自动映射**: Vercel自动将`api/*.py`映射为函数端点
- ✅ **独立函数**: 每个端点独立部署，提高性能

## 🔍 **调试和监控**

### **查看函数日志**
1. Vercel Dashboard → 您的项目
2. Functions 标签页
3. 点击特定函数查看详细日志

### **健康检查端点**
访问 `/api/health` 获取系统状态：
```json
{
  "status": "healthy",
  "services": {
    "migration": "active",
    "chat": "active"
  },
  "version": "1.0.0"
}
```

### **聊天服务状态检查**
访问 `/api/chat/status` 获取详细服务状态：
```json
{
  "status": "active",
  "model": "gemini-2.0-flash",
  "has_google_api_key": true,
  "model_initialized": true
}
``` 