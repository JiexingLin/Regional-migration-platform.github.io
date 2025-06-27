import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import kagawa from "@/global/img/kagawa.png";

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
          <h1 className="hero__title">香川県の魅力</h1>
          <p className="hero__lead">
            香川県は瀬戸内海の多島美や栗林公園、金刀比羅宮などの名所が点在し、庵治の船祭りやひょうげ祭りといった個性豊かな伝統行事も魅力です。讃岐うどんや瀬戸内の海産物など地元グルメが豊富で、温暖な気候と人の温かさ、都市と自然が調和した住環境、良好な交通アクセスも特徴です
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">香川県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：四国地方／約1,900平方km</li>
                <li>主な地形：讃岐平野、讃岐山脈、瀬戸内海に面した海岸線、多数の島々</li>
                <li>気候区分：瀬戸内型気候（温暖で雨が少ない）</li>
                <li>平均気温・降水量：春（14℃・100mm）、夏（27℃・120mm）、秋（18℃・110mm）、冬（6℃・50mm）※高松市の都市部目安[3][4]</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約940,000人（2025年推計）</li>
                <li>人口密度：約495人／km²</li>
                <li>中心都市：高松市（人口約414,000人、県庁所在地で行政・経済・文化の中心、栗林公園や美術館、港町としての利便性が高い）</li>
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
              <option value="https://www.city.takamatsu.kagawa.jp/">高松市</option>
<option value="https://www.city.marugame.lg.jp/">丸亀市</option>
<option value="https://www.city.sakaide.lg.jp/">坂出市</option>
<option value="https://www.city.zentsuji.kagawa.jp/">善通寺市</option>
<option value="https://www.city.kanonji.kagawa.jp/">観音寺市</option>
<option value="https://www.city.mitoyo.lg.jp/">三豊市</option>
<option value="https://www.city.higashikagawa.lg.jp/">東かがわ市</option>
<option value="https://www.city.sanuki.kagawa.jp/">さぬき市</option>
<option value="https://www.town.naoshima.lg.jp/">直島町</option>
<option value="https://www.town.tadotsu.kagawa.jp/">多度津町</option>
<option value="https://www.town.tonosho.kagawa.jp/">土庄町</option>
<option value="https://www.town.shodoshima.lg.jp/">小豆島町</option>
<option value="https://www.town.utazu.lg.jp/">宇多津町</option>
<option value="https://www.town.honishi.kagawa.jp/">綾川町</option>
<option value="https://www.town.manno.lg.jp/">まんのう町</option>
<option value="https://www.town.ayagawa.kagawa.jp/">綾川町</option>
<option value="https://www.town.manno.lg.jp/">まんのう町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={kagawa.src}
              alt="香川県市区町村マップ"
              useMap="#kagawamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="kagawamap">
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