#!/usr/bin/env python3
"""
快速诊断脚本 - 测试所有必要的包导入
用法: python test_imports.py
"""

import sys
import traceback

def test_imports():
    """测试所有必要的包导入"""
    print("🔍 开始测试包导入...")
    print("=" * 50)
    
    # 测试包列表
    test_packages = [
        ("google.generativeai", "import google.generativeai as genai"),
        ("serpapi.GoogleSearch", "from serpapi import GoogleSearch"),
        ("requests", "import requests"),
        ("json", "import json"),
        ("asyncio", "import asyncio"),
        ("os", "import os"),
        ("re", "import re"),
        ("logging", "import logging"),
        ("datetime", "from datetime import datetime"),
    ]
    
    success_count = 0
    total_count = len(test_packages)
    
    for package_name, import_statement in test_packages:
        try:
            exec(import_statement)
            print(f"✅ {package_name}: 成功导入")
            success_count += 1
        except ImportError as e:
            print(f"❌ {package_name}: 导入失败 - {e}")
        except Exception as e:
            print(f"⚠️ {package_name}: 其他错误 - {e}")
    
    print("=" * 50)
    print(f"📊 结果统计: {success_count}/{total_count} 包导入成功")
    
    if success_count == total_count:
        print("🎉 所有包导入成功！")
        return True
    else:
        print("⚠️ 有包导入失败，请检查installation")
        return False

def test_specific_imports():
    """测试具体的聊天机器人服务导入"""
    print("\n🤖 测试聊天机器人服务...")
    print("=" * 50)
    
    try:
        from chat_service import ChatBotService
        print("✅ ChatBotService: 导入成功")
        
        # 测试初始化
        service = ChatBotService()
        print("✅ ChatBotService: 初始化成功")
        
        # 测试状态
        status = service.get_service_status()
        print(f"✅ 服务状态: {status}")
        
        return True
        
    except ImportError as e:
        print(f"❌ ChatBotService导入失败: {e}")
        print("📋 完整错误信息:")
        traceback.print_exc()
        return False
    except Exception as e:
        print(f"❌ ChatBotService初始化失败: {e}")
        print("📋 完整错误信息:")
        traceback.print_exc()
        return False

def main():
    """主函数"""
    print("🚀 包导入诊断工具")
    print(f"🐍 Python版本: {sys.version}")
    print(f"📁 当前工作目录: {sys.path[0]}")
    print()
    
    # 测试基础包导入
    basic_success = test_imports()
    
    # 测试特定服务导入
    service_success = test_specific_imports()
    
    print("\n" + "=" * 50)
    if basic_success and service_success:
        print("🎉 所有测试通过！服务应该可以正常工作。")
        sys.exit(0)
    else:
        print("❌ 测试失败！请检查上述错误信息。")
        sys.exit(1)

if __name__ == "__main__":
    main() 