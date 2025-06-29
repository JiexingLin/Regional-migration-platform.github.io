# 地方移住平台 - Python + LangChain 架构

## 📋 项目概述

这是一个基于Next.js前端和Python后端的地方移住支持平台，集成了AI聊天机器人功能。该项目使用现代化的技术栈，提供了完整的用户交互体验。

### 🏗️ 技术栈

**前端 (Next.js)**
- Next.js 15.3.1 (App Router)
- React 19.0.0
- CSS Modules + Tailwind CSS
- 响应式设计

**后端 (Python)**
- FastAPI (现代Python Web框架)
- LangChain (AI应用开发框架)
- Google Gemini 1.5 Flash (AI模型)
- Uvicorn (ASGI服务器)

**AI功能**
- 流式响应
- 会话管理
- 上下文保持
- 多用户支持

## 🚀 快速开始

### 1. 环境准备

确保您的系统已安装：
- Node.js 18.0.0+
- Python 3.8+
- npm 或 yarn

### 2. 项目安装

```bash
# 克隆项目（如果从git）
git clone [your-repo-url]
cd Regional-migration-platform/migration

# 安装前端依赖
npm install

# 安装Python依赖
npm run python:install
```

### 3. 环境配置

#### 前端环境变量 (.env.local)
```env
# Python后端API地址
PYTHON_API_URL=http://127.0.0.1:8000

# 是否使用Python后端
USE_PYTHON_BACKEND=true
```

#### Python后端环境变量 (api/.env)
```env
# Google AI API密钥
GOOGLE_API_KEY=your_google_api_key_here

# 服务器配置
HOST=127.0.0.1
PORT=8000
RELOAD=True

# 日志级别
LOG_LEVEL=INFO

# CORS设置
ALLOWED_ORIGINS=http://localhost:3000
```

### 4. 获取Google API密钥

1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 登录您的Google账户
3. 创建新的API密钥
4. 将密钥添加到 `api/.env` 文件

### 5. 启动服务

#### 推荐方式：同时启动前后端
```bash
npm run dev:full
```

#### 分别启动
```bash
# 终端1: Python后端
npm run python:start

# 终端2: Next.js前端
npm run dev
```

#### 使用Python启动脚本
```bash
cd api
python start.py
```

## 📁 项目结构

```
migration/
├── api/                      # Python后端
│   ├── main.py              # FastAPI主应用
│   ├── chat_service.py      # AI聊天服务
│   ├── local_migration.py  # 移住推荐服务
│   ├── requirements.txt     # Python依赖
│   ├── start.py            # 启动脚本
│   └── .env                # Python环境变量
├── src/
│   ├── app/
│   │   ├── api/chat/
│   │   │   └── route.js    # Next.js API代理
│   │   ├── (header)/       # 页面路由
│   │   └── layout.js       # 布局组件
│   ├── components/
│   │   ├── ChatBot.js      # 聊天机器人组件
│   │   └── navigation.js   # 导航组件
│   └── global/
│       ├── css/            # 样式文件
│       └── img/            # 图片资源
├── public/                  # 静态资源
├── package.json            # 前端依赖配置
├── .env.local             # 前端环境变量
└── README.md              # 项目说明
```

## 🔧 可用脚本

```bash
# 前端开发
npm run dev                 # 启动Next.js开发服务器
npm run build              # 构建生产版本
npm run start              # 启动生产服务器
npm run lint               # 代码检查

# Python后端
npm run python:install     # 安装Python依赖
npm run python:start       # 启动Python服务器（带健康检查）
npm run python:dev         # 启动Python开发服务器

# 全栈开发
npm run dev:full           # 同时启动前后端
```

## 💬 AI聊天功能

### 特性
- **实时流式响应**: AI回答实时显示
- **拖拽式界面**: 可拖动的聊天气泡
- **会话管理**: 每个用户独立的对话历史
- **上下文保持**: 智能记忆对话内容
- **错误处理**: 优雅的错误处理和降级方案
- **多用户支持**: 支持并发用户使用

