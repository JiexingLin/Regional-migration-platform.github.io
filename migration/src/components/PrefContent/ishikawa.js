import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import ishikawa from "@/global/img/ishikawa.png";

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
          <h1 className="hero__title">石川県の魅力</h1>
          <p className="hero__lead">
            石川県は兼六園や金沢城、能登半島の絶景など多彩な観光名所が点在し、金沢箔や九谷焼などの伝統工芸も盛んです。のどぐろや加賀野菜、金のかすてらなど地元グルメ・特産品も豊富で、自然と歴史、人の温かさ、交通アクセスの良さが住みやすい環境を支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">石川県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：北陸地方／約4,186平方km</li>
                <li>主な地形：能登半島、加賀山地、河北潟周辺の平野、日本海に面した長い海岸線</li>
                <li>気候区分：日本海側気候（冬季は積雪が多い）、能登地域は海洋性気候</li>
                <li>平均気温・降水量：春（11℃・130mm）、夏（25℃・170mm）、秋（17℃・180mm）、冬（3℃・190mm）※金沢市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,130,000人（2024年推計）</li>
                <li>人口密度：約270人／km²</li>
                <li>中心都市：金沢市（人口約453,000人、県庁所在地で観光・文化の中心、兼六園や金沢城など観光資源が豊富）[7][8]</li>
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
              <option value="https://www.city.kanazawa.lg.jp/">金沢市</option>
<option value="https://www.city.nanao.lg.jp/">七尾市</option>
<option value="https://www.city.komatsu.lg.jp/">小松市</option>
<option value="https://www.city.wajima.ishikawa.jp/">輪島市</option>
<option value="https://www.city.suzu.ishikawa.jp/">珠洲市</option>
<option value="https://www.city.kaga.ishikawa.jp/">加賀市</option>
<option value="https://www.city.hakui.lg.jp/">羽咋市</option>
<option value="https://www.city.kahoku.lg.jp/">かほく市</option>
<option value="https://www.city.hakusan.lg.jp/">白山市</option>
<option value="https://www.city.nomi.ishikawa.jp/">能美市</option>
<option value="https://www.city.nonoichi.lg.jp/">野々市市</option>
<option value="https://www.town.tsubata.lg.jp/">津幡町</option>
<option value="https://www.town.uchinada.lg.jp/">内灘町</option>
<option value="https://www.town.shika.ishikawa.jp/">志賀町</option>
<option value="https://www.town.hodatsushimizu.ishikawa.jp/">宝達志水町</option>
<option value="https://www.town.nakano.ishikawa.jp/">中能登町</option>
<option value="https://www.town.noto.lg.jp/">能登町</option>
<option value="https://www.town.anamizu.lg.jp/">穴水町</option>
<option value="https://www.town.notocho.ishikawa.jp/">能登町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={ishikawa.src}
              alt="石川県市区町村マップ"
              useMap="#ishikawamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="ishikawamap">
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