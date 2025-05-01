document.getElementById('migration-form').addEventListener('submit', function(event) {
    event.preventDefault();  // フォームの送信を防ぐ

    // フォームの値を取得
    const formData = new FormData(event.target);
    const userInfo = {};
    formData.forEach((value, key) => {
        userInfo[key] = value;
    });

    // 入力された情報をコンソールに表示（デバッグ用）
    console.log(userInfo);

    // 仮想的なAI結果を生成（実際にはAPIで生成する部分）
    const matchingResults = generateAIResults(userInfo);

    // 結果の表示
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';  // 以前の結果をクリア

    if (matchingResults.length > 0) {
        matchingResults.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result;
            resultsList.appendChild(li);
        });
        document.getElementById('matching-results').style.display = 'block';
    } else {
        const li = document.createElement('li');
        li.textContent = '条件に合う結果はありませんでした。';
        resultsList.appendChild(li);
        document.getElementById('matching-results').style.display = 'block';
    }
});

// 仮想的なAI結果生成（デモ用）
function generateAIResults(userInfo) {
    // 仮の結果
    return [
        `地域: 東京 | 住居タイプ: 一戸建て | 家賃: ¥100,000 | 生活費上限: ¥200,000`,
        `地域: 名古屋 | 住居タイプ: アパート | 家賃: ¥75,000 | 生活費上限: ¥150,000`
    ];
}
