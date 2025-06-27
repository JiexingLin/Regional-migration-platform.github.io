import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import toyama from "@/global/img/toyama.png";

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
          <h1 className="hero__title">富山県の魅力</h1>
          <p className="hero__lead">
            富山県は立山黒部アルペンルートや黒部ダム、雨晴海岸、五箇山合掌造り集落などの絶景や歴史的名所が豊富です。高岡大仏や瑞龍寺、富山まつりなど伝統文化も息づき、ホタルイカや白えび、ますの寿しなど地元グルメも多彩。自然と都市が調和し、人の温かさや北陸新幹線など交通アクセスの良さも魅力です
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">富山県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：中部地方／約4,248平方km</li>
                <li>主な地形：立山連峰・飛騨山脈などの山地、富山平野、富山湾沿いの海岸線</li>
                <li>気候区分：日本海側気候（冬は雪が多く、夏は高温多湿）</li>
                <li>平均気温・降水量：春（12℃・130mm）、夏（25℃・210mm）、秋（16℃・170mm）、冬（4℃・230mm）※富山市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,010,000人（2025年推計）</li>
                <li>人口密度：約238人／km²</li>
                <li>中心都市：富山市（人口約410,000人、県庁所在地で行政・経済・文化の中心、富山城址公園やガラス美術館、松川遊覧船など観光資源も豊富）</li>
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
              <option value="https://www.city.toyama.lg.jp/">富山市</option>
<option value="https://www.city.takaoka.toyama.jp/">高岡市</option>
<option value="https://www.city.iminami.toyama.jp/">魚津市</option>
<option value="https://www.city.namerikawa.toyama.jp/">滑川市</option>
<option value="https://www.city.himi.toyama.jp/">氷見市</option>
<option value="https://www.city.nyuzen.toyama.jp/">黒部市</option>
<option value="https://www.city.nanto.toyama.jp/">砺波市</option>
<option value="https://www.city.tonami.toyama.jp/">小矢部市</option>
<option value="https://www.city.oyabe.toyama.jp/">南砺市</option>
<option value="https://www.city.kurobe.toyama.jp/">射水市</option>
<option value="https://www.town.nyuzen.toyama.jp/">舟橋村</option>
<option value="https://www.town.kamiichi.toyama.jp/">上市町</option>
<option value="https://www.town.tateyama.toyama.jp/">立山町</option>
<option value="https://www.town.yatsuo.toyama.jp/">入善町</option>
<option value="https://www.town.asahi.toyama.jp/">朝日町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={toyama.src}
              alt="富山県市区町村マップ"
              useMap="#toyamamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="toyamamap">
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