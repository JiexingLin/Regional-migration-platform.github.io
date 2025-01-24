import requests
import streamlit as st
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.memory import ConversationSummaryMemory
from langchain.schema import AIMessage, HumanMessage

# Google Custom Search APIを利用して検索結果を取得する関数
def search_google(query: str, api_key: str, cx: str, max_results: int = 5) -> str:
    """
    Google Custom Search JSON API を利用して検索結果を取得する関数。
    """
    try:
        search_url = (
            f"https://www.googleapis.com/customsearch/v1?q={query}"
            f"&key={api_key}&cx={cx}&hl=ja"
        )
        response = requests.get(search_url, timeout=10)

        if response.status_code != 200:
            return "Google Custom Search APIのリクエスト中にエラーが発生しました。"

        results_json = response.json()

        # 結果の格納リスト
        results = []

        for item in results_json.get("items", [])[:max_results]:
            title = item.get("title", "")
            link = item.get("link", "")
            snippet = item.get("snippet", "")
            results.append(f"{title} ({link}) {snippet}")

        if not results:
            return "検索結果が見つかりませんでした。"

        return "\n\n".join(results)

    except requests.exceptions.RequestException as e:
        return f"ネットワークエラーが発生しました: {e}"
    except Exception as e:
        return f"予期しないエラーが発生しました: {e}"

# 検索クエリを生成する関数
def generate_query_with_ai(prompt: str, llm: ChatGoogleGenerativeAI, memory: ConversationSummaryMemory) -> str:
    try:
        #これまでの会話履歴をまとめる
        past_user_messages = [
            m.content for m in memory.chat_memory.messages if isinstance(m, HumanMessage)
        ]
        past_prompts = "\n".join(past_user_messages)

        #会話履歴を参考にして検索クエリを生成するプロンプト
        query_prompt = (
            "あなたは地方移住アドバイザーです。以下はユーザーの過去の質問履歴です:\n"
            f"{past_prompts}\n\n"
            f"今回の質問: {prompt}\n"
            "この文脈を踏まえ、地方移住に関する適切な検索クエリを生成してください。"
        )

        query_response = llm.invoke(query_prompt)
        if query_response and hasattr(query_response, "content"):
            return query_response.content.strip()
        else:
            return prompt

    except Exception:
        # 失敗した場合は元のプロンプトをそのまま返す
        return prompt

# 次の質問をセットする関数
def set_next_question(suggestion):
    """
    提案した質問のボタンが押されたとき、その質問を次の質問としてセットする
    """
    st.session_state["next_question"] = suggestion

