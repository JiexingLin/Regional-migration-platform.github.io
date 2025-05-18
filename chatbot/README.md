### 実行するための準備

#### 1. 必要なライブラリをインストール

```
pip install streamlit beautifulsoup4 python-dotenv langchain_google_genai langchain 
```

#### 2. Gemini API Keyを発行

[https://aistudio.google.com/app/apikey?hl=ja](https://aistudio.google.com/app/apikey?hl=ja)

#### 3. Google API Keyの発行, Custom Search APIの有効化, Custom Search Engine（CSE）の取得

[https://qiita.com/zak_y/items/42ca0f1ea14f7046108c](https://qiita.com/zak_y/items/42ca0f1ea14f7046108c) を参照

#### 4. 環境変数の設定

chatbotディレクトリ内に.streamlit/secrets.tomlファイルを作成し、発行したGemini API Key, Google API Key, 検索エンジンIDを以下のように追記

```
GEMINI_API_KEY = 'あなたのGEMINI APIキー'
GOOGLE_API_KEY = 'あなたのGOOGLE APIキー'
CUSTOM_SEARCH_ENGINE_ID = 'あなたの検索エンジンID'
```

### 実行

```
streamlit run app.py
```

### 補足

geminiのモデルのサポートが終了し使えなくなっている場合があるので，その場合は，app.py内92行目でgeminiのmodel変更をお願いします．
