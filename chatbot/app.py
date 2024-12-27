import os
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
import streamlit as st

# 環境変数の読み込み
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")


# モデルの初期化
llm = ChatGoogleGenerativeAI(
    model="gemini-pro", 
    api_key = GOOGLE_API_KEY,
    system_message=(
    "あなたは地方移住に関心がある人々に助言を提供する専門家です。"
    "地方移住に関連するあらゆる質問に答える役割を担っています。"
    "質問には詳細で正確な情報を提供し、場合によっては役立つリンクも提示してください。"
))


# Google 検索結果を取得する関数
def search_google(query):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        search_url = f"https://www.google.com/search?q={query}&hl=ja"
        response = requests.get(search_url, headers=headers, timeout=10)

        if response.status_code != 200:
            return "Google 検索中にエラーが発生しました。"

        soup = BeautifulSoup(response.text, "html.parser")
        results = []

        # 検索結果のタイトル、スニペット、リンクを取得
        for result in soup.select('div.tF2Cxc'):
            title = result.select_one('h3').get_text(strip=True) if result.select_one('h3') else ''
            snippet = result.select_one('.VwiC3b').get_text(strip=True) if result.select_one('.VwiC3b') else ''
            link = result.select_one('a')['href'] if result.select_one('a') else ''

            if title or snippet or link:
                results.append(f"{title} ({link}) {snippet}")

        if not results:
            return "検索結果が見つかりませんでした。"

        # 上位7件を結合して返す
        return "\n\n".join(results[:7])
    except requests.exceptions.RequestException as e:
        return f"ネットワークエラーが発生しました: {e}"
    except Exception as e:
        return f"予期しないエラーが発生しました: {e}"

# 検索クエリを生成する
def generate_query_with_ai(prompt):
    """
    過去の質問内容を基に検索クエリを生成
    """
    try:
        # 過去の質問を取得
        past_prompts = "\n".join([msg["content"] for msg in st.session_state.messages if msg["role"] == "user"])

        #検索クエリを生成するためのプロンプト
        query_prompt = (
            f"あなたは地方移住アドバイザーです。以下はユーザーの過去の質問履歴です:\n{past_prompts}\n\n"
            f"今回の質問: {prompt}\n"
            "この文脈を踏まえ、地方移住に関する適切な検索クエリを生成してください。"
        )

        query_response = llm.invoke(query_prompt)
        if query_response and hasattr(query_response, "content"):
            return query_response.content.strip()
        else:
            return prompt  # 応答がない場合はそのまま入力文を返す
    except Exception as e:
        return prompt  # エラー時も入力文をそのまま返す

# Streamlit アプリケーション
st.title("地方移住サポート ChatBot")


# チャット履歴の初期化
if "messages" not in st.session_state:
    st.session_state.messages = []

# チャット履歴の表示
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# 入力の受け取り
prompt = st.chat_input("質問を入力してください")

if prompt:
    # ユーザー入力をチャット履歴に追加
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # Google 検索用クエリを生成（AI利用）
    search_query = generate_query_with_ai(prompt)

    # Google 検索を実行
    search_results = search_google(search_query)


    # モデルに渡すプロンプトを構築
    augmented_prompt = (
    f"あなたは地方移住の専門アドバイザーです。\n"
    f"以下の検索結果を参考に、移住希望者の質問に答えてください:\n{search_results}\n"
    f"質問: {prompt}\n"
    "詳細な回答と参考URLも分かりやすく提示してください。"
    )


    # 検索結果を基に回答を生成
    with st.chat_message("assistant"):
        try:
            response_placeholder = st.empty()
            full_response = ""

            for token in llm.stream(augmented_prompt):
                full_response += token.content
                response_placeholder.markdown(full_response, unsafe_allow_html=True)

            st.session_state.messages.append({"role": "assistant", "content": full_response})
        except Exception as e:
            st.error(f"エラー: {e}")