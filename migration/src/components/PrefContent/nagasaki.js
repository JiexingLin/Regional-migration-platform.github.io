import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import nagasaki from "@/global/img/nagasaki.png";

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
          <h1 className="hero__title">長崎県の魅力</h1>
          <p className="hero__lead">
            長崎県は世界遺産の軍艦島や大浦天主堂、グラバー園、夜景の美しい稲佐山など多彩な観光資源が揃い、異国情緒あふれる街並みや「長崎くんち」など伝統文化・祭りも魅力です。長崎ちゃんぽんやカステラ、海産物など地元グルメも豊富で、温暖な気候と人の温かさ、離島を含む交通ネットワークの発展が住みやすさを支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">長崎県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：九州地方／約4,132平方km</li>
                <li>主な地形：多島海（五島列島・壱岐・対馬など）、山地、リアス式海岸、平野部は少なめ</li>
                <li>気候区分：太平洋側気候（温暖・多雨）、一部日本海側気候の影響も受ける</li>
                <li>平均気温・降水量：春（15℃・160mm）、夏（27℃・320mm）、秋（20℃・210mm）、冬（8℃・80mm）※長崎市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,270,000人（2025年推計）</li>
                <li>人口密度：約307人／km²</li>
                <li>中心都市：長崎市（人口約390,000人、県庁所在地で歴史・文化・観光の中心、世界遺産や夜景スポットが豊富）</li>
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
              <option value="https://www.city.nagasaki.lg.jp/">長崎市</option>
<option value="https://www.city.sasebo.lg.jp/">佐世保市</option>
<option value="https://www.city.isahaya.nagasaki.jp/">諫早市</option>
<option value="https://www.city.omura.nagasaki.jp/">大村市</option>
<option value="https://www.city.shimabara.lg.jp/">島原市</option>
<option value="https://www.city.tsushima.nagasaki.jp/">対馬市</option>
<option value="https://www.city.goto.nagasaki.jp/">五島市</option>
<option value="https://www.city.matsuura.nagasaki.jp/">松浦市</option>
<option value="https://www.city.hirado.nagasaki.jp/">平戸市</option>
<option value="https://www.city.unzen.nagasaki.jp/">雲仙市</option>
<option value="https://www.city.iki.nagasaki.jp/">壱岐市</option>
<option value="https://www.city.saikai.nagasaki.jp/">西海市</option>
<option value="https://www.city.minamishimabara.lg.jp/">南島原市</option>
<option value="https://www.town.togitsu.nagasaki.jp/">時津町</option>
<option value="https://www.town.nagayo.nagasaki.jp/">長与町</option>
<option value="https://www.town.higashisonogi.lg.jp/">東彼杵町</option>
<option value="https://www.town.kawatana.nagasaki.jp/">川棚町</option>
<option value="https://www.town.hasami.lg.jp/">波佐見町</option>
<option value="https://www.town.shinkamigoto.nagasaki.jp/">新上五島町</option>
<option value="https://www.town.ojika.nagasaki.jp/">小値賀町</option>
<option value="https://www.town.saza.nagasaki.jp/">佐々町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={nagasaki.src}
              alt="長崎県市区町村マップ"
              useMap="#nagasakimap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="nagasakimap">
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