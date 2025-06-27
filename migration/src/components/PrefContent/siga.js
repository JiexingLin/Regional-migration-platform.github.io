import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import siga from "@/global/img/siga.png";

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
          <h1 className="hero__title">滋賀県の魅力</h1>
          <p className="hero__lead">
            滋賀県は日本一の琵琶湖や国宝・彦根城、比叡山延暦寺、竹生島、メタセコイア並木など絶景・名所が点在し、長浜曳山祭りや天野川ほたるまつりなど伝統文化も豊かです。近江牛や湖魚の佃煮、鮒寿司など地元グルメも多彩で、自然と人の温かさ、関西圏からの良好な交通アクセスが住みやすさを支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">滋賀県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：近畿地方／約4,017平方km</li>
                <li>主な地形：琵琶湖、比良山地・鈴鹿山脈・比叡山などの山地、近江平野、湖岸</li>
                <li>気候区分：日本海側気候（北部は降雪多い）、太平洋側気候（南部は比較的温暖）</li>
                <li>平均気温・降水量：春（13℃・120mm）、夏（26℃・180mm）、秋（17℃・130mm）、冬（5℃・70mm）※大津市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,390,000人（2025年推計）</li>
                <li>人口密度：約346人／km²</li>
                <li>中心都市：大津市（人口約340,000人、県庁所在地で行政・経済・文化の中心、琵琶湖や比叡山、歴史遺産・観光資源が豊富）</li>
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
              <option value="https://www.city.otsu.lg.jp/">大津市</option>
<option value="https://www.city.hikone.lg.jp/">彦根市</option>
<option value="https://www.city.nagahama.lg.jp/">長浜市</option>
<option value="https://www.city.omihachiman.lg.jp/">近江八幡市</option>
<option value="https://www.city.kusatsu.shiga.jp/">草津市</option>
<option value="https://www.city.moriyama.lg.jp/">守山市</option>
<option value="https://www.city.ritto.lg.jp/">栗東市</option>
<option value="https://www.city.koka.lg.jp/">甲賀市</option>
<option value="https://www.city.yasu.lg.jp/">野洲市</option>
<option value="https://www.city.konan.shiga.jp/">湖南市</option>
<option value="https://www.city.takashima.lg.jp/">高島市</option>
<option value="https://www.city.higashiomi.shiga.jp/">東近江市</option>
<option value="https://www.city.maibara.lg.jp/">米原市</option>
<option value="https://www.town.ryuoh.shiga.jp/">竜王町</option>
<option value="https://www.town.aisho.shiga.jp/">愛荘町</option>
<option value="https://www.town.toyosato.shiga.jp/">豊郷町</option>
<option value="https://www.town.koura.shiga.jp/">甲良町</option>
<option value="https://www.town.taga.lg.jp/">多賀町</option>
<option value="https://www.town.hino.lg.jp/">日野町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={siga.src}
              alt="滋賀県市区町村マップ"
              useMap="#sigamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="sigamap">
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