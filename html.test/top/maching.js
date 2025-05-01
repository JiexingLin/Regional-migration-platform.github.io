// 生成AIからの仮のマッチング結果（実際にはAPIから取得）
const matchingData = [
    {
        "region": "東京",
        "living_cost": 250000,
        "rent": 120000,
        "utilities": 20000,
        "security": "治安が良い",
        "facilities": ["スーパー", "病院", "郵便局"],
        "transportation": ["電車", "バス"],
        "cultural_activities": ["祭り", "アートイベント"],
        "nature": ["森林", "海"]
    },
    {
        "region": "大阪",
        "living_cost": 220000,
        "rent": 100000,
        "utilities": 15000,
        "security": "治安が良い",
        "facilities": ["スーパー", "病院"],
        "transportation": ["電車", "バス"],
        "cultural_activities": ["音楽イベント", "ボランティア活動"],
        "nature": ["山", "公園"]
    },
    {
        "region": "名古屋",
        "living_cost": 180000,
        "rent": 80000,
        "utilities": 12000,
        "security": "治安に不安",
        "facilities": ["スーパー", "病院", "郵便局"],
        "transportation": ["電車"],
        "cultural_activities": ["アートイベント", "祭り"],
        "nature": ["森林", "温泉地"]
    }
];

// 結果を表に追加
function displayResults(results) {
    const tableBody = document.querySelector('#results-table tbody');
    tableBody.innerHTML = '';  // 既存の結果をクリア

    results.forEach(result => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${result.region}</td>
            <td>¥${result.living_cost.toLocaleString()}</td>
            <td>¥${result.rent.toLocaleString()}</td>
            <td>¥${result.utilities.toLocaleString()}</td>
            <td>${result.security}</td>
            <td>${result.facilities.join(', ')}</td>
            <td>${result.transportation.join(', ')}</td>
            <td>${result.cultural_activities.join(', ')}</td>
            <td>${result.nature.join(', ')}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// ページロード時に結果を表示
document.addEventListener('DOMContentLoaded', () => {
    displayResults(matchingData);
});
