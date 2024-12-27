### 実行するための準備

#### 1. 必要なライブラリをインストール

```
pip install streamlit requests beautifulsoup4 python-dotenv langchain_google_genai langchain
```

#### 2. Google API Key を発行

#### 3. 環境変数の設定

.envファイルを作成し、発行したGoogle API Keyを以下のように追記

```
GOOGLE_API_KEY = "あなたのGoogleAPIキー"
```

### 実行

```
streamlit run app.py
```
