import streamlit as st
from local_migration import JapaneseMigrationAgent
import json

def create_migration_consultation():
    st.title("日本地方移住コンサルテーション")
    if 'result' not in st.session_state:
        st.session_state.result = None
    
    # フォームの作成
    with st.form("migration_form"):
        # 性別選択
        gender = st.selectbox(
            "性別",
            ["女性", "男性", "その他"]
        )
        
        # 婚姻状況
        marital_status = st.text_input(
            "婚姻状況（例：既婚、子供2人）",
            placeholder="既婚、双子持ち"
        )
        
        # 職業
        occupation = st.text_input(
            "職業",
            placeholder="ソフトウェアエンジニア"
        )
        
        # 優先地域（複数選択可能）
        preferred_regions = st.multiselect(
            "優先地域（複数選択可）",
            ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
             "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
             "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
             "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
             "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
             "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
             "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"],
            default=["広島県", "福岡県"]
        )
        
        # 具体的な要件（動的に追加可能）
        st.subheader("具体的な要件（重要度順）")
        requirements = []
        for i in range(5):  # 最大5つまで
            req = st.text_input(
                f"要件 {i+1}",
                key=f"req_{i}",
                placeholder="例：技術系職種の機会"
            )
            if req:
                requirements.append(req)
        
        # 送信ボタン
        submitted = st.form_submit_button("コンサルテーション開始")
        
        if submitted:
            # ユーザープロフィールの作成
            user_profile = {
                "性別": gender,
                "婚姻状況": marital_status,
                "職業": occupation,
                "優先地域": preferred_regions,
                "具体的な要件（重要度順）": requirements
            }
            
            try:
                # Agentの作成と実行
                with st.spinner('コンサルテーション中です。しばらくお待ちください...'):
                    # Agentの作成と実行
                    migration_agent = JapaneseMigrationAgent()
                    st.session_state.result = migration_agent.process_migration_consultation(user_profile)
                
                # 結果の表示
                st.success("コンサルテーションが完了しました！")
                
            except Exception as e:
                st.error(f"エラーが発生しました: {e}")
    
    # 結果の各セクションを表示
    if st.session_state.result and "consultation_result" in st.session_state.result:
        consultation = st.session_state.result["consultation_result"]
                        
        st.header("サブ質問")
        st.write(consultation["sub_questions"])
                        
        st.header("推奨地域")
        st.write(consultation["recommended_locations"])
                        
        st.header("生活プラン")
        st.write(consultation["life_plan"])
                        
        # JSONファイルのダウンロードボタン
        st.download_button(
            label="結果をJSONファイルとしてダウンロード",
            data=json.dumps(st.session_state.result, ensure_ascii=False, indent=2),
            file_name=f"migration_consultation_{st.session_state.result['timestamp']}.json",
            mime="application/json"
            )

if __name__ == "__main__":
    create_migration_consultation() 