### API端点
- `POST /api/chat` - 发送聊天消息
- `GET /api/chat/status` - 获取服务状态
- `DELETE /api/chat/session/{session_id}` - 清除会话历史
- `GET /health` - 健康检查

### 使用方式
1. 点击屏幕右下角的聊天气泡
2. 在弹出的聊天窗口中输入消息
3. AI将实时回复您的问题
4. 可以拖动气泡到屏幕任意位置

## 🛠️ 开发指南

### 自定义AI行为

#### 修改系统提示词
编辑 `api/chat_service.py` 中的 `_create_system_prompt()` 方法：

```python
def _create_system_prompt(self) -> str:
    return """
    あなたは日本の地方移住をサポートする専門的なAIアシスタントです。
    
    # 在这里自定义AI的角色和行为
    """
```

#### 调整模型参数
```python
self.model = ChatGoogleGenerativeAI(
    google_api_key=api_key,
    model="gemini-1.5-flash",        # 模型选择 (可选: gemini-1.5-pro)
    temperature=0.7,                 # 创造性 (0.0-1.0)
    max_tokens=1024,                 # 最大输出长度
    streaming=True,
)
```

### 添加新的API端点

在 `api/main.py` 中添加新的路由：

```python
@app.post("/api/your-endpoint")
async def your_function(request: YourRequestModel):
    # 实现您的逻辑
    return {"result": "success"}
```

### 前端组件开发

聊天机器人组件位于 `src/components/ChatBot.js`，支持：
- 拖拽功能
- 流式响应显示
- 响应式设计
- 状态管理

## 🔍 故障排除

### 常见问题

1. **Python依赖安装失败**
   ```bash
   # 升级pip
   pip install --upgrade pip
   
   # 使用镜像源
   pip install -r requirements.txt -i https://pypi.douban.com/simple/
   ```

2. **API连接失败**
   - 检查Python服务器是否启动 (http://127.0.0.1:8000)
   - 验证环境变量配置
   - 查看浏览器网络请求

3. **Google API密钥问题**
   - 确认密钥有效性
   - 检查API配额
   - 验证权限设置

4. **模型不可用错误**
   ```
   404 models/gemini-pro is not found
   ```
   **解决方案**: 确保使用最新的模型名称 `gemini-1.5-flash`
   
   如果仍有问题，可以尝试：
   - `gemini-1.5-pro` (更强但较慢)
   - `gemini-1.0-pro` (传统模型)
   
   详见 `api/MODELS_INFO.md` 获取完整的模型信息

5. **会话问题**
   - 检查会话ID生成
   - 清除浏览器缓存
   - 重启Python服务器

### 调试技巧

1. **查看日志**
   ```bash
   # Python后端日志
   cd api && python start.py
   
   # Next.js日志
   npm run dev
   ```

2. **健康检查**
   - 访问 http://127.0.0.1:8000/health
   - 访问 http://localhost:3000/api/chat (GET)

3. **API文档**
   - 访问 http://127.0.0.1:8000/docs (FastAPI自动生成)

## 📈 性能优化

- **流式响应**: 减少等待时间
- **会话管理**: 智能内存管理
- **并发处理**: 支持多用户同时使用
- **错误恢复**: 自动重试机制

## 🔐 安全考虑

- API密钥安全存储
- CORS配置
- 输入验证
- 错误信息处理

## 📱 移动端支持

聊天机器人完全支持移动端设备：
- 触摸拖拽
- 响应式布局
- 适配小屏幕

## 🤝 贡献指南

1. Fork项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

[在此添加您的许可证信息]

## 📞 支持

如有问题，请：
1. 查看故障排除部分
2. 检查日志输出
3. 创建Issue报告问题

---

**注意**: 确保遵循最佳实践，定期更新依赖，并保护您的API密钥安全。 