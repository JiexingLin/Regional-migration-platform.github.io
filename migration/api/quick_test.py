#!/usr/bin/env python3
"""
快速测试所有API模块的导入和基本功能
"""

def test_imports():
    """测试所有必要的导入"""
    print("🧪 开始导入测试...")
    
    try:
        import os
        import json
        import asyncio
        import requests
        print("✅ 基础模块导入成功")
    except ImportError as e:
        print(f"❌ 基础模块导入失败: {e}")
        return False
    
    try:
        import google.generativeai as genai
        print("✅ Google AI 模块导入成功")
    except ImportError as e:
        print(f"❌ Google AI 模块导入失败: {e}")
        return False
        
    try:
        from serpapi import GoogleSearch
        print("✅ SerpAPI 模块导入成功")
    except ImportError as e:
        print(f"❌ SerpAPI 模块导入失败: {e}")
        return False
        
    return True

def test_services():
    """测试服务初始化"""
    print("\n🔧 开始服务测试...")
    
    try:
        # 测试chat_service
        from lib.chat_service import ChatBotService
        print("✅ ChatBotService 导入成功")
        
        # 只有在有API密钥时才测试初始化
        if os.getenv('GOOGLE_API_KEY'):
            service = ChatBotService()
            status = service.get_service_status()
            print(f"✅ ChatBotService 状态: {status.get('status', 'unknown')}")
        else:
            print("⚠️ GOOGLE_API_KEY 未设置，跳过服务初始化测试")
            
    except Exception as e:
        print(f"❌ ChatBotService 测试失败: {e}")
        return False
        
    try:
        # 测试local_migration
        from local_migration import JapaneseMigrationAgent
        print("✅ JapaneseMigrationAgent 导入成功")
        
        if os.getenv('GOOGLE_API_KEY'):
            agent = JapaneseMigrationAgent()
            print("✅ JapaneseMigrationAgent 初始化成功")
        else:
            print("⚠️ GOOGLE_API_KEY 未设置，跳过Agent初始化测试")
            
    except Exception as e:
        print(f"❌ JapaneseMigrationAgent 测试失败: {e}")
        return False
        
    return True

def main():
    """主测试函数"""
    print("🚀 API模块快速测试")
    print("=" * 40)
    
    import_success = test_imports()
    service_success = test_services()
    
    print("\n" + "=" * 40)
    if import_success and service_success:
        print("🎉 所有测试通过！API应该可以正常部署。")
        return 0
    else:
        print("❌ 测试失败！请检查错误信息。")
        return 1

if __name__ == "__main__":
    exit(main()) 