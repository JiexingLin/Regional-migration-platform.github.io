import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import miyagi from "@/global/img/miyagi.png";

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
          <h1 className="hero__title">宮城県の魅力</h1>
          <p className="hero__lead">
            宮城県は日本三景・松島や蔵王御釜、鳴子峡などの絶景スポットが点在し、仙台七夕まつりや伝統の伊達文化も息づきます。牛たんや笹かまぼこ、ずんだ餅など地元グルメも豊富で、杜の都・仙台を中心に自然と都市が調和し、首都圏からのアクセスも良好な住環境が魅力です
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">宮城県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：東北地方／約7,282平方km</li>
                <li>主な地形：奥羽山脈、蔵王連峰、仙台平野、三陸リアス式海岸、松島湾</li>
                <li>気候区分：太平洋側気候（沿岸部は比較的温暖、内陸部は寒暖差大）</li>
                <li>平均気温・降水量：春（11℃・110mm）、夏（23℃・150mm）、秋（15℃・130mm）、冬（2℃・40mm）※仙台市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約2,249,000人（2025年推計）</li>
                <li>人口密度：約309人／km²</li>
                <li>中心都市：仙台市（人口約1,085,000人、東北最大の都市で行政・経済・文化の中心、仙台城跡やうみの杜水族館など観光資源が豊富）</li>
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
              <option value="https://www.city.sendai.jp/">仙台市</option>
<option value="https://www.city.ishinomaki.lg.jp/">石巻市</option>
<option value="https://www.city.shiogama.miyagi.jp/">塩竈市</option>
<option value="https://www.city.natori.miyagi.jp/">名取市</option>
<option value="https://www.city.kesennuma.lg.jp/">気仙沼市</option>
<option value="https://www.city.shiroishi.miyagi.jp/">白石市</option>
<option value="https://www.city.kakuda.lg.jp/">角田市</option>
<option value="https://www.city.tagajo.miyagi.jp/">多賀城市</option>
<option value="https://www.city.iwanuma.miyagi.jp/">岩沼市</option>
<option value="https://www.city.tome.miyagi.jp/">登米市</option>
<option value="https://www.city.kurihara.miyagi.jp/">栗原市</option>
<option value="https://www.city.higashimatsushima.miyagi.jp/">東松島市</option>
<option value="https://www.city.osaki.miyagi.jp/">大崎市</option>
<option value="https://www.city.tomisato.miyagi.jp/">富谷市</option>
<option value="https://www.town.zao.miyagi.jp/">蔵王町</option>
<option value="https://www.town.shichikashuku.miyagi.jp/">七ヶ宿町</option>
<option value="https://www.town.ogawara.miyagi.jp/">大河原町</option>
<option value="https://www.town.murata.miyagi.jp/">村田町</option>
<option value="https://www.town.shibata.miyagi.jp/">柴田町</option>
<option value="https://www.town.kawasaki.miyagi.jp/">川崎町</option>
<option value="https://www.town.maru.miyagi.jp/">丸森町</option>
<option value="https://www.town.watari.miyagi.jp/">亘理町</option>
<option value="https://www.town.yamamoto.miyagi.jp/">山元町</option>
<option value="https://www.town.matsushima.miyagi.jp/">松島町</option>
<option value="https://www.town.shichigahama.miyagi.jp/">七ヶ浜町</option>
<option value="https://www.town.rifu.miyagi.jp/">利府町</option>
<option value="https://www.town.taikyu.miyagi.jp/">大和町</option>
<option value="https://www.town.ohira.miyagi.jp/">大郷町</option>
<option value="https://www.town.osato.miyagi.jp/">大衡村</option>
<option value="https://www.town.tomiya.miyagi.jp/">色麻町</option>
<option value="https://www.town.kami.miyagi.jp/">加美町</option>
<option value="https://www.town.wakuya.miyagi.jp/">涌谷町</option>
<option value="https://www.town.misato.miyagi.jp/">美里町</option>
<option value="https://www.town.onagawa.miyagi.jp/">女川町</option>
<option value="https://www.town.minamisanriku.miyagi.jp/">南三陸町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={miyagi.src}
              alt="宮城県市区町村マップ"
              useMap="#miyagimap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="miyagimap">
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