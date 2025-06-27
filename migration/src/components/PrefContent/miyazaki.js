import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import miyazaki from "@/global/img/miyazaki.png";

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
          <h1 className="hero__title">宮崎県の魅力</h1>
          <p className="hero__lead">
            宮崎県は高千穂峡や青島神社、日南海岸など神秘的な絶景スポットが点在し、ジャカランダまつりなど南国情緒あふれる祭りも魅力です。チキン南蛮やマンゴー、ごぼうチップスなど地元グルメも豊富で、温暖な気候と人の温かさ、空港や鉄道など交通アクセスの良さが住みやすさを支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">宮崎県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：九州地方／約7,735平方km</li>
                <li>主な地形：九州山地、日向灘に面した海岸線、宮崎平野、リアス式海岸の美しい海岸部</li>
                <li>気候区分：太平洋側気候（温暖・多雨）</li>
                <li>平均気温・降水量：春（16℃・180mm）、夏（27℃・320mm）、秋（21℃・230mm）、冬（9℃・70mm）※宮崎市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,040,000人（2025年推計）</li>
                <li>人口密度：約135人／km²</li>
                <li>中心都市：宮崎市（人口約395,000人、県庁所在地で行政・経済・文化の中心、高千穂峡や青島神社など観光資源が豊富）</li>
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
              <option value="https://www.city.miyazaki.miyazaki.jp/">宮崎市</option>
<option value="https://www.city.miyakonojo.miyazaki.jp/">都城市</option>
<option value="https://www.city.nobeoka.miyazaki.jp/">延岡市</option>
<option value="https://www.city.nichinan.lg.jp/">日南市</option>
<option value="https://www.city.hyuga.miyazaki.jp/">日向市</option>
<option value="https://www.city.kushima.lg.jp/">串間市</option>
<option value="https://www.city.saito.miyazaki.jp/">西都市</option>
<option value="https://www.city.ebino.miyazaki.jp/">えびの市</option>
<option value="https://www.city.kobayashi.lg.jp/">小林市</option>
<option value="https://www.town.kunitomi.miyazaki.jp/">国富町</option>
<option value="https://www.town.aya.miyazaki.jp/">綾町</option>
<option value="https://www.town.takaharu.lg.jp/">高原町</option>
<option value="https://www.town.shintomi.lg.jp/">新富町</option>
<option value="https://www.town.kawaminami.miyazaki.jp/">川南町</option>
<option value="https://www.town.tsuno.miyazaki.jp/">都農町</option>
<option value="https://www.town.kadogawa.miyazaki.jp/">門川町</option>
<option value="https://www.town.misato.miyazaki.jp/">美郷町</option>
<option value="https://www.town.takachiho.miyazaki.jp/">高千穂町</option>
<option value="https://www.town.hinokage.lg.jp/">日之影町</option>
<option value="https://www.town.gokase.miyazaki.jp/">五ヶ瀬町</option>
<option value="https://www.town.shima.miyazaki.jp/">諸塚村</option>
<option value="https://www.town.shiiba.miyazaki.jp/">椎葉村</option>
<option value="https://www.town.nogata.miyazaki.jp/">美郷町</option>
<option value="https://www.town.kitaura.lg.jp/">北浦町</option>
<option value="https://www.town.kitakawamura.lg.jp/">北方町</option>
<option value="https://www.town.tosho.miyazaki.jp/">高千穂町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={miyazaki.src}
              alt="宮崎県市区町村マップ"
              useMap="#miyazakimap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="miyazakimap">
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