# Streamlit アプリ本体
def main():
    st.title("地方移住サポート ChatBot")

    # 環境変数の読み込み
    GOOGLE_API_KEY = st.secrets["GOOGLE_API_KEY"]
    CUSTOM_SEARCH_ENGINE_ID = st.secrets["CUSTOM_SEARCH_ENGINE_ID"]
    GEMINI_API_KEY = st.secrets["GEMINI_API_KEY"]

    #APIが.envに設定されているのかを確認
    if not GOOGLE_API_KEY or not CUSTOM_SEARCH_ENGINE_ID:
        st.warning("Google Custom Search APIキーまたはCXが設定されていません。")
        st.stop()

    # LLM の初期化
    llm = ChatGoogleGenerativeAI(
        model="gemini-pro",
        api_key=GEMINI_API_KEY,
        system_message=(
            "あなたは地方移住に関心がある人々に助言を提供する専門家です。"
            "地方移住に関連するあらゆる質問に答える役割を担っています。"
            "質問には詳細で正確な情報を提供し、場合によっては役立つリンクも提示してください。"
        )
    )

    # 会話履歴の初期化
    if "memory" not in st.session_state:
        st.session_state["memory"] = ConversationSummaryMemory(
            llm=llm,
            return_messages=True
        )
    memory = st.session_state["memory"]

    # 「次の質問ボタン」で選択した質問を保持する変数を用意
    if "next_question" not in st.session_state:
        st.session_state["next_question"] = ""

    # city_nameを初期化
    if "city_name" not in st.session_state:
        st.session_state["city_name"] = ""

    # 市区町村名を入力
    st.subheader("興味のある市町村の設定")
    st.text_input(
        "興味のある市町村名を入力してください: (例: 京都府舞鶴市)",
        key="city_name"
    )

    # 常に現在の市区町村の表示
    if st.session_state["city_name"]:
        st.info(f"現在興味を持っている市区町村: **{st.session_state['city_name']}**")
    else:
        st.info("現在興味を持っている市区町村はまだ設定されていません。")

    # 既存の会話履歴を画面表示
    for msg in memory.chat_memory.messages:
        if isinstance(msg, HumanMessage):
            with st.chat_message("user"):
                st.markdown(msg.content)
        elif isinstance(msg, AIMessage):
            with st.chat_message("assistant"):
                st.markdown(msg.content)

    # 質問をセットする
    prompt = st.chat_input("質問を入力してください")

    # 質問に対して回答する
    if prompt or st.session_state["next_question"]:
        if st.session_state["next_question"]:
            prompt = st.session_state["next_question"]
            st.session_state["next_question"] = ""
            
        # メモリにユーザーの質問を追加
        memory.chat_memory.add_message(HumanMessage(content=prompt))

        with st.chat_message("user"):
            st.markdown(prompt)

        # AIで検索用クエリを生成
        city_name = st.session_state["city_name"]
        prompt_with_city = f"{city_name} に関連する: {prompt}" if city_name else prompt
        search_query = generate_query_with_ai(prompt_with_city, llm, memory)

        # 検索を実行
        search_results = search_google(search_query, GOOGLE_API_KEY, CUSTOM_SEARCH_ENGINE_ID)

        # 最終的な回答を得るためのプロンプト
        final_prompt = (
            "あなたは地方移住の専門アドバイザーです。\n"
            f"以下の検索結果を参考に、移住希望者の質問に答えてください:\n{search_results}\n\n"
            f"質問: {prompt}\n"
            "詳細な回答と参考URLをわかりやすく提示してください。"
        )

        # 回答生成
        with st.chat_message("assistant"):
            try:
                response_placeholder = st.empty()
                full_response = ""

                for token in llm.stream(final_prompt):
                    full_response += token.content
                    response_placeholder.markdown(full_response)

                # メモリにAIの回答を追加
                memory.chat_memory.add_message(AIMessage(content=full_response))

            except Exception as e:
                st.error(f"エラー: {e}")

        # 次にする質問の提案
        try:
            #これまでの会話内容をまとめる
            conversation_history = []
            for msg in memory.chat_memory.messages:
                if isinstance(msg, HumanMessage):
                    conversation_history.append(f"ユーザー: {msg.content}")
                elif isinstance(msg, AIMessage):
                    conversation_history.append(f"アシスタント: {msg.content}")

            history_text = "\n".join(conversation_history)

            # ユーザーが気になりそうな質問を提案
            suggestion_prompt = (
                "以下はこれまでの会話です:\n"
                f"{history_text}\n\n"
                "上記を踏まえ、次の要件を満たす質問を3つ提案してください。\n"
                "1. これまでの会話に関係し、ユーザーが興味を持ちそうな質問を3つ\n"
                "2. いずれの質問も、Web検索で情報を集めるのが困難でない\n\n"
                "提案する形式は以下のようにしてください:\n"
                "1. 1つ目の質問\n"
                "2. 2つ目の質問\n"
                "3. 3つ目の質問\n"
            )

            suggestion_response = llm.invoke(suggestion_prompt)

            # 次の質問を提案し、ボタンで選択して次の質問にセットできる
            if suggestion_response and hasattr(suggestion_response, "content"):
                suggestion_text = suggestion_response.content.strip()
                suggestions = [
                    line.strip()
                    for line in suggestion_text.split("\n")
                    if line.strip()
                ]

                # 提案を画面に表示
                st.markdown("### 質問の提案：\n")
                for _, suggestion in enumerate(suggestions, start=1):
                    if st.button(f"▶ {suggestion}", on_click=set_next_question, args=[suggestion]):
                        pass

                # メモリに提案を追加しておく
                memory.chat_memory.add_message(
                    AIMessage(content=f"質問の提案:\n{suggestion_text}")
                )

        except Exception as e:
            st.error(f"次の質問提案の生成でエラーが発生しました: {e}")

if __name__ == "__main__":
    main()
