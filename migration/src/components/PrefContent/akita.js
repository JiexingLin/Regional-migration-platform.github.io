import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import akita from "@/global/img/akita.png";

export default function Akita() {
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
            <h1 className="hero__title">秋田県の魅力</h1>
            <p className="hero__lead">
              秋田県は田沢湖や角館武家屋敷、男鹿半島などの絶景と温泉地が点在し、なまはげや竿燈まつりなど伝統文化も豊富です。比内地鶏や稲庭うどん、ハタハタなど地元グルメも魅力で、自然と人情にあふれ、交通アクセスも整った住みやすい環境が広がります
            </p>
            <a href="#overview" className="hero__button">詳しく見る</a>
          </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
          <h2 className="overview__heading">愛知県の概要</h2>
          <div className="overview__grid">
            <div className="overview__box">
              <h3>地形・気候</h3>
              <ul>
                  <li>位置・面積：東北地方／11,637平方km</li>
                  <li>主な地形：奥羽山脈、白神山地、横手盆地、日本海沿岸、男鹿半島</li>
                  <li>気候区分：日本海側気候（冬季は積雪が多い）</li>
                  <li>平均気温・降水量：春（9.6℃・110mm）、夏（22.5℃・190mm）、秋（14.5℃・170mm）、冬（1.6℃・160mm）※秋田市平年値[13]</li>
                </ul>
            </div>
            <div className="overview__box">
              <h3>人口・中心都市</h3>
              <ul>
                  <li>総人口：約915,000人（2024年推計）</li>
                  <li>人口密度：約79人／km²</li>
                  <li>中心都市：秋田市（人口約298,000人、県庁所在地で行政・経済・文化の中心、竿燈まつりや秋田犬など観光資源が豊富）</li>
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
              {/* 秋田県 市区町村リスト */}
              <option value="https://www.city.akita.lg.jp/">秋田市</option>
              <option value="https://www.city.yokote.lg.jp/">横手市</option>
              <option value="https://www.city.oga.akita.jp/">男鹿市</option>
              <option value="https://www.city.yurihonjo.lg.jp/">由利本荘市</option>
              <option value="https://www.city.ozawa.akita.jp/">大館市</option>
              <option value="https://www.city.noshiro.lg.jp/">能代市</option>
              <option value="https://www.city.ogata.akita.jp/">潟上市</option>
              <option value="https://www.city.katakami.lg.jp/">潟上市</option>
              <option value="https://www.city.daisen.akita.jp/">大仙市</option>
              <option value="https://www.city.semboku.akita.jp/">仙北市</option>
              <option value="https://www.city.kazuno.akita.jp/">鹿角市</option>
              <option value="https://www.city.yuzawa.lg.jp/">湯沢市</option>
              <option value="https://www.city.kitaakita.akita.jp/">北秋田市</option>
              <option value="https://www.city.semboku.akita.jp/">仙北市</option>
              <option value="https://www.town.fujisato.akita.jp/">藤里町</option>
              <option value="https://www.town.mitane.akita.jp/">三種町</option>
              <option value="https://www.town.happou.akita.jp/">八峰町</option>
              <option value="https://www.town.gojome.akita.jp/">五城目町</option>
              <option value="https://www.town.hachirogata.akita.jp/">八郎潟町</option>
              <option value="https://www.town.ikawa.akita.jp/">井川町</option>
              <option value="https://www.town.ogata.akita.jp/">大潟村</option>
              <option value="https://www.town.misato.akita.jp/">美郷町</option>
              <option value="https://www.town.ujihara.akita.jp/">羽後町</option>
              <option value="https://www.town.higashinaruse.akita.jp/">東成瀬村</option>
              <option value="https://www.town.kosaka.akita.jp/">小坂町</option>
              <option value="https://www.town.kamikoani.akita.jp/">上小阿仁村</option>

            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={akita.src}
              alt="秋田県市区町村マップ"
              useMap="#akitamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="akitamap">
              {/* 地图区域可以在这里添加 <area> 标签 */}
              
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