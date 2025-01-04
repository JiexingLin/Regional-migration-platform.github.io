import streamlit as st
from local_migration import JapaneseMigrationAgent
import json
import asyncio
from typing import AsyncGenerator
from datetime import datetime

migration_agent = JapaneseMigrationAgent()
cached_results = {}

@st.cache_data(ttl=3600)  # 缓存1小时
def get_consultation_result(profile_key: str):
    # 检查是否有缓存结果
    return cached_results.get(profile_key)

def create_migration_consultation():
    st.title("日本地方移住コンサルテーション")
    
    result = None  # 用于存储结果
    
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
            default=["青森県", "高知県"]
        )
        
        # 具体的な要件（動的に追加可能）
        st.subheader("具体的な要件（重要度順）")
        requirements = []
        for i in range(3):  # 最大3つまで
            req = st.text_input(
                f"要件 {i+1}",
                key=f"req_{i}",
                placeholder="例：子育て支援"
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
            
            # 生成用户配置的唯一键
            profile_key = hash(json.dumps(user_profile, sort_keys=True))
            
            # 尝试从缓存获取结果
            cached_result = get_consultation_result(profile_key)
            if cached_result:
                locations_data, plan_data = cached_result
                st.success("キャッシュから結果を取得しました！")
            else:
                try:
                    progress_bar = st.progress(0)
                    status_text = st.empty()
                    result_container = st.container()
                    # 更新进度
                    status_text.text('ユーザー情報を分析中...')
                    progress_bar.progress(20)
                    
                    # 生成推荐地区
                    status_text.text('推奨地域を検索中...')
                    progress_bar.progress(40)
                    recommended_locations = asyncio.run(migration_agent.generate_locations(user_profile))
                    # 立即显示推荐地区
                    with result_container:
                        st.header("推奨地域")
                        try:
                            # 如果已经是字符串，先解析成JSON对象
                            if isinstance(recommended_locations, str):
                                json_str = json.loads(recommended_locations)
                                if isinstance(json_str, str):
                                    locations_data = json.loads(json_str)
                                else:
                                    locations_data = json_str
                            else:
                                locations_data = recommended_locations
                            # 确保locations_data存在并且包含locations键
                            if not locations_data or "locations" not in locations_data:
                                raise KeyError("Invalid data format: missing 'locations' key")
                            
                            for i, location in enumerate(locations_data["locations"], 1):
                                st.subheader(f"{i}. {location['name']}")
                                st.markdown("**推奨理由：**")
                                for reason in location["reasons"]:
                                    st.markdown(f"- {reason}")
                                st.markdown("**地域の特徴：**")
                                for feature in location["features"]:
                                    st.markdown(f"- {feature}")
                                st.markdown("**支援政策：**")
                                for policy in location["policies"]:
                                    st.markdown(f"- {policy}")
                                st.markdown("---")
                        except (json.JSONDecodeError, KeyError) as e:
                            st.error("推奨地域の解析中にエラーが発生しました。")
                            st.write(f"Error: {str(e)}")
                            st.write(locations_data)
                    # 生成生活计划
                    status_text.text('生活プランを作成中...')
                    progress_bar.progress(70)
                    life_plan = asyncio.run(migration_agent.generate_life_plan(user_profile, recommended_locations))
                    # 显示生活计划
                    with result_container:
                        st.header("生活プラン")
                        try:
                            # 如果已经是字符串，先解析成JSON对象
                            if isinstance(life_plan, str):
                                json_str = json.loads(life_plan)
                                if isinstance(json_str, str):
                                    plan_data = json.loads(json_str)
                                else:
                                    plan_data = json_str
                            else:
                                plan_data = life_plan
                            st.subheader(f"1. 準備期間 ({plan_data['preparation']['period']})")
                            for step in plan_data["preparation"]["steps"]:
                                st.markdown(f"- {step}")
                            st.subheader(f"2. 初期適応期間 ({plan_data['initial']['period']})")
                            for step in plan_data["initial"]["steps"]:
                                st.markdown(f"- {step}")
                            st.subheader(f"3. 定着期間 ({plan_data['settlement']['period']})")
                            for step in plan_data["settlement"]["steps"]:
                                st.markdown(f"- {step}")
                        except (json.JSONDecodeError, KeyError) as e:
                            st.error("生活プランの解析中にエラーが発生しました。")
                            st.write(f"Error: {str(e)}")
                            st.write(plan_data)
                        # 保存完整结果
                    result = {
                        "timestamp": datetime.now().strftime("%Y%m%d_%H%M%S"),
                        "user_profile": user_profile,
                        "consultation_result": {
                            "recommended_locations": recommended_locations,
                            "life_plan": life_plan
                        }
                    }
                    # 完成
                    progress_bar.progress(100)
                    status_text.text('完了！')
                    st.success("コンサルテーションが完了しました！")

                    
                except Exception as e:
                    st.error(f"エラーが発生しました: {e}")
    
        # st.download_button(
        #     label="結果をJSONファイルとしてダウンロード",
        #     data=json.dumps(result, ensure_ascii=False, indent=2),
        #     file_name=f"migration_consultation_{result['timestamp']}.json",
        #     mime="application/json"
        #     )

if __name__ == "__main__":
    create_migration_consultation()