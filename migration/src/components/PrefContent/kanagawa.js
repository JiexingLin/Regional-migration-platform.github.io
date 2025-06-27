import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import kanagawa from "@/global/img/kanagawa.png";

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
          <h1 className="hero__title">神奈川県の魅力</h1>
          <p className="hero__lead">
            神奈川県は横浜の夜景やみなとみらい、鎌倉の歴史ある寺社、江の島や箱根の絶景など多彩な観光資源が揃い、祭りや伝統文化も豊かです。生しらす丼やサンマーメン、小田原かまぼこなど地元グルメも充実し、温暖な気候と人の温かさ、首都圏への抜群の交通アクセスが住みやすさを支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">北海道の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：関東地方／約2,416平方km</li>
                <li>主な地形：丹沢山地、相模平野、三浦半島、相模湾・東京湾に面した海岸線</li>
                <li>気候区分：太平洋側気候（温暖で降水量はやや多め）</li>
                <li>平均気温・降水量：春（14℃・140mm）、夏（26℃・180mm）、秋（18℃・170mm）、冬（7℃・60mm）※横浜市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約9,226,000人（2025年推計）</li>
                <li>人口密度：約3,820人／km²</li>
                <li>中心都市：横浜市（人口約3,780,000人、県庁所在地で国際港湾都市、観光・経済・文化の中心、みなとみらいや中華街など観光資源が豊富）</li>
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
              <option value="https://www.city.yokohama.lg.jp/">横浜市</option>
<option value="https://www.city.kawasaki.jp/">川崎市</option>
<option value="https://www.city.sagamihara.kanagawa.jp/">相模原市</option>
<option value="https://www.city.yokosuka.kanagawa.jp/">横須賀市</option>
<option value="https://www.city.hiratsuka.kanagawa.jp/">平塚市</option>
<option value="https://www.city.kamakura.kanagawa.jp/">鎌倉市</option>
<option value="https://www.city.fujisawa.kanagawa.jp/">藤沢市</option>
<option value="https://www.city.odawara.kanagawa.jp/">小田原市</option>
<option value="https://www.city.chigasaki.kanagawa.jp/">茅ヶ崎市</option>
<option value="https://www.city.zushi.kanagawa.jp/">逗子市</option>
<option value="https://www.city.miura.kanagawa.jp/">三浦市</option>
<option value="https://www.city.atsugi.kanagawa.jp/">厚木市</option>
<option value="https://www.city.yamato.lg.jp/">大和市</option>
<option value="https://www.city.isehara.kanagawa.jp/">伊勢原市</option>
<option value="https://www.city.ebina.kanagawa.jp/">海老名市</option>
<option value="https://www.city.zama.kanagawa.jp/">座間市</option>
<option value="https://www.city.minamiashigara.kanagawa.jp/">南足柄市</option>
<option value="https://www.city.ayase.kanagawa.jp/">綾瀬市</option>
<option value="https://www.town.hadano.kanagawa.jp/">秦野市</option>
<option value="https://www.town.sagamihara.kanagawa.jp/">愛川町</option>
<option value="https://www.town.atsugi.kanagawa.jp/">清川村</option>
<option value="https://www.town.kaisei.kanagawa.jp/">開成町</option>
<option value="https://www.town.matsuda.kanagawa.jp/">松田町</option>
<option value="https://www.town.yamakita.kanagawa.jp/">山北町</option>
<option value="https://www.town.nakai.kanagawa.jp/">中井町</option>
<option value="https://www.town.oi.kanagawa.jp/">大井町</option>
<option value="https://www.town.minamiashigara.kanagawa.jp/">南足柄町</option>
<option value="https://www.town.oshima.kanagawa.jp/">大磯町</option>
<option value="https://www.town.ninomiya.kanagawa.jp/">二宮町</option>
<option value="https://www.town.hakone.kanagawa.jp/">箱根町</option>
<option value="https://www.town.manazuru.kanagawa.jp/">真鶴町</option>
<option value="https://www.town.yugawara.kanagawa.jp/">湯河原町</option>
<option value="https://www.town.samukawa.kanagawa.jp/">寒川町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={kanagawa.src}
              alt="神奈川県市区町村マップ"
              useMap="#kanagawamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="kanagawamap">
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