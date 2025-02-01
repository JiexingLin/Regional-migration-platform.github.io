'use client'
import { useState } from 'react'
import styles from './matching.module.css'

export default function MatchingPage() {
  // 状态管理
  const [formData, setFormData] = useState({
    age: '',
    familyStructure: '',
    livingCost: '',
    security: 'good',
    facilities: '',
    transportation: '',
    commute: '',
    publicTransport: 'easy',
    community: '',
    nature: 'forest',
    education: '',
    schoolType: 'public',
    schoolDistance: '',
    hospitalDistance: '',
    careFacility: 'yes',
    preferredRegions: [] // 添加优先地域
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    // 将带连字符的name转换为驼峰式
    const formattedName = name.replace(/-([a-z])/g, g => g[1].toUpperCase());
    
    // 根据输入类型处理值
    let processedValue = value;
    if (type === 'number') {
      // 如果是数字类型的输入，但输入为空，保持空字符串
      processedValue = value === '' ? '' : value;
    }

    setFormData(prev => ({
      ...prev,
      [formattedName]: processedValue
    }));
  };

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 构造user_profile对象
      const userProfile = {
        "性別": "その他", // 这里可以添加性别选择
        "年齢": Number(formData.age),
        "婚姻状況": formData.familyStructure,
        "希望条件": {
          "生活費": {
            "月額上限": Number(formData.livingCost)
          },
          "生活環境": {
            "治安": formData.security === 'good' ? '良い' : '不安',
            "近隣施設": formData.facilities,
            "交通アクセス": formData.transportation
          },
          "交通": {
            "最寄駅距離": formData.commute,
            "公共交通機関": formData.publicTransport === 'easy' ? '便利' : '不便'
          },
          "文化活動": formData.community,
          "自然環境": {
            "type": formData.nature
          },
          "教育": {
            "子供年齢": Number(formData.education),
            "学校種類": formData.schoolType,
            "通学距離": formData.schoolDistance
          },
          "医療福祉": {
            "病院距離": formData.hospitalDistance,
            "介護施設": formData.careFacility === 'yes' ? 'あり' : 'なし'
          }
        },
        "優先地域": formData.preferredRegions,
      };

      console.log('Sending request with profile:', userProfile); // 调试日志

      const response = await fetch('/api/migration/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_profile: userProfile })
      });

      console.log('Response status:', response.status); // 调试日志

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || '検索に失敗しました');
      }

      const data = await response.json();
      console.log('Received data:', data); // 调试日志

      setResults({
        recommendedLocations: data.recommended_locations,
        lifePlan: data.life_plan
      });
    } catch (error) {
      console.error('Error:', error);
      alert('エラーが発生しました: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 結果表示コンポーネント
  const ResultsSection = ({ results }) => {
    if (!results) return null;

    return (
      <div className={styles.results}>
        <h2>マッチング結果</h2>
        
        {/* 推奨地域 */}
        {results.recommendedLocations?.locations?.map((location, index) => (
          <div key={index} className={styles.locationCard}>
            <h3>{location.name}</h3>
            
            <h4>推奨理由：</h4>
            <ul>
              {location.reasons?.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>

            <h4>地域の特徴：</h4>
            <ul>
              {location.features?.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <h4>支援政策：</h4>
            <ul>
              {location.policies?.map((policy, i) => (
                <li key={i}>{policy}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* 生活プラン */}
        {results.lifePlan && (
          <div className={styles.lifePlanSection}>
            <h3>生活プラン</h3>
            
            <div className={styles.planPhase}>
              <h4>準備期間 ({results.lifePlan.preparation?.period})</h4>
              <ul>
                {results.lifePlan.preparation?.steps?.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>

            <div className={styles.planPhase}>
              <h4>初期適応期間 ({results.lifePlan.initial?.period})</h4>
              <ul>
                {results.lifePlan.initial?.steps?.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>

            <div className={styles.planPhase}>
              <h4>定着期間 ({results.lifePlan.settlement?.period})</h4>
              <ul>
                {results.lifePlan.settlement?.steps?.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1>地域移住者向けマッチング検索</h1>
      
      <form id="migration-form" onSubmit={handleSubmit}>
        {/* 必須情報 */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>必須情報</legend>
          <div className={styles.formGroup}>
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
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="family-structure">家族構成:</label>
            <input 
              type="text" 
              id="family-structure" 
              name="familyStructure"
              value={formData.familyStructure}
              onChange={handleInputChange}
              required 
            />
          </div>
        </fieldset>

        {/* 希望条件 */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>希望条件</legend>
          
          {/* 生活費 */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>生活費</legend>
            <div className={styles.formGroup}>
              <label htmlFor="living-cost">生活費上限（月額・万円）:</label>
              <input 
                type="number" 
                id="living-cost" 
                name="livingCost"
                value={formData.livingCost}
                onChange={handleInputChange}
                required 
                min="0" 
              />
            </div>
          </fieldset>

          {/* 生活環境 */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>生活環境</legend>
            <div className={styles.formGroup}>
              <label htmlFor="security">治安の良さ:</label>
              <select 
                id="security" 
                name="security"
                value={formData.security}
                onChange={handleInputChange}
                required
              >
                <option value="good">良い</option>
                <option value="bad">不安</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="facilities">近隣施設:</label>
              <input 
                type="text" 
                id="facilities" 
                name="facilities"
                value={formData.facilities}
                onChange={handleInputChange}
                placeholder="例: スーパー、病院" 
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="transportation">交通アクセス:</label>
              <input 
                type="text" 
                id="transportation" 
                name="transportation"
                value={formData.transportation}
                onChange={handleInputChange}
                placeholder="例: 最寄駅まで徒歩10分" 
                required 
              />
            </div>
          </fieldset>

          {/* 交通アクセス */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>交通アクセス</legend>
            <div className={styles.formGroup}>
              <label htmlFor="commute">最寄駅までの距離:</label>
              <input 
                type="text" 
                id="commute" 
                name="commute"
                value={formData.commute}
                onChange={handleInputChange}
                placeholder="徒歩圏内" 
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="public-transport">公共交通機関の利便性:</label>
              <select 
                id="public-transport" 
                name="publicTransport"
                value={formData.publicTransport}
                onChange={handleInputChange}
                required
              >
                <option value="easy">便利</option>
                <option value="hard">不便</option>
              </select>
            </div>
          </fieldset>

          {/* 文化・社会活動 */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>文化・社会活動</legend>
            <div className={styles.formGroup}>
              <label htmlFor="community">地域の文化活動:</label>
              <input 
                type="text" 
                id="community" 
                name="community"
                value={formData.community}
                onChange={handleInputChange}
                placeholder="祭り、アートイベント" 
                required 
              />
            </div>
          </fieldset>

          {/* レジャー・自然環境 */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>レジャー・自然環境</legend>
            <div className={styles.formGroup}>
              <label htmlFor="nature">自然環境:</label>
              <select 
                id="nature" 
                name="nature"
                value={formData.nature}
                onChange={handleInputChange}
                required
              >
                <option value="forest">森林</option>
                <option value="beach">海</option>
                <option value="mountain">山</option>
                <option value="none">特に希望なし</option>
              </select>
            </div>
          </fieldset>

          {/* 教育環境 */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>教育環境</legend>
            <div className={styles.formGroup}>
              <label htmlFor="education">お子様の年齢:</label>
              <input 
                type="number" 
                id="education" 
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                min="0" 
                max="18" 
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="school-type">学校の種類:</label>
              <select 
                id="school-type" 
                name="schoolType"
                value={formData.schoolType}
                onChange={handleInputChange}
                required
              >
                <option value="public">公立</option>
                <option value="private">私立</option>
                <option value="international">インターナショナル</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="school-distance">通学の距離:</label>
              <input 
                type="text" 
                id="school-distance" 
                name="schoolDistance"
                value={formData.schoolDistance}
                onChange={handleInputChange}
                placeholder="徒歩圏内" 
                required 
              />
            </div>
          </fieldset>

          {/* 医療・福祉 */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>医療・福祉</legend>
            <div className={styles.formGroup}>
              <label htmlFor="hospital-distance">病院の距離:</label>
              <input 
                type="text" 
                id="hospital-distance" 
                name="hospitalDistance"
                value={formData.hospitalDistance}
                onChange={handleInputChange}
                placeholder="近くに病院が欲しい" 
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="care-facility">介護施設の有無:</label>
              <select 
                id="care-facility" 
                name="careFacility"
                value={formData.careFacility}
                onChange={handleInputChange}
                required
              >
                <option value="yes">あり</option>
                <option value="no">なし</option>
              </select>
            </div>
          </fieldset>

          {/* 優先地域 */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>優先地域</legend>
            <div className={styles.formGroup}>
              <label htmlFor="preferred-regions">希望する地域:</label>
              <select 
                id="preferred-regions" 
                name="preferredRegions"
                value={formData.preferredRegions}
                onChange={(e) => {
                  const options = e.target.options;
                  const value = [];
                  for (let i = 0; i < options.length; i++) {
                    if (options[i].selected) {
                      value.push(options[i].value);
                    }
                  }
                  setFormData(prev => ({
                    ...prev,
                    preferredRegions: value
                  }));
                }}
                multiple
                required
              >
                {/* 日本の都道府県リスト */}
                <option value="北海道">北海道</option>
                <option value="青森県">青森県</option>
                {/* ... 其他都道府县 ... */}
              </select>
            </div>
          </fieldset>
        </fieldset>

        <button 
          className={styles.submitButton} 
          type="submit"
          disabled={loading}
        >
          {loading ? '検索中...' : 'マッチング結果を検索'}
        </button>
      </form>

      {loading ? (
        <div className={styles.loading}>検索中...</div>
      ) : (
        <ResultsSection results={results} />
      )}
    </div>
  )
}
