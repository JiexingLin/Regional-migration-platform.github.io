# Vercel 部署问题修复方案

## 问题总结

Vercel构建遇到 `serpapi/__pycache__/__version__.cpython-39.pyc` 文件不存在的错误。

## 根本原因

1. **包冲突**: `requirements.txt` 中同时包含了两个冲突的包：
   - `serpapi==0.1.5` (旧包，有问题)
   - `google-search-results==2.4.2` (正确的包)

2. **Python字节码缓存问题**: Vercel构建时生成的`.pyc`文件与包结构不一致

## 解决方案

### 1. 清理包依赖

已修复：
- ✅ 从 `requirements.txt` 移除 `serpapi==0.1.5`
- ✅ 保留 `google-search-results==2.4.2`
- ✅ 移除不需要的 `aiohttp` 依赖（已替换为 `requests`）

### 2. 更新 .vercelignore

添加了更多忽略规则：
```
# Python相关
__pycache__/
*.py[cod]
*$py.class
bin/
serpapi/
google_search_results/
```

### 3. 配置 vercel.json

添加环境变量防止字节码文件生成：
```json
{
  "env": {
    "PYTHONDONTWRITEBYTECODE": "1"
  },
  "build": {
    "env": {
      "PYTHONDONTWRITEBYTECODE": "1"
    }
  }
}
```

## 部署前检查清单

### 必需的环境变量
确保在Vercel中设置：
- `GOOGLE_API_KEY`: Google AI API密钥
- `SERPAPI_API_KEY`: SerpAPI密钥 (可选但推荐)

### 代码导入验证
所有代码文件使用统一的导入方式：
```python
from serpapi import GoogleSearch  # 正确 ✅
```

### 测试本地功能
运行测试文件验证导入：
```bash
cd migration/api
python test_serpapi.py
```

## 如果仍然遇到问题

### 清空 Vercel 构建缓存
1. 进入 Vercel 项目设置
2. 找到 "Build & Development Settings"
3. 删除构建缓存
4. 重新部署

### 或者在 Vercel CLI 中
```bash
vercel --force
```

## 当前包结构

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

## 功能验证

部署后测试以下端点：
- `/api/health` - 检查服务状态和环境变量
- `/api/chat` - 聊天机器人功能（流式响应）
- `/api/migration/search` - 移住搜索功能
- `/api/local_migration` - 本地化搜索

## 注意事项

1. **包版本管理**: 避免同时安装冲突的Python包
2. **缓存问题**: Python字节码文件可能导致Vercel构建失败
3. **环境变量**: 确保生产环境中设置了所有必需的API密钥
4. **导入一致性**: 所有文件使用相同的导入语句

## 监控建议

部署后监控：
- Vercel 构建日志
- API 响应时间
- 错误率和异常日志
- 环境变量配置状态 