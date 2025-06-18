# backend/chat_api.py
import os
import traceback
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from dotenv import load_dotenv

# ─── 環境変数のロード ─────────────────────────────────────
load_dotenv()  # .env ファイルから環境変数を読み込む

# ─── Flask アプリ初期化 & CORS 設定 ──────────────────────
app = Flask(__name__)
CORS(app)  # /api/* への呼び出しをすべて許可

@app.after_request
def add_cors(response):
    """すべてのレスポンスに CORS ヘッダーを付与"""
    response.headers["Access-Control-Allow-Origin"]  = "*"
    response.headers["Access-Control-Allow-Methods"] = "OPTIONS,POST"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response

@app.errorhandler(Exception)
def handle_all_exceptions(e):
    """例外が起きても JSON + CORS ヘッダー付きで返す"""
    traceback.print_exc()
    resp = make_response(jsonify({"error": str(e)}), 500)
    resp.headers["Access-Control-Allow-Origin"]  = "*"
    resp.headers["Access-Control-Allow-Methods"] = "OPTIONS,POST"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return resp

# ─── 既存ロジックのインポート ─────────────────────────────
from chatbot.app import search_google, generate_query_with_ai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.memory import ConversationSummaryMemory
from langchain.schema import HumanMessage, AIMessage

# ─── API キー等の読み込み ─────────────────────────────────
GOOGLE_API_KEY          = os.getenv("GOOGLE_API_KEY")
CUSTOM_SEARCH_ENGINE_ID = os.getenv("CUSTOM_SEARCH_ENGINE_ID")
GEMINI_API_KEY          = os.getenv("GEMINI_API_KEY")

# ─── LLM と会話メモリの初期化 ─────────────────────────────
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    api_key=GEMINI_API_KEY,
)
memory = ConversationSummaryMemory(llm=llm, return_messages=True)

# ─── チャット API ルート ─────────────────────────────────
@app.route("/api/chat", methods=["OPTIONS", "POST"])
def chat():
    # プリフライト(OPTIONS)は空 200 で返す
    if request.method == "OPTIONS":
        return "", 200

    # POST ボディ(JSON) 取得
    data = request.get_json() or {}
    city   = data.get("city_name", "")
    prompt = data.get("prompt", "")

    # 質問をメモリに追加
    memory.chat_memory.add_message(HumanMessage(content=prompt))

    # 検索クエリを AI で作成
    query_base = f"{city} に関連する: {prompt}" if city else prompt
    queries = generate_query_with_ai(query_base, llm, memory)

    # Google Custom Search 実行
    results = [
        search_google(q, GOOGLE_API_KEY, CUSTOM_SEARCH_ENGINE_ID)
        for q in queries
    ]
    combined = "\n\n".join(results)

    # LLM への最終プロンプト文字列

   # いったん文字列１本でまとめて渡す
    final_prompt = (
        "あなたは地方移住アドバイザーです。検索結果を参考にわかりやすく返答してください。\n\n"
        f"{combined}\n\n質問: {prompt}"
    )
    ai_resp = llm.invoke(final_prompt)

    answer  = ai_resp.content if hasattr(ai_resp, "content") else str(ai_resp)

    # AI の回答をメモリに追加
    memory.chat_memory.add_message(AIMessage(content=answer))

    # JSON で返却
    return jsonify({"answer": answer})

# ─── 開発用サーバ起動 ───────────────────────────────────
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
