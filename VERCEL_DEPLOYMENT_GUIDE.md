# Vercel デプロイガイド - Next.js + Python API

## 📋 デプロイ前の準備

### 1. 環境変数設定
Vercel Dashboard で以下の環境変数を設定：

```bash
# Google AI API キー（必須）
GOOGLE_API_KEY=your_google_api_key_here

# SerpAPI キー（オプション、検索機能用）
SERPAPI_API_KEY=your_serpapi_key_here

# IPv4 強制接続（オプション、ネットワーク最適化）
FORCE_IPV4=true
```

### 2. プロジェクト構造確認
```
Regional-migration-platform/
├── api/                          # ✅ Python API（プロジェクトルート）
│   ├── index.py                  # メイン API エントリポイント
│   ├── chat_service.py           # チャットサービス
│   └── local_migration.py        # 移住サービス
├── migration/                    # ✅ Next.js アプリ
│   ├── src/
│   ├── package.json
│   └── next.config.js
├── requirements.txt              # ✅ Python 依存関係（ルート）
├── vercel.json                   # ✅ Vercel 設定
└── README.md
```

## 🚀 デプロイ手順

### 方法1：GitHub 自動デプロイ（推奨）

1. **GitHub にコードをプッシュ**
   ```bash
   git add .
   git commit -m "Setup Vercel deployment structure"
   git push origin main
   ```

2. **Vercel に接続**
   - [vercel.com](https://vercel.com) にアクセス
   - "New Project" をクリック
   - GitHub リポジトリを選択
   - プロジェクトが自動的に設定を検出してデプロイ

### 方法2：Vercel CLI デプロイ

1. **Vercel CLI インストール**
   ```bash
   npm install -g vercel
   ```

2. **ログインしてデプロイ**
   ```bash
   vercel login
   vercel
   ```

## 🔧 API エンドポイントテスト

デプロイ成功後、以下のエンドポイントをテスト可能：

### 1. ヘルスチェック
```bash
GET https://your-project.vercel.app/api/health
```

### 2. チャット機能
```bash
POST https://your-project.vercel.app/api/chat
Content-Type: application/json

{
  "message": "北海道への移住について教えて",
  "session_id": "test_session"
}
```

### 3. 移住相談
```bash
POST https://your-project.vercel.app/api/migration/search
Content-Type: application/json

{
  "user_profile": {
    "移住理由": "自然豊かな環境を求める",
    "希望地域": "北海道",
    "家族構成": "夫婦"
  }
}
```

## 📊 パフォーマンスと制限説明

### Vercel Serverless 制限：
- **実行時間**: 最大10秒（Hobby plan）
- **メモリ**: 1024MB
- **並行処理**: 1000リクエスト/秒
- **ファイルサイズ**: 50MB

### 最適化提案：
1. **コールドスタート最適化**: グローバル変数でサービスインスタンスをキャッシュ
2. **応答時間**: 長時間の AI 呼び出しを避ける
3. **エラーハンドリング**: 代替応答メカニズムを提供

## 🔍 デバッグとモニタリング

### 1. デプロイログ確認
```bash
vercel logs
```

### 2. ローカルデバッグ
```bash
# 依存関係インストール
pip install -r requirements.txt

# ローカルで Python 関数をテスト
python api/index.py
```

### 3. よくある問題の解決

**問題1: モジュールインポート失敗**
```python
# chat_service.py と local_migration.py が api ディレクトリにあることを確認
api/
├── index.py
├── chat_service.py
└── local_migration.py
```

**問題2: 非同期関数呼び出しエラー**
```python
# 同期コンテキストで非同期関数を呼び出し
loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)
result = loop.run_until_complete(async_function())
```

**問題3: CORS エラー**
```python
# handler に CORS ヘッダーを追加済み
self.send_header('Access-Control-Allow-Origin', '*')
```

## 🎯 本番環境推奨事項

### 1. 環境変数管理
- 開発環境：`.env.local` を使用
- 本番環境：Vercel Dashboard で設定

### 2. エラー監視
- Sentry またはその他のエラー追跡サービスを統合
- 詳細なログ記録を追加

### 3. API 制限
- リクエスト頻度制限を実装
- API キー認証を追加（必要に応じて）

### 4. キャッシュ戦略
- 一般的なクエリ結果をキャッシュ
- Vercel Edge Cache を使用

## 📞 技術サポート

デプロイで問題が発生した場合：
1. Vercel デプロイログを確認
2. 環境変数設定を検証
3. API エンドポイント応答を確認
4. ブラウザコンソールエラーを確認

## 🔗 関連ドキュメントリンク

- [Vercel Python Runtime ドキュメント](https://vercel.com/docs/functions/runtimes/python)
- [Next.js デプロイガイド](https://nextjs.org/docs/deployment)
- [Google AI API ドキュメント](https://ai.google.dev/docs) 