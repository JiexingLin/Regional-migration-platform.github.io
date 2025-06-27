import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import wakayama from "@/global/img/wakayama.png";

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
          <h1 className="hero__title">和歌山県の魅力</h1>
          <p className="hero__lead">
            和歌山県は世界遺産の熊野古道や高野山、那智の滝、白浜温泉、潮岬など絶景や名所が多彩で、紀州徳川家ゆかりの和歌山城や伝統の祭りも魅力です。梅やみかん、マグロ、しらす丼など地元グルメも豊富。温暖な気候と人の温かさ、鉄道や高速道路で関西圏からのアクセスも良好な住環境です
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">和歌山県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：近畿地方／約4,725平方km</li>
                <li>主な地形：紀伊山地、和歌山平野、熊野灘・紀伊水道に面した海岸線、本州最南端の潮岬</li>
                <li>気候区分：太平洋側気候（温暖・多雨）</li>
                <li>平均気温・降水量：春（15℃・140mm）、夏（27℃・210mm）、秋（18℃・170mm）、冬（7℃・60mm）※和歌山市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約872,000人（2025年推計）</li>
                <li>人口密度：約185人／km²</li>
                <li>中心都市：和歌山市（人口約350,000人、県庁所在地で行政・経済・文化の中心、和歌山城やマリーナシティなど観光資源も豊富）</li>
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
              <option value="https://www.city.wakayama.wakayama.jp/">和歌山市</option>
<option value="https://www.city.shingu.lg.jp/">新宮市</option>
<option value="https://www.city.tanabe.lg.jp/">田辺市</option>
<option value="https://www.city.gobo.wakayama.jp/">御坊市</option>
<option value="https://www.city.hashimoto.lg.jp/">橋本市</option>
<option value="https://www.city.arida.lg.jp/">有田市</option>
<option value="https://www.city.kinokawa.lg.jp/">紀の川市</option>
<option value="https://www.city.iwade.lg.jp/">岩出市</option>
<option value="https://www.city.kainan.lg.jp/">海南市</option>
<option value="https://www.town.katsuragi.wakayama.jp/">かつらぎ町</option>
<option value="https://www.town.kudoyama.wakayama.jp/">九度山町</option>
<option value="https://www.town.kooya.wakayama.jp/">高野町</option>
<option value="https://www.town.yuasa.lg.jp/">湯浅町</option>
<option value="https://www.town.hirogawa.wakayama.jp/">広川町</option>
<option value="https://www.town.aridagawa.lg.jp/">有田川町</option>
<option value="https://www.town.mihama.wakayama.jp/">美浜町</option>
<option value="https://www.town.hidakagawa.lg.jp/">日高川町</option>
<option value="https://www.town.yura.wakayama.jp/">由良町</option>
<option value="https://www.town.hidaka.wakayama.jp/">日高町</option>
<option value="https://www.town.inami.wakayama.jp/">印南町</option>
<option value="https://www.town.minabe.lg.jp/">みなべ町</option>
<option value="https://www.town.kamitonda.lg.jp/">上富田町</option>
<option value="https://www.town.shirahama.lg.jp/">白浜町</option>
<option value="https://www.town.susami.lg.jp/">すさみ町</option>
<option value="https://www.town.kozagawa.wakayama.jp/">古座川町</option>
<option value="https://www.town.kushimoto.lg.jp/">串本町</option>
<option value="https://www.town.taiji.lg.jp/">太地町</option>
<option value="https://www.town.nachikatsuura.lg.jp/">那智勝浦町</option>
<option value="https://www.town.kamitonda.lg.jp/">北山村</option>
<option value="https://www.town.koza.wakayama.jp/">上北山村</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={wakayama.src}
              alt="和歌山県市区町村マップ"
              useMap="#wakayamamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="wakayamamap">
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