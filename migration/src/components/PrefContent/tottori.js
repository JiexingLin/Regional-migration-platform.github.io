import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import tottori from "@/global/img/tottori.png";

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
          <h1 className="hero__title">鳥取県の魅力</h1>
          <p className="hero__lead">
            鳥取県は日本最大級の鳥取砂丘や大山、浦富海岸などの絶景が楽しめ、水木しげるロードや倉吉白壁土蔵群など歴史・文化スポットも豊富です。松葉がにや二十世紀梨など地元グルメも自慢で、温泉や自然、人の温かさ、鉄道・空港などの交通アクセスも良好な住環境が魅力です
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">鳥取県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：中国地方／約3,507平方km</li>
                <li>主な地形：大山や中国山地の山地、鳥取平野、日本海に面した海岸線、鳥取砂丘、浦富海岸</li>
                <li>気候区分：日本海側気候（冬は曇天・雨や雪が多い）、一部内陸性気候</li>
                <li>平均気温・降水量：春（13℃・120mm）、夏（25℃・180mm）、秋（16℃・140mm）、冬（5℃・110mm）※鳥取市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約540,000人（2025年推計）</li>
                <li>人口密度：約154人／km²</li>
                <li>中心都市：鳥取市（人口約180,000人、県庁所在地で行政・経済・文化の中心、鳥取砂丘や城跡、温泉地など観光資源も豊富）</li>
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
              <option value="https://www.city.tottori.lg.jp/">鳥取市</option>
<option value="https://www.city.yonago.lg.jp/">米子市</option>
<option value="https://www.city.kurayoshi.lg.jp/">倉吉市</option>
<option value="https://www.city.sakaiminato.lg.jp/">境港市</option>
<option value="https://www.town.iwami.tottori.jp/">岩美町</option>
<option value="https://www.town.wakasa.tottori.jp/">若桜町</option>
<option value="https://www.town.chizu.tottori.jp/">智頭町</option>
<option value="https://www.town.yazu.tottori.jp/">八頭町</option>
<option value="https://www.town.misasa.tottori.jp/">三朝町</option>
<option value="https://www.town.yurihama.tottori.jp/">湯梨浜町</option>
<option value="https://www.town.kotoura.tottori.jp/">琴浦町</option>
<option value="https://www.town.hokuei.tottori.jp/">北栄町</option>
<option value="https://www.town.daisen.tottori.jp/">大山町</option>
<option value="https://www.town.hiezu.tottori.jp/">日吉津村</option>
<option value="https://www.town.nanbu.tottori.jp/">南部町</option>
<option value="https://www.town.houki.tottori.jp/">伯耆町</option>
<option value="https://www.town.hino.tottori.jp/">日南町</option>
<option value="https://www.town.nichinan.tottori.jp/">日野町</option>
<option value="https://www.town.kofu.tottori.jp/">江府町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={tottori.src}
              alt="鳥取県市区町村マップ"
              useMap="#tottorimap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="tottorimap">
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