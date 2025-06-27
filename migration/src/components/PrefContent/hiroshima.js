import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import hiroshima from "@/global/img/hiroshima.png";

export default function Aichi() {
  // 页面加载后处理图片地图调整大小的功能
  useEffect(() => {
    // 页面加载时滚动到顶部
    window.scrollTo(0, 0);
    
    // 动态加载 imageMapResizer 库
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/image-map-resizer@1.0.10/js/imageMapResizer.min.js';
    script.onload = () => {
      // 库加载完成后，初始化图片地图调整大小功能
      if (window.imageMapResize) {
        window.imageMapResize();
      }
    };
    document.head.appendChild(script);

    // 处理下拉菜单功能
    const handleGoButtonClick = () => {
      const selectElement = document.getElementById('muni');
      const url = selectElement?.value;
      if (url) {
        window.open(url, '_blank');
      } else {
        alert('市区町村を選択してください');
      }
    };

    // 添加事件监听器
    const goButton = document.getElementById('go');
    if (goButton) {
      goButton.addEventListener('click', handleGoButtonClick);
    }

    // 清理函数
    return () => {
      if (goButton) {
        goButton.removeEventListener('click', handleGoButtonClick);
      }
      // 移除脚本标签
      const existingScript = document.querySelector('script[src*="imageMapResizer"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div>
      <main>
        {/* ヒーローセクション */}
        <section className="hero">
        <div className="hero__inner">
          <h1 className="hero__title">広島県の魅力</h1>
          <p className="hero__lead">
            広島県は日本三景の一つ、瀬戸内海に浮かぶ嚴島神社や世界遺産「原爆ドーム」など多彩な観光名所と、伝統的な祭りや歴史文化が息づいています。お好み焼きや牡蠣など地元グルメも豊富で、温暖な気候と自然、人の温かさ、交通アクセスの良さが住みやすい環境を支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">広島県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：中国地方／約8,479平方km</li>
                <li>主な地形：中国山地、瀬戸内海に面した海岸線、太田川流域の広島平野</li>
                <li>気候区分：瀬戸内式気候（温暖少雨）、一部山間部で内陸性気候</li>
                <li>平均気温・降水量：春（14℃・140mm）、夏（26℃・180mm）、秋（18℃・160mm）、冬（5℃・90mm）※広島市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約2,756,000人（2024年推計）</li>
                <li>人口密度：約325人／km²</li>
                <li>中心都市：広島市（人口約1,190,000人、県庁所在地で経済・文化・交通の中心、原爆ドームや平和記念公園など観光資源が豊富）[2][5]</li>
              </ul>
          </div>
        </div>
      </section>    

        {/* 市区町村マップ */}
        <section id="municipal-map">
          <h2>市区町村マップ</h2>
          
          {/* ドロップダウンメニュー */}
          <div id="municipality-select">
            <label htmlFor="muni">市区町村を選択：</label>
            <select id="muni">
              <option value="">— 選んでください —</option>
              {/* 愛知県 市区町村リスト */}
              <option value="https://www.city.hiroshima.lg.jp/">広島市</option>
<option value="https://www.city.kure.lg.jp/">呉市</option>
<option value="https://www.city.takehara.lg.jp/">竹原市</option>
<option value="https://www.city.mihara.hiroshima.jp/">三原市</option>
<option value="https://www.city.ondochou.hiroshima.jp/">尾道市</option>
<option value="https://www.city.fukuyama.hiroshima.jp/">福山市</option>
<option value="https://www.city.fuchu.hiroshima.jp/">府中市</option>
<option value="https://www.city.miyoshi.hiroshima.jp/">三次市</option>
<option value="https://www.city.shobara.hiroshima.jp/">庄原市</option>
<option value="https://www.city.otake.hiroshima.jp/">大竹市</option>
<option value="https://www.city.etajima.hiroshima.jp/">江田島市</option>
<option value="https://www.city.higashihiroshima.lg.jp/">東広島市</option>
<option value="https://www.city.hatsukaichi.hiroshima.jp/">廿日市市</option>
<option value="https://www.city.akiyoshidai.hiroshima.jp/">安芸高田市</option>
<option value="https://www.town.kaita.hiroshima.jp/">海田町</option>
<option value="https://www.town.fuchu.hiroshima.jp/">府中町</option>
<option value="https://www.town.kumano.hiroshima.jp/">熊野町</option>
<option value="https://www.town.saka.hiroshima.jp/">坂町</option>
<option value="https://www.town.sera.hiroshima.jp/">世羅町</option>
<option value="https://www.town.jinsekikogen.hiroshima.jp/">神石高原町</option>
<option value="https://www.town.akinota.hiroshima.jp/">安芸太田町</option>
<option value="https://www.town.kitahiroshima.lg.jp/">北広島町</option>
<option value="https://www.town.osakikamijima.hiroshima.jp/">大崎上島町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={hiroshima.src}
              alt="広島県市区町村マップ"
              useMap="#hiroshimamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="hiroshimamap">
              {/* 地图区域可以在这里添加 <area> 标签 */}
              <area 
                target="" 
                alt="蘂取村" 
                title="" 
                href="https://itchao.jp/hokkaido/shibetoromura" 
                coords="4507,2661,4184,2356" 
                shape="rect"
              />
            </map>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 地方移住者サイト | すべての権利を保有</p>
      </footer>
    </div>
  );
} 