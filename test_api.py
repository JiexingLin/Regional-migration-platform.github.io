#!/usr/bin/env python3
"""
API テストスクリプト - Vercel デプロイ前の機能検証
"""
import requests
import json

# テストデータ
test_data = {
    "chat_message": {
        "message": "北海道への移住について教えて",
        "session_id": "test_session"
    },
    "migration_search": {
        "user_profile": {
            "移住理由": "自然豊かな環境を求める",
            "希望地域": "北海道",
            "家族構成": "夫婦",
            "仕事": "リモートワーク可能"
        }
    }
}

def test_local_api():
    """ローカル API をテスト（migration/api/main.py が実行中の場合）"""
    base_url = "http://localhost:8000"
    
    print("🧪 ローカル API をテスト中...")
    
    # ヘルスチェックをテスト
    try:
        response = requests.get(f"{base_url}/health")
        print(f"✅ ヘルスチェック: {response.status_code}")
        if response.status_code == 200:
            print(f"   レスポンス: {response.json()}")
    except Exception as e:
        print(f"❌ ヘルスチェック失敗: {e}")
    
    # チャット機能をテスト
    try:
        response = requests.post(
            f"{base_url}/api/chat", 
            json=test_data["chat_message"]
        )
        print(f"✅ チャット API: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"   レスポンス: {result.get('response', 'レスポンスなし')[:100]}...")
    except Exception as e:
        print(f"❌ チャット API 失敗: {e}")
    
    # 移住検索をテスト
    try:
        response = requests.post(
            f"{base_url}/api/migration/search", 
            json=test_data["migration_search"]
        )
        print(f"✅ 移住検索: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"   ステータス: {result.get('status', '不明')}")
    except Exception as e:
        print(f"❌ 移住検索失敗: {e}")

def test_vercel_api(vercel_url):
    """Vercel デプロイの API をテスト"""
    print(f"🚀 Vercel API をテスト中: {vercel_url}...")
    
    # ヘルスチェックをテスト
    try:
        response = requests.get(f"{vercel_url}/api/health")
        print(f"✅ ヘルスチェック: {response.status_code}")
        if response.status_code == 200:
            print(f"   レスポンス: {response.json()}")
    except Exception as e:
        print(f"❌ ヘルスチェック失敗: {e}")
    
    # チャット機能をテスト
    try:
        response = requests.post(
            f"{vercel_url}/api/chat", 
            json=test_data["chat_message"],
            headers={"Content-Type": "application/json"}
        )
        print(f"✅ チャット API: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"   レスポンス: {result.get('response', 'レスポンスなし')[:100]}...")
    except Exception as e:
        print(f"❌ チャット API 失敗: {e}")

def test_imports():
    """モジュールインポートをテスト"""
    print("📦 モジュールインポートをテスト中...")
    
    try:
        import sys
        sys.path.append('api')
        
        from chat_service import ChatBotService
        print("✅ ChatBotService が正常にインポートされました")
        
        from local_migration import JapaneseMigrationAgent
        print("✅ JapaneseMigrationAgent が正常にインポートされました")
        
        # インスタンス化をテスト
        chat_service = ChatBotService()
        print("✅ ChatBotService が正常にインスタンス化されました")
        
        migration_agent = JapaneseMigrationAgent()
        print("✅ JapaneseMigrationAgent が正常にインスタンス化されました")
        
    except Exception as e:
        print(f"❌ インポートテスト失敗: {e}")

if __name__ == "__main__":
    print("🔧 API 機能テスト")
    print("=" * 50)
    
    # モジュールインポートをテスト
    test_imports()
    print()
    
    # ローカル API をテスト（実行中の場合）
    test_local_api()
    print()
    
    # Vercel URL があればテスト
    vercel_url = input("Vercel URL を入力してください（スキップする場合は Enter）: ").strip()
    if vercel_url:
        test_vercel_api(vercel_url)
    
    print("\n✨ テスト完了！") 