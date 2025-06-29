#!/usr/bin/env python3
"""
Migration Platform API 启动脚本
"""
import os
import sys
from pathlib import Path

def check_requirements():
    """检查Python环境和依赖"""
    try:
        import fastapi
        import uvicorn
        import langchain
        from langchain_google_genai import ChatGoogleGenerativeAI
        import google.generativeai
        print("✅ 所有依赖包已安装")
        return True
    except ImportError as e:
        print(f"❌ 缺少依赖包: {e}")
        print("请运行: pip install -r requirements.txt")
        return False

def check_env_vars():
    """检查环境变量"""
    env_file = Path(".env")
    
    if not env_file.exists():
        print("⚠️  没有找到.env文件")
        print("请创建.env文件并设置GOOGLE_API_KEY")
        print("示例内容:")
        print("GOOGLE_API_KEY=your_google_api_key_here")
        return False
    
    # 加载.env文件
    try:
        from dotenv import load_dotenv
        load_dotenv()
        
        if not os.getenv('GOOGLE_API_KEY'):
            print("❌ GOOGLE_API_KEY环境变量未设置")
            return False
        
        print("✅ 环境变量配置正确")
        return True
    except ImportError:
        print("❌ python-dotenv未安装")
        return False

def test_model_availability():
    """测试AI模型可用性"""
    try:
        from langchain_google_genai import ChatGoogleGenerativeAI
        api_key = os.getenv('GOOGLE_API_KEY')
        
        if not api_key:
            print("⚠️ 跳过模型测试：GOOGLE_API_KEY未设置")
            return True
            
        print("🧪 测试AI模型连接...")
        
        # 尝试初始化模型
        model = ChatGoogleGenerativeAI(
            google_api_key=api_key,
            model="gemini-1.5-flash",
            temperature=0.7,
            max_tokens=50,
            streaming=False
        )
        
        print("✅ AI模型连接成功 (gemini-1.5-flash)")
        return True
        
    except Exception as e:
        print(f"⚠️ AI模型测试失败: {e}")
        print("💡 提示: 服务器仍可启动，但AI功能可能不可用")
        print("🔧 解决方案:")
        print("   1. 检查GOOGLE_API_KEY是否正确")
        print("   2. 确认网络连接")
        print("   3. 查看 api/MODELS_INFO.md 了解模型信息")
        return True  # 允许服务器启动，即使AI测试失败

def start_server():
    """启动服务器"""
    print("🚀 启动Migration Platform API服务器...")
    print("📍 服务器地址: http://127.0.0.1:8000")
    print("📖 API文档: http://127.0.0.1:8000/docs")
    print("💬 聊天API: http://127.0.0.1:8000/api/chat")
    print("🏥 健康检查: http://127.0.0.1:8000/health")
    print("\n按 Ctrl+C 停止服务器\n")
    
    import uvicorn
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        log_level="info"
    )

def main():
    """主函数"""
    print("=== Migration Platform API 启动器 ===\n")
    
    # 检查依赖
    if not check_requirements():
        sys.exit(1)
    
    # 检查环境变量
    if not check_env_vars():
        sys.exit(1)
    
    # 测试AI模型
    test_model_availability()
    
    print()  # 空行分隔
    
    # 启动服务器
    try:
        start_server()
    except KeyboardInterrupt:
        print("\n👋 服务器已停止")
    except Exception as e:
        print(f"❌ 启动失败: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 