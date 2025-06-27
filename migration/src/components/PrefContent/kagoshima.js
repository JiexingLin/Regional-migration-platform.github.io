import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import kagoshima from "@/global/img/kagoshima.png";

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
          <h1 className="hero__title">鹿児島県の魅力</h1>
          <p className="hero__lead">
            鹿児島県は桜島や霧島連山、池田湖など雄大な自然景観と絶景スポットが点在し、伝統的な大島紬や薩摩切子、さつま揚げや黒豚、焼酎など多彩な特産品も魅力です。温暖な気候と人の温かさ、島々を結ぶ交通アクセスの良さが快適な住環境を支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">鹿児島県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：九州地方／約9,187平方km</li>
                <li>主な地形：桜島や霧島山系などの火山、シラス台地、薩摩・大隅半島、長い海岸線、多数の離島（屋久島・奄美大島など）</li>
                <li>気候区分：太平洋側気候（温暖・多雨）、一部亜熱帯気候（南西諸島）</li>
                <li>平均気温・降水量：春（17℃・200mm）、夏（27℃・350mm）、秋（21℃・250mm）、冬（10℃・90mm）※鹿児島市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,531,000人（2025年推計）</li>
                <li>人口密度：約167人／km²</li>
                <li>中心都市：鹿児島市（人口約590,000人、県庁所在地で行政・経済・文化の中心、桜島や仙厳園、天文館など観光資源が豊富）</li>
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
              <option value="https://www.city.kagoshima.lg.jp/">鹿児島市</option>
<option value="https://www.city.kirishima.kagoshima.jp/">霧島市</option>
<option value="https://www.city.kanoya.lg.jp/">鹿屋市</option>
<option value="https://www.city.satsumasendai.lg.jp/">薩摩川内市</option>
<option value="https://www.city.izumi.kagoshima.jp/">出水市</option>
<option value="https://www.city.iukikagoshima.lg.jp/">伊佐市</option>
<option value="https://www.city.iwanuma.kagoshima.jp/">いちき串木野市</option>
<option value="https://www.city.aira.lg.jp/">姶良市</option>
<option value="https://www.city.hioki.kagoshima.jp/">日置市</option>
<option value="https://www.city.minamisatsuma.lg.jp/">南さつま市</option>
<option value="https://www.city.minamikyushu.lg.jp/">南九州市</option>
<option value="https://www.city.soo.kagoshima.jp/">曽於市</option>
<option value="https://www.city.akune.kagoshima.jp/">阿久根市</option>
<option value="https://www.city.tarumizu.lg.jp/">垂水市</option>
<option value="https://www.city.shibushi.lg.jp/">志布志市</option>
<option value="https://www.city.nishinoomote.lg.jp/">西之表市</option>
<option value="https://www.city.makurazaki.lg.jp/">枕崎市</option>
<option value="https://www.city.kagoshima-ichiki.lg.jp/">指宿市</option>
<option value="https://www.city.kagoshima-ichiki.lg.jp/">指宿市</option>
<option value="https://www.town.satsuma.kagoshima.jp/">さつま町</option>
<option value="https://www.town.nagashima.lg.jp/">長島町</option>
<option value="https://www.town.yusui.kagoshima.jp/">湧水町</option>
<option value="https://www.town.osaki.kagoshima.jp/">大崎町</option>
<option value="https://www.town.higashikushira.lg.jp/">東串良町</option>
<option value="https://www.town.kinko.lg.jp/">錦江町</option>
<option value="https://www.town.minamiosumi.lg.jp/">南大隅町</option>
<option value="https://www.town.kanoya.kagoshima.jp/">肝付町</option>
<option value="https://www.town.nakatane.kagoshima.jp/">中種子町</option>
<option value="https://www.town.minamitane.kagoshima.jp/">南種子町</option>
<option value="https://www.town.yakushima.kagoshima.jp/">屋久島町</option>
<option value="https://www.town.mishima.kagoshima.jp/">三島村</option>
<option value="https://www.town.toshima.kagoshima.jp/">十島村</option>
<option value="https://www.town.isehara.kagoshima.jp/">伊仙町</option>
<option value="https://www.town.tatsugo.kagoshima.jp/">龍郷町</option>
<option value="https://www.town.setouchi.lg.jp/">瀬戸内町</option>
<option value="https://www.town.uenohara.kagoshima.jp/">宇検村</option>
<option value="https://www.town.yoron.lg.jp/">与論町</option>
<option value="https://www.town.amakusa.kagoshima.jp/">天城町</option>
<option value="https://www.town.tokunoshima.lg.jp/">徳之島町</option>
<option value="https://www.town.isen.kagoshima.jp/">伊仙町</option>
<option value="https://www.town.wadomari.kagoshima.jp/">和泊町</option>
<option value="https://www.town.china.lg.jp/">知名町</option>
<option value="https://www.town.yoron.lg.jp/">与論町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={kagoshima.src}
              alt="鹿児島県市区町村マップ"
              useMap="#kagoshimamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="kagoshimamap">
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