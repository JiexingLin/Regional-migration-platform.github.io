'use client'
import { useState } from 'react'
import styles from './matching.module.css'

export default function MatchingPage() {
  // 表单状态管理
  const [formData, setFormData] = useState({
    // 第1部：基本情報
    name: '',
    ageGroup: '',
    currentLocation: '',
    familyStructure: '',
    familyStructureOther: '',
    childAge: '', // 🔧 添加缺失的childAge字段
    migrationReason: '',
    
    // 第2部：移住先での暮らしのご希望
    // 1. ライフスタイル・環境
    lifestylePreferences: [],
    snowTolerance: '',
    insectTolerance: '',
    drivingStatus: '',
    preferredTransportation: '',
    
    // 2. 仕事・キャリア
    workStyle: [],
    workRequirements: '',
    
    // 3. 住まい
    housingType: [],
    rentBudget: '',
    purchaseBudget: '',
    housingRequirements: [],
    
    // 4. 家族・教育
    educationPreferences: [],
    childRearingPreferences: [],
    
    // 第3部：移住に関する不安や懸念
    concerns: [],
    otherConcerns: '',
    
    // 第4部：移住計画
    migrationTimeline: '',
    interestedAreas: '',
    previousExperience: ''
  });

  // 搜索结果状态
  const [searchResults, setSearchResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // 转换表单数据为所需的格式
    const userProfile = convertFormDataToUserProfile(formData);
    
    try {
      // 发送数据到后端API
      const response = await fetch('http://localhost:8000/api/migration/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_profile: userProfile }),
      });
      
      if (!response.ok) {
        throw new Error(`APIリクエストに失敗しました: ${response.status}`);
      }
      
      const result = await response.json();
      setSearchResults(result);
      setShowResults(true);
    } catch (error) {
      console.error('エラーが発生しました:', error);
      setError(error.message || 'エラーが発生しました。後でもう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  // 转换表单数据为用户资料格式
  const convertFormDataToUserProfile = (formData) => {
    return {
      "基本情報": {
        "年代": formData.ageGroup,
        "現在の居住地": formData.currentLocation,
        "家族構成": {
          "構成": formData.familyStructure,
          "その他": formData.familyStructureOther,
          "お子様の年齢": formData.childAge ? `${formData.childAge}歳` : ''
        },
        "移住理由": formData.migrationReason
      },
      "希望条件": {
        "ライフスタイル": {
          "希望する暮らし": formData.lifestylePreferences,
          "自然環境": {
            "雪国での暮らし": formData.snowTolerance,
            "虫への許容度": formData.insectTolerance
          },
          "交通手段": {
            "車の運転": formData.drivingStatus,
            "主な移動手段": formData.preferredTransportation
          }
        },
        "仕事・キャリア": {
          "働き方": formData.workStyle,
          "希望条件": formData.workRequirements
        },
        "住まい": {
          "希望する住居タイプ": formData.housingType,
          "予算": {
            "家賃": formData.rentBudget ? `${formData.rentBudget}万円` : '',
            "購入": formData.purchaseBudget ? `${formData.purchaseBudget}万円` : ''
          },
          "必須条件": formData.housingRequirements
        },
        "教育・子育て": {
          "教育環境": formData.educationPreferences,
          "子育て支援": formData.childRearingPreferences
        }
      },
      "不安・懸念": {
        "主な不安": formData.concerns,
        "その他の不安": formData.otherConcerns
      },
      "移住計画": {
        "希望時期": formData.migrationTimeline,
        "興味のある地域": formData.interestedAreas,
        "これまでの経験": formData.previousExperience
      }
    };
  };

  // 处理复选框变化
  const handleCheckboxChange = (category, value) => {
    setFormData(prev => {
      const currentValues = prev[category] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [category]: newValues };
    });
  };

  // 处理输入框变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value || '' }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1Color}>地域移住者向けマッチング検索</h1>
      
      <form onSubmit={handleSubmit}>
        {/* 第1部：基本情報 */}
        <fieldset>
          <legend>第1部：基本情報について</legend>
          
          <label htmlFor="name">お名前:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className={styles.inputStyled}
          />

          <fieldset>
            <legend>年代:</legend>
            <div className={styles.radioGroup}>
              {['10代', '20代', '30代', '40代', '50代', '60代以上'].map(value => (
                <label key={value}>
                  <input
                    type="radio"
                    name="ageGroup"
                    value={value}
                    checked={formData.ageGroup === value}
                    onChange={() => setFormData(prev => ({ ...prev, ageGroup: value }))}
                  />
                  {value}
                </label>
              ))}
            </div>
          </fieldset>

          <label htmlFor="currentLocation">現在の居住地（都道府県・市区町村）:</label>
          <input
            type="text"
            id="currentLocation"
            name="currentLocation"
            value={formData.currentLocation}
            onChange={handleInputChange}
            required
            className={styles.inputStyled}
          />

          <fieldset>
            <legend>家族構成について:</legend>
            <div className={styles.radioGroup}>
              {[
                '単身',
                'パートナー・配偶者のみ',
                'お子様あり',
                'ご両親や親族と同居予定',
                'その他'
              ].map(value => (
                <label key={value}>
                  <input
                    type="radio"
                    name="familyStructure"
                    value={value}
                    checked={formData.familyStructure === value}
                    onChange={() => setFormData(prev => ({ ...prev, familyStructure: value }))}
                  />
                  {value}
                </label>
              ))}
            </div>
            {formData.familyStructure === 'お子様あり' && (
              <div>
                <label htmlFor="childAge">お子様の年齢（歳）:</label>
                <div className={styles.inputWithUnit}>
                  <input
                    type="number"
                    id="childAge"
                    name="childAge"
                    value={formData.childAge}
                    placeholder="例：10"
                    min="1"
                    step="1"
                    onChange={handleInputChange}
                    className={styles.inputStyled}
                  />
                  <span className={styles.unit}>歳</span>
                </div>
              </div>
            )}
            {formData.familyStructure === 'その他' && (
              <div>
                <label htmlFor="familyStructureOther">具体的に:</label>
                <input
                  type="text"
                  id="familyStructureOther"
                  name="familyStructureOther"
                  value={formData.familyStructureOther}
                  onChange={handleInputChange}
                  className={styles.inputStyled}
                />
              </div>
            )}
          </fieldset>

          <label htmlFor="migrationReason">移住を考え始めたきっかけ・理由:</label>
          <textarea
            id="migrationReason"
            name="migrationReason"
            value={formData.migrationReason}
            onChange={handleInputChange}
            placeholder="例：都会の満員電車が辛い、自然の中で子育てがしたい、新しい挑戦として農業を始めたい、趣味の時間を大切にしたい、など"
            required
            className={styles.textareaStyled}
          />
        </fieldset>

        {/* 第2部：移住先での暮らしのご希望 */}
        <fieldset>
          <legend>第2部：移住先での暮らしのご希望について</legend>

          {/* 1. ライフスタイル・環境 */}
          <fieldset>
            <legend>1. ライフスタイル・環境</legend>
            
            <label>希望する暮らしのイメージ（複数選択可）:</label>
            <div className={styles.checkboxGroup}>
              {[
                '山や川など、豊かな自然に囲まれた暮らし',
                '海の近くで、釣りやマリンスポーツを楽しめる暮らし',
                '田園風景が広がる、のどかな暮らし',
                'ある程度の商業施設や交通の便が揃った地方都市での暮らし',
                '歴史的な街並みや文化が感じられる暮らし',
                '地域コミュニティと積極的に関わる暮らし',
                '人間関係は最低限で、プライバシーを重視した静かな暮らし'
              ].map(value => (
                <label key={value}>
                  <input
                    type="checkbox"
                    name="lifestylePreferences"
                    value={value}
                    checked={formData.lifestylePreferences.includes(value)}
                    onChange={() => handleCheckboxChange('lifestylePreferences', value)}
                  />
                  {value}
                </label>
              ))}
            </div>

            <fieldset>
              <legend>自然環境に関する許容度:</legend>
              <div>
                <label>雪国での暮らしは:</label>
                <div className={styles.radioGroup}>
                  {['問題ない', 'できれば避けたい', '絶対に避けたい'].map(value => (
                    <label key={value}>
                      <input
                        type="radio"
                        name="snowTolerance"
                        value={value}
                        checked={formData.snowTolerance === value}
                        onChange={() => setFormData(prev => ({ ...prev, snowTolerance: value }))}
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label>虫（特に大型の昆虫や害虫）は:</label>
                <div className={styles.radioGroup}>
                  {['気にならない', '少し苦手', 'かなり苦手'].map(value => (
                    <label key={value}>
                      <input
                        type="radio"
                        name="insectTolerance"
                        value={value}
                        checked={formData.insectTolerance === value}
                        onChange={() => setFormData(prev => ({ ...prev, insectTolerance: value }))}
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>交通手段について:</legend>
              <div>
                <label>車の運転は:</label>
                <div className={styles.radioGroup}>
                  {['日常的に運転する', 'ペーパードライバー', 'できない・したくない'].map(value => (
                    <label key={value}>
                      <input
                        type="radio"
                        name="drivingStatus"
                        value={value}
                        checked={formData.drivingStatus === value}
                        onChange={() => setFormData(prev => ({ ...prev, drivingStatus: value }))}
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label>移住後の主な移動手段の希望:</label>
                <div className={styles.radioGroup}>
                  {['自家用車中心', '公共交通機関（電車・バス）も重視', '自転車や徒歩'].map(value => (
                    <label key={value}>
                      <input
                        type="radio"
                        name="preferredTransportation"
                        value={value}
                        checked={formData.preferredTransportation === value}
                        onChange={() => setFormData(prev => ({ ...prev, preferredTransportation: value }))}
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </div>
            </fieldset>
          </fieldset>

          {/* 2. 仕事・キャリア */}
          <fieldset>
            <legend>2. 仕事・キャリア</legend>
            
            <label>移住先での働き方（複数選択可）:</label>
            <div className={styles.checkboxGroup}>
              {[
                '現在の仕事をリモートワークで継続',
                '移住先で新しい仕事を探す（転職）',
                '農業・林業・漁業などに従事したい（就農など）',
                '自分で事業を始める（起業・独立開業）',
                '地域おこし協力隊など、自治体の制度を活用したい',
                '未定・これから考える'
              ].map(value => (
                <label key={value}>
                  <input
                    type="checkbox"
                    name="workStyle"
                    value={value}
                    checked={formData.workStyle.includes(value)}
                    onChange={() => handleCheckboxChange('workStyle', value)}
                  />
                  {value}
                </label>
              ))}
            </div>

            <label htmlFor="workRequirements">仕事に関する希望条件（もしあれば）:</label>
            <textarea
              id="workRequirements"
              name="workRequirements"
              value={formData.workRequirements}
              onChange={handleInputChange}
              placeholder="例：希望職種、最低希望年収、通勤時間の許容範囲、副業の可否など"
              className={styles.textareaStyled}
            />
          </fieldset>

          {/* 3. 住まい */}
          <fieldset>
            <legend>3. 住まい</legend>
            
            <label>希望する住居のタイプ（複数選択可）:</label>
            <div className={styles.checkboxGroup}>
              {[
                'アパート・マンション（賃貸）',
                '一戸建て（賃貸）',
                '一戸建て（新築・購入）',
                '中古住宅・古民家（購入・リノベーション）',
                '自治体が提供する移住者向け住宅'
              ].map(value => (
                <label key={value}>
                  <input
                    type="checkbox"
                    name="housingType"
                    value={value}
                    checked={formData.housingType.includes(value)}
                    onChange={() => handleCheckboxChange('housingType', value)}
                  />
                  {value}
                </label>
              ))}
            </div>

            <div>
              <label htmlFor="rentBudget">家賃の場合：月額（万円まで）</label>
              <div className={styles.inputWithUnit}>
                <input
                  type="number"
                  id="rentBudget"
                  name="rentBudget"
                  value={formData.rentBudget}
                  onChange={handleInputChange}
                  placeholder="例：10"
                  min="1"
                  step="1"
                  className={styles.inputStyled}
                />
                <span className={styles.unit}>万円</span>
              </div>
            </div>

            <div>
              <label htmlFor="purchaseBudget">購入の場合：総額（万円まで）</label>
              <div className={styles.inputWithUnit}>
                <input
                  type="number"
                  id="purchaseBudget"
                  name="purchaseBudget"
                  value={formData.purchaseBudget}
                  onChange={handleInputChange}
                  placeholder="例：200"
                  min="1"
                  step="1"
                  className={styles.inputStyled}
                />
                <span className={styles.unit}>万円</span>
              </div>
            </div>

            <label>住まいの必須条件・希望条件（複数選択可）:</label>
            <div className={styles.checkboxGroup}>
              {[
                '庭・家庭菜園スペース',
                '駐車場',
                '日当たり良好',
                'インターネット光回線',
                'スーパー・コンビニが近い',
                '駅から近い'
              ].map(value => (
                <label key={value}>
                  <input
                    type="checkbox"
                    name="housingRequirements"
                    value={value}
                    checked={formData.housingRequirements.includes(value)}
                    onChange={() => handleCheckboxChange('housingRequirements', value)}
                  />
                  {value}
                </label>
              ))}
            </div>
          </fieldset>

          {/* 4. 家族・教育 */}
          <fieldset>
            <legend>4. 家族・教育（お子様がいらっしゃる場合）</legend>
            
            <label>重視する教育環境（複数選択可）:</label>
            <div className={styles.checkboxGroup}>
              {[
                '待機児童が少ない・保育園に入りやすい',
                '少人数教育で、一人ひとりに目が行き届く',
                '自然体験や地域学習が充実している',
                '国際教育や特色ある教育（プログラミング、アートなど）に力を入れている',
                '高校・大学への進学の選択肢'
              ].map(value => (
                <label key={value}>
                  <input
                    type="checkbox"
                    name="educationPreferences"
                    value={value}
                    checked={formData.educationPreferences.includes(value)}
                    onChange={() => handleCheckboxChange('educationPreferences', value)}
                  />
                  {value}
                </label>
              ))}
            </div>

            <label>子育てに関する希望（複数選択可）:</label>
            <div className={styles.checkboxGroup}>
              {[
                '公園や子供が遊べる安全な場所が多い',
                '子育て世代のコミュニティがある',
                '医療費助成など、自治体の子育て支援制度が手厚い',
                '小児科や救急対応可能な病院へのアクセスが良い'
              ].map(value => (
                <label key={value}>
                  <input
                    type="checkbox"
                    name="childRearingPreferences"
                    value={value}
                    checked={formData.childRearingPreferences.includes(value)}
                    onChange={() => handleCheckboxChange('childRearingPreferences', value)}
                  />
                  {value}
                </label>
              ))}
            </div>
          </fieldset>
        </fieldset>

        {/* 第3部：移住に関する不安や懸念 */}
        <fieldset>
          <legend>第3部：移住に関する不安や懸念について</legend>
          
          <label>現在、最も不安に感じていることは何ですか？（複数選択可）</label>
          <div className={styles.checkboxGroup}>
            {[
              '仕事が見つかるか、収入が維持できるか',
              '地域コミュニティに馴染めるか、人間関係',
              '医療体制（病院の数、専門医の有無）',
              '買い物や公共交通機関など、生活の利便性',
              '子供の教育環境や転校への適応',
              '想定外の費用がかかること',
              'その他'
            ].map(value => (
              <label key={value}>
                <input
                  type="checkbox"
                  name="concerns"
                  value={value}
                  checked={formData.concerns.includes(value)}
                  onChange={() => handleCheckboxChange('concerns', value)}
                />
                {value}
              </label>
            ))}
          </div>

          {formData.concerns.includes('その他') && (
            <div>
              <label htmlFor="otherConcerns">具体的に:</label>
              <input
                type="text"
                id="otherConcerns"
                name="otherConcerns"
                value={formData.otherConcerns}
                onChange={handleInputChange}
                className={styles.inputStyled}
              />
            </div>
          )}
        </fieldset>

        {/* 第4部：移住計画 */}
        <fieldset>
          <legend>第4部：移住計画について</legend>
          
          <label>移住を希望する時期:</label>
          <div className={styles.radioGroup}>
            {['半年以内', '1年以内', '2〜3年以内', '時期は未定'].map(value => (
              <label key={value}>
                <input
                  type="radio"
                  name="migrationTimeline"
                  value={value}
                  checked={formData.migrationTimeline === value}
                  onChange={() => setFormData(prev => ({ ...prev, migrationTimeline: value }))}
                />
                {value}
              </label>
            ))}
          </div>

          <label htmlFor="interestedAreas">興味のある都道府県や市町村はありますか？（もしあれば）:</label>
          <input
            type="text"
            id="interestedAreas"
            name="interestedAreas"
            value={formData.interestedAreas}
            onChange={handleInputChange}
            className={styles.inputStyled}
          />

          <label htmlFor="previousExperience">これまでに、移住のための情報収集や現地訪問などをした経験はありますか？</label>
          <textarea
            id="previousExperience"
            name="previousExperience"
            value={formData.previousExperience}
            onChange={handleInputChange}
            placeholder="例：移住フェアに参加した、〇〇市に旅行で訪れたことがある、など"
            className={styles.textareaStyled}
          />
        </fieldset>

        <div className={styles.buttonWrapper}>
          <button type="submit" disabled={isLoading} className={styles.submitButton}>
            {isLoading ? '検索中...' : 'マッチング結果を検索'}
          </button>
        </div>
      </form>

      {/* エラーメッセージ */}
      {error && (
        <div className={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}

      {/* マッチング結果 */}
      {showResults && searchResults && (
        <div className={styles.results}>
          <h2>マッチング結果</h2>
          <div className={styles.resultsContainer}>
            {/* 推荐地点展示 */}
            {searchResults.recommended_locations && (
              <div className={styles.locationsSection}>
                <h3>おすすめの地域</h3>
                <div className={styles.locationsGrid}>
                  {searchResults.recommended_locations.locations.map((location, index) => (
                    <div key={index} className={styles.locationCard}>
                      <h4>{location.name}</h4>
                      <div className={styles.locationDetails}>
                        <div className={styles.detailSection}>
                          <h5>推奨理由</h5>
                          <ul>
                            {location.reasons.map((reason, i) => (
                              <li key={i}>{reason}</li>
                            ))}
                          </ul>
                        </div>
                        <div className={styles.detailSection}>
                          <h5>特徴</h5>
                          <ul>
                            {location.features.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <div className={styles.detailSection}>
                          <h5>支援政策</h5>
                          <ul>
                            {location.policies.map((policy, i) => (
                              <li key={i}>{policy}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 生活计划展示 */}
            {searchResults.life_plan && (
              <div className={styles.lifePlanSection}>
                <h3>移住計画</h3>
                <div className={styles.planTimeline}>
                  {/* 准备阶段 */}
                  <div className={styles.planPhase}>
                    <h4>{searchResults.life_plan.preparation.period}</h4>
                    <ul>
                      {searchResults.life_plan.preparation.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                  {/* 初期阶段 */}
                  <div className={styles.planPhase}>
                    <h4>{searchResults.life_plan.initial.period}</h4>
                    <ul>
                      {searchResults.life_plan.initial.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                  {/* 定居阶段 */}
                  <div className={styles.planPhase}>
                    <h4>{searchResults.life_plan.settlement.period}</h4>
                    <ul>
                      {searchResults.life_plan.settlement.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 搜索结果展示 */}
            {searchResults.search_top_results && (
              <div className={styles.searchResultsSection}>
                <h3>関連情報</h3>
                <div className={styles.searchResultsGrid}>
                  {Object.entries(searchResults.search_top_results).map(([question, results], index) => (
                    <div key={index} className={styles.searchResultCard}>
                      <h4>{question}</h4>
                      <ul>
                        {results.map((result, i) => (
                          <li key={i}>
                            <a href={result.link} target="_blank" rel="noopener noreferrer">
                              {result.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
