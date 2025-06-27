import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import hukui from "@/global/img/hukui.png";

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
          <h1 className="hero__title">福井県の魅力</h1>
          <p className="hero__lead">
            福井県は柱状節理の断崖絶壁が続く東尋坊や、歴史深い曹洞宗大本山の永平寺、日本のマチュピチュと称される越前大野城など、自然と歴史が融合した観光資源が豊富です。地元グルメの越前ガニや若狭牛も人気で、自然の美しさと人の温かさ、交通アクセスの良さが魅力の住環境を形成しています。
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
                <li>位置・面積：北陸地方／約4,190平方km</li>
                <li>主な地形：日本海に面した海岸線、山地（越前山地）、平野部</li>
                <li>気候区分：日本海側気候（冬季は積雪が多く寒冷）</li>
                <li>平均気温・降水量：春（10℃・110mm）、夏（24℃・150mm）、秋（16℃・140mm）、冬（2℃・180mm）※福井市の目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約76万人（2024年推計）</li>
                <li>人口密度：約181人／km²</li>
                <li>中心都市：福井市（人口約26万人、県庁所在地で行政・経済の中心、永平寺や恐竜博物館など観光資源が豊富）</li>
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
              <option value="https://www.city.fukui.lg.jp/">福井市</option>
<option value="https://www.city.tsuruga.lg.jp/">敦賀市</option>
<option value="https://www.city.obama.fukui.jp/">小浜市</option>
<option value="https://www.city.sabae.fukui.jp/">鯖江市</option>
<option value="https://www.city.awara.lg.jp/">あわら市</option>
<option value="https://www.city.echizen.lg.jp/">越前市</option>
<option value="https://www.city.sakai.fukui.jp/">坂井市</option>
<option value="https://www.city.ikeda.fukui.jp/">池田町</option>
<option value="https://www.town.takahama.fukui.jp/">高浜町</option>
<option value="https://www.town.ohi.fukui.jp/">おおい町</option>
<option value="https://www.town.wakasa.fukui.jp/">若狭町</option>
<option value="https://www.town.eiheiji.lg.jp/">永平寺町</option>
<option value="https://www.town.katsuyama.fukui.jp/">勝山市</option>
<option value="https://www.town.minamiechizen.lg.jp/">南越前町</option>
<option value="https://www.town.echizen.fukui.jp/">越前町</option>
<option value="https://www.town.mihama.fukui.jp/">美浜町</option>
<option value="https://www.town.tsuruga.fukui.jp/">敦賀町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={hukui.src}
              alt="福井県市区町村マップ"
              useMap="#hukuimap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="hukuiimap">
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