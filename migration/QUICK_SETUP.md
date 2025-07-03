# 🚀 Quick Setup Guide - 快速设置指南

## ❌ 当前问题
聊天机器人显示"Google APIキーが設定されていません"是因为缺少必要的环境变量配置。

## ✅ 解决步骤（5分钟完成）

### 1️⃣ 获取Google AI API密钥
- 访问: https://makersuite.google.com/app/apikey
- 点击 **"Create API Key"**
- 复制生成的密钥 (格式类似: `AIzaSyA...`)

### 2️⃣ 在Vercel中设置环境变量
1. 打开 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目
3. 点击 **Settings** 标签页
4. 左侧菜单选择 **Environment Variables**
5. 点击 **Add New** 添加:
   - **Name**: `GOOGLE_API_KEY`
   - **Value**: 粘贴您的API密钥
   - **Environment**: 全选 (Production, Preview, Development)

### 3️⃣ 重新部署
1. 回到项目主页面
2. 点击 **Deployments** 标签页
3. 找到最新部署，点击右侧三个点
4. 选择 **Redeploy**
5. 等待部署完成 (约1-2分钟)

### 4️⃣ 验证设置
部署完成后:
- 访问您的网站 `/api/health`
- 查看是否显示 `"has_google_api_key": true`
- 测试聊天机器人功能

## 🔍 故障排除

### 聊天机器人仍然不工作?
1. **检查API密钥**:
   - 确保在Google AI Studio中API密钥状态为"Active"
   - 确保没有IP限制

2. **检查环境变量**:
   - 在Vercel中确认变量名拼写正确: `GOOGLE_API_KEY`
   - 确认值中没有多余的空格

3. **强制重新部署**:
   - 可以尝试推送一个小的代码更改来触发新部署

### 还是有问题?
- 访问 `/api/health` 查看详细配置状态
- 检查Vercel项目的 **Functions** 标签页查看错误日志
- 确认项目的Root Directory设置为 `migration`

## ⚡ 预期结果
设置完成后，聊天机器人应该能够:
- ✅ 回复用户关于日本地方移住的问题
- ✅ 提供具体的移住信息和支援制度
- ✅ 包含官方网站链接

---

## 📋 环境变量完整列表

| 变量名 | 必需性 | 说明 |
|-------|--------|------|
| `GOOGLE_API_KEY` | **必需** | Google AI API密钥 |
| `SERPAPI_API_KEY` | **必需** | SerpAPI密钥（搜索功能必需） |
| `USE_PYTHON_BACKEND` | 推荐 | 设置为 `true` |

### 🔗 获取API密钥
1. **Google AI API**: [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **SerpAPI**: [SerpAPI注册](https://serpapi.com/users/sign_up) - 提供免费额度

**重要**: `GOOGLE_API_KEY` 和 `SERPAPI_API_KEY` 都是必需的，缺少任何一个都会导致功能异常。

## 🔧 故障诊断

### 🔍 依赖诊断（推荐首先运行）
```bash
cd migration/api
python test_imports.py  # 全面测试包导入和服务初始化
```

### 🏥 健康检查
访问以下URL查看详细状态：
- `https://你的域名.vercel.app/api/health` - 完整健康检查与依赖状态
- `https://你的域名.vercel.app/api/chat/status` - 聊天服务状态

### 📊 常见问题
1. **ChatBot显示"インポートエラー"**: 
   - 检查Vercel构建日志
   - 运行 `python test_imports.py` 诊断
   - 确认 `api/requirements.txt` 中没有冲突的包

2. **环境变量问题**:
   - 确认在Vercel中设置了 `GOOGLE_API_KEY`
   - 检查 `/api/health` 端点的配置状态 