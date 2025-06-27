import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import kouchi from "@/global/img/kouchi.png";

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
          <h1 className="hero__title">高知県の魅力</h1>
          <p className="hero__lead">
            高知県は桂浜や四万十川、室戸岬など雄大な自然の絶景や高知城など歴史的名所が豊富で、よさこい祭りや土佐和紙など伝統文化も息づきます。カツオのたたきや土佐あかうし、トマトなど地元グルメ・特産品も多彩で、人の温かさと自然が調和し、交通アクセスも良好な住環境が魅力です
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">高知県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：四国地方／約7,104平方km</li>
                <li>主な地形：四国山地、平野部（高知平野）、太平洋に面した長い海岸線、四万十川など大河川</li>
                <li>気候区分：太平洋側気候（温暖多雨）</li>
                <li>平均気温・降水量：春（16℃・220mm）、夏（27℃・330mm）、秋（20℃・290mm）、冬（9℃・90mm）※高知市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約675,000人（2025年推計）</li>
                <li>人口密度：約95人／km²</li>
                <li>中心都市：高知市（人口約320,000人、県庁所在地で行政・経済・文化の中心、桂浜や高知城、ひろめ市場など観光資源が豊富）</li>
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
              <option value="https://www.city.kochi.kochi.jp/">高知市</option>
<option value="https://www.city.nankoku.lg.jp/">南国市</option>
<option value="https://www.city.sukumo.kochi.jp/">宿毛市</option>
<option value="https://www.city.tosa.lg.jp/">土佐市</option>
<option value="https://www.city.sakawa.kochi.jp/">須崎市</option>
<option value="https://www.city.kochi.kochi.jp/">室戸市</option>
<option value="https://www.city.kochi.kochi.jp/">安芸市</option>
<option value="https://www.city.shimanto.lg.jp/">四万十市</option>
<option value="https://www.city.tosashimizu.kochi.jp/">土佐清水市</option>
<option value="https://www.city.kochi.kochi.jp/">香南市</option>
<option value="https://www.city.konan.kochi.jp/">香美市</option>
<option value="https://www.town.tosa.kochi.jp/">土佐町</option>
<option value="https://www.town.ino.kochi.jp/">いの町</option>
<option value="https://www.town.niyodogawa.kochi.jp/">仁淀川町</option>
<option value="https://www.town.otoyo.kochi.jp/">大豊町</option>
<option value="https://www.town.motoyama.kochi.jp/">本山町</option>
<option value="https://www.town.okawa.kochi.jp/">大川村</option>
<option value="https://www.town.otsuki.kochi.jp/">大月町</option>
<option value="https://www.town.mihara.kochi.jp/">三原村</option>
<option value="https://www.town.tosashimizu.kochi.jp/">黒潮町</option>
<option value="https://www.town.kuroshio.lg.jp/">黒潮町</option>
<option value="https://www.town.geisei.kochi.jp/">芸西村</option>
<option value="https://www.town.kitagawa.kochi.jp/">北川村</option>
<option value="https://www.town.yasuda.kochi.jp/">安田町</option>
<option value="https://www.town.tano.kochi.jp/">田野町</option>
<option value="https://www.town.nahari.kochi.jp/">奈半利町</option>
<option value="https://www.town.tosa.kochi.jp/">東洋町</option>
<option value="https://www.town.muroto.kochi.jp/">馬路村</option>
<option value="https://www.town.umaji.lg.jp/">馬路村</option>
<option value="https://www.town.kami.kochi.jp/">安田町</option>
<option value="https://www.town.yusuhara.kochi.jp/">梼原町</option>
<option value="https://www.town.shimanto.lg.jp/">四万十町</option>
<option value="https://www.town.tsuno.kochi.jp/">津野町</option>
<option value="https://www.town.yusuhara.kochi.jp/">檮原町</option>
  
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={kouchi.src}
              alt="高知県市区町村マップ"
              useMap="#kouchimap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="kouchimap">
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