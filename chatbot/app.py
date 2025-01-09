import os
import requests
import streamlit as st
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.memory import ConversationSummaryMemory
from langchain.schema import AIMessage, HumanMessage


# Google 検索結果を取得する関数
def search_google(query: str):
    """Google検索を行い、上位結果をまとめて返す関数。"""
    try:
        headers = {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/91.0.4472.124 Safari/537.36"
            )
        }
        search_url = f"https://www.google.com/search?q={query}&hl=ja"
        response = requests.get(search_url, headers=headers, timeout=10)

        if response.status_code != 200:
            return "Google検索中にエラーが発生しました。"

        soup = BeautifulSoup(response.text, "html.parser")
        results = []

        for result in soup.select('div.tF2Cxc'):
            title_elem = result.select_one('h3')
            snippet_elem = result.select_one('.VwiC3b')
            link_elem = result.select_one('a')

            title = title_elem.get_text(strip=True) if title_elem else ''
            snippet = snippet_elem.get_text(strip=True) if snippet_elem else ''
            link = link_elem['href'] if link_elem else ''

            if title or snippet or link:
                results.append(f"{title} ({link}) {snippet}")

        if not results:
            return "検索結果が見つかりませんでした。"

        # 上位6件をまとめて返却
        return "\n\n".join(results[:6])

    except requests.exceptions.RequestException as e:
        return f"ネットワークエラーが発生しました: {e}"
    except Exception as e:
        return f"予期しないエラーが発生しました: {e}"

# 検索クエリを生成する関数
def generate_query_with_ai(prompt: str, llm: ChatGoogleGenerativeAI, memory: ConversationSummaryMemory) -> str:
    try:
        past_user_messages = [
            m.content for m in memory.chat_memory.messages if isinstance(m, HumanMessage)
        ]

        past_prompts = "\n".join(past_user_messages)

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
    """提案した質問のボタンが押されたとき、その質問を次の質問としてセットする"""
    st.session_state["next_question"] = suggestion


# Streamlit アプリ本体
def main():
    st.title("地方移住サポート ChatBot")

    # 環境変数の読み込み
    load_dotenv()
    google_api_key = os.getenv("GOOGLE_API_KEY")

    # LLMの初期化
    llm = ChatGoogleGenerativeAI(
        model="gemini-pro",
        api_key=google_api_key,
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

    # もし city_name が未設定なら初期化
    if "city_name" not in st.session_state:
        st.session_state["city_name"] = ""

    # 市区町村名を入力
    st.subheader("興味のある市町村の設定")
    st.text_input(
        "興味のある市町村名を入力してください:",
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
    if st.session_state["next_question"]:
        prompt = st.session_state["next_question"]
        st.session_state["next_question"] = ""
    else:
        prompt = st.chat_input("質問を入力してください")

    # 質問に対して回答する
    if prompt:
        # メモリにユーザーの質問を追加
        memory.chat_memory.add_message(HumanMessage(content=prompt))

        with st.chat_message("user"):
            st.markdown(prompt)

        # AIで検索用クエリを生成
        city_name = st.session_state["city_name"]
        prompt_with_city = f"{city_name} に関連する: {prompt}" if city_name else prompt
        search_query = generate_query_with_ai(prompt_with_city, llm, memory)

        # 検索を実行
        search_results = search_google(search_query)

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
                "1. ユーザーが興味を持ちそうな質問を3つ\n"
                "2. いずれの質問も、新たにWeb検索をしなくても答えられる内容にする\n\n"
                "回答は質問だけを箇条書きで提案したものをください"
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
                        st.experimental_rerun()

                # メモリに提案を追加しておく
                memory.chat_memory.add_message(
                    AIMessage(content=f"質問の提案:\n{suggestion_text}")
                )
            else:
                st.info("次に続きそうな質問の提案が得られませんでした。")

        except Exception as e:
            st.error(f"次の質問提案の生成でエラーが発生しました: {e}")

if __name__ == "__main__":
    main()
