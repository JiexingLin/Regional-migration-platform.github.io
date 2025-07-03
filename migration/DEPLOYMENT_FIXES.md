# Vercel 部署问题修复方案

## 问题总结

1. ✅ **已修复**: Vercel构建遇到 `serpapi/__pycache__/__version__.cpython-39.pyc` 文件不存在的错误
2. ✅ **已修复**: `chat_service.py` 被Vercel误认为API端点的问题

## 根本原因与解决方案

### 问题1: 包冲突问题 ✅ 已修复

**原因**: `requirements.txt` 中同时包含了两个冲突的包：
- `serpapi==0.1.5` (旧包，有问题)
- `google-search-results==2.4.2` (正确的包)

**解决方案**: 
- ✅ 从 `requirements.txt` 移除 `serpapi==0.1.5`
- ✅ 保留 `google-search-results==2.4.2`
- ✅ 移除不需要的 `aiohttp` 依赖

### 问题2: chat_service.py 作为API端点问题 ✅ 已修复

**原因**: Vercel 自动将 `api/` 目录下的所有 `.py` 文件当作 serverless 函数，但 `chat_service.py` 只是服务类

**解决方案**:
- ✅ 移动 `chat_service.py` 到 `lib/chat_service.py`
- ✅ 创建 `lib/__init__.py` 使其成为Python包
- ✅ 更新所有导入语句为 `from lib.chat_service import ChatBotService`
- ✅ 在API文件中添加Python路径设置

### 问题3: Python字节码缓存问题 ✅ 已修复

**解决方案**:
- ✅ 添加 `PYTHONDONTWRITEBYTECODE=1` 环境变量
- ✅ 更新 `.vercelignore` 忽略缓存文件
- ✅ 确保 `lib/` 目录不被忽略（`!lib/`）

## 当前项目结构

```
migration/
├── api/                    # Vercel API函数
│   ├── chat.py            # ✅ 聊天API端点
│   ├── health.py          # ✅ 健康检查端点
│   ├── local_migration.py # ✅ 移住搜索端点
│   ├── main.py            # FastAPI应用
│   └── requirements.txt   # Python依赖
├── lib/                   # 🆕 服务类库
│   ├── __init__.py       # Python包初始化
│   └── chat_service.py   # 🆕 聊天服务类
└── vercel.json           # Vercel配置
```

## 部署前检查清单

### ✅ 必需的环境变量
确保在Vercel中设置：
- `GOOGLE_API_KEY`: Google AI API密钥
- `SERPAPI_API_KEY`: SerpAPI密钥 (可选但推荐)
- `PYTHONDONTWRITEBYTECODE`: "1" (防止字节码问题)

### ✅ 代码导入验证
所有代码文件使用统一的导入方式：
```python
from lib.chat_service import ChatBotService  # ✅ 正确
```

### ✅ Python路径设置
API文件中包含路径设置：
```python
# 添加项目根目录到Python路径
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_dir)
if project_root not in sys.path:
    sys.path.insert(0, project_root)
```

## 验证步骤

### 1. 构建验证
- Vercel函数列表中应该只显示API端点
- 不应该出现 `chat_service` 函数

### 2. 功能验证
部署后测试以下端点：
- ✅ `/api/health` - 检查服务状态和环境变量
- ✅ `/api/chat` - 聊天机器人功能（流式响应）
- ✅ `/api/migration/search` - 移住搜索功能
- ✅ `/api/local_migration` - 本地化搜索

## 当前包依赖

### migration/api/requirements.txt (Vercel 函数)
```
google-generativeai>=0.7.0,<0.8.0
google-search-results>=2.4.0,<3.0.0
requests>=2.31.0,<3.0.0
```

### migration/requirements.txt (本地开发)
```
google-generativeai==0.7.2
google-search-results==2.4.2
requests==2.31.0
```

## 故障排除

### 如果仍然遇到导入问题

1. **清空 Vercel 构建缓存**:
   ```bash
   vercel --force
   ```

2. **检查Python路径**:
   - 确保 `lib/` 目录存在于项目根目录
   - 确保 `lib/__init__.py` 文件存在
   - 检查导入语句是否正确

3. **检查 .vercelignore**:
   - 确保包含 `!lib/` 规则
   - 确保不忽略必要的服务文件

### 如果函数超时

1. **检查流式响应**:
   - 确保立即发送心跳包
   - 检查异步函数的实现

2. **环境变量**:
   - 验证 API 密钥设置正确
   - 检查服务初始化是否成功

## 注意事项

1. **目录结构**: `lib/` 目录用于存放服务类，`api/` 目录只用于API端点
2. **包版本管理**: 避免同时安装冲突的Python包
3. **缓存问题**: Python字节码文件可能导致Vercel构建失败
4. **环境变量**: 确保生产环境中设置了所有必需的API密钥
5. **导入一致性**: 所有文件使用相同的导入语句
6. **路径设置**: API文件需要正确的Python路径设置来找到lib目录

## 监控建议

部署后监控：
- Vercel 构建日志
- API 响应时间
- 错误率和异常日志
- 环境变量配置状态 