'use client'
import { useState } from 'react'
import styles from './matching.module.css'

export default function MatchingPage() {
  // 表单状态管理
  const [formData, setFormData] = useState({
    name: '',
    nameFurigana: '',
    age: '',
    familyStructure: '',
    contact: '',
    livingCost: '', // 单选
    security: '',   // 单选
    facilities: [],
    car: '',        // 单选
    publicTransport: [],
    schoolType: [],
    eduSupport: [],
    medical: []
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
    // 转换生活费选项为具体数值
    const livingCostMap = {
      'under-50k': '5万円未満',
      '50k-100k': '5〜10万円',
      '100k-150k': '10万円～15万円',
      'over-150k': '15万円以上'
    };

    // 转换治安选项为具体数值
    const securityMap = {
      'under-0.2k': '200件未満',
      '0.2k-0.3k': '200件~300件',
      '0.3k': '300件以上'
    };

    // 转换设施选项为具体名称
    const facilitiesMap = {
      'supermarket': 'スーパーマーケット',
      'shopping-mall': 'ショッピングモール',
      'government-office': '役所',
      'library': '図書館'
    };

    // 转换交通选项为具体名称
    const transportMap = {
      'subway': '電車',
      'bus': 'バス',
      'bullet-train': '新幹線',
      'airport': '空港'
    };

    // 转换学校类型为具体名称
    const schoolTypeMap = {
      'ele-school': '保育園',
      'kindergarden': '幼稚園',
      'pri-school': '小学校',
      'jh-school': '中学校',
      'h-school': '高校'
    };

    // 转换教育支援为具体名称
    const eduSupportMap = {
      'free': '学費無償制度',
      'scholarship': '奨学金',
      'int-edu': '国際教育'
    };

    // 转换医疗设施为具体名称
    const medicalMap = {
      'hospital': '総合病院',
      'clinic': 'クリニック',
      'nursing-facility': '介護施設',
      'nursing-station': '訪問看護ステーション'
    };

    return {
      "基本情報": {
        "年齢": formData.age,
        "家族構成": formData.familyStructure,
      },
      "希望条件": {
        "生活費": livingCostMap[formData.livingCost],
        "治安": securityMap[formData.security],
        "近隣施設": formData.facilities.map(fac => facilitiesMap[fac]),
        "交通アクセス": {
          "車の有無": formData.car === 'yes' ? "車を持っている" : formData.car === 'no' ? "車を持っていない" : '',
          "公共交通機関": formData.publicTransport.map(trans => transportMap[trans])
        },
        "教育環境": {
          "学校の区分": formData.schoolType.map(school => schoolTypeMap[school]),
          "教育支援制度": formData.eduSupport.map(edu => eduSupportMap[edu])
        },
        "医療・福祉": formData.medical.map(med => medicalMap[med])
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1Color}>地域移住者向けマッチング検索</h1>
      
      <form onSubmit={handleSubmit}>
        {/* 必須情報 */}
        <fieldset>
          <legend>必須情報</legend>
          <label htmlFor="name">氏名（漢字）:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="nameFurigana">フリガナ:</label>
          <input
            type="text"
            id="nameFurigana"
            name="nameFurigana"
            value={formData.nameFurigana}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="age">年齢:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
            min="18"
            max="100"
          />

          <label htmlFor="familyStructure">家族構成:</label>
          <input
            type="text"
            id="familyStructure"
            name="familyStructure"
            value={formData.familyStructure}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="contact">連絡先:</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            required
          />
        </fieldset>

        {/* 希望条件 */}
        <fieldset>
          <legend>希望条件</legend>

          {/* 生活費 */}
          <fieldset>
            <legend>生活費上限（月額）:</legend>
            <div className={styles.radioGroup}>
              {['under-50k', '50k-100k', '100k-150k', 'over-150k'].map(value => (
                <label key={value}>
                  <input
                    type="radio"
                    name="livingCost"
                    value={value}
                    checked={formData.livingCost === value}
                    onChange={() => setFormData(prev => ({ ...prev, livingCost: value }))}
                  />
                  {value === 'under-50k' ? '5万円未満' :
                   value === '50k-100k' ? '5〜10万円' :
                   value === '100k-150k' ? '10万円～15万円' : '15万円以上'}
                </label>
              ))}
            </div>
          </fieldset>

          {/* 生活環境 */}
          <fieldset>
            <legend>生活環境</legend>
            <label>治安の良さ:</label>
            <div className={styles.radioGroup}>
              {['under-0.2k', '0.2k-0.3k', '0.3k'].map(value => (
                <label key={value}>
                  <input
                    type="radio"
                    name="security"
                    value={value}
                    checked={formData.security === value}
                    onChange={() => setFormData(prev => ({ ...prev, security: value }))}
                  />
                  {value === 'under-0.2k' ? '200件未満' :
                   value === '0.2k-0.3k' ? '200件~300件' : '300件以上'}
                </label>
              ))}
            </div>

            <label>近隣施設:</label>
            <div className="checkbox-group">
              {['supermarket', 'shopping-mall', 'government-office', 'library'].map(value => (
                <label key={value}>
                  <input
                    type="checkbox"
                    name="facilities"
                    value={value}
                    checked={formData.facilities.includes(value)}
                    onChange={() => handleCheckboxChange('facilities', value)}
                  />
                  {value === 'supermarket' ? 'スーパーマーケット' :
                   value === 'shopping-mall' ? 'ショッピングモール' :
                   value === 'government-office' ? '役所' : '図書館'}
                </label>
              ))}
            </div>
          </fieldset>

          {/* 交通アクセス */}
          <fieldset>
            <legend>交通アクセス</legend>
            <label>車の有無:</label>
            <div className={styles.radioGroup}>
              {['yes', 'no'].map(value => (
                <label key={value}>
                  <input
                    type="radio"
                    name="car"
                    value={value}
                    checked={formData.car === value}
                    onChange={() => setFormData(prev => ({ ...prev, car: value }))}
                  />
                  {value === 'yes' ? '車を持っている' : '車を持っていない'}
                </label>
              ))}
            </div>

            <label>公共交通機関:</label>
            <div className="checkbox-group">
              {['subway', 'bus', 'bullet-train', 'airport'].map(value => (
                <label key={value}>
                  <input
                    type="checkbox"
                    name="publicTransport"
                    value={value}
                    checked={formData.publicTransport.includes(value)}
                    onChange={() => handleCheckboxChange('publicTransport', value)}
                  />
                  {value === 'subway' ? '電車' :
                   value === 'bus' ? 'バス' :
                   value === 'bullet-train' ? '新幹線' : '空港'}
                </label>
              ))}
            </div>
          </fieldset>

          {/* 教育環境 */}
          <fieldset>
            <legend>教育環境</legend>
            <label>学校の区分:</label>
            <div className="checkbox-group">
              {['ele-school', 'kindergarden', 'pri-school', 'jh-school', 'h-school'].map(value => (
                <label key={value}>
                  <input
                    type="checkbox"
                    name="schoolType"
                    value={value}
                    checked={formData.schoolType.includes(value)}
                    onChange={() => handleCheckboxChange('schoolType', value)}
                  />
                  {value === 'ele-school' ? '保育園' :
                   value === 'kindergarden' ? '幼稚園' :
                   value === 'pri-school' ? '小学校' :
                   value === 'jh-school' ? '中学校' : '高校'}
                </label>
              ))}
            </div>

            <label>教育支援制度:</label>
            <div className="checkbox-group">
              {['free', 'scholarship', 'int-edu'].map(value => (
                <label key={value}>
                  <input
                    type="checkbox"
                    name="eduSupport"
                    value={value}
                    checked={formData.eduSupport.includes(value)}
                    onChange={() => handleCheckboxChange('eduSupport', value)}
                  />
                  {value === 'free' ? '学費無償制度' :
                   value === 'scholarship' ? '奨学金' : '国際教育'}
                </label>
              ))}
            </div>
          </fieldset>

          {/* 医療・福祉 */}
          <fieldset>
            <legend>医療・福祉</legend>
            <div className="checkbox-group">
              {['hospital', 'clinic', 'nursing-facility', 'nursing-station'].map(value => (
                <label key={value}>
                  <input
                    type="checkbox"
                    name="medical"
                    value={value}
                    checked={formData.medical.includes(value)}
                    onChange={() => handleCheckboxChange('medical', value)}
                  />
                  {value === 'hospital' ? '総合病院' :
                   value === 'clinic' ? 'クリニック' :
                   value === 'nursing-facility' ? '介護施設' : '訪問看護ステーション'}
                </label>
              ))}
            </div>
          </fieldset>
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
