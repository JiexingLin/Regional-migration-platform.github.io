import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import mie from "@/global/img/mie.png";

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
          <h1 className="hero__title">三重県の魅力</h1>
          <p className="hero__lead">
            三重県は伊勢神宮や熊野古道、鳥羽水族館、志摩スペイン村など名所・絶景が豊富で、伝統的な祭りや文化も息づいています。松阪牛や伊勢エビ、あおさ、赤福餅など地元グルメ・特産品も多彩で、温暖な気候と人の温かさ、近畿・中部圏からの交通アクセスの良さが住みやすい環境を支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">三重県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：近畿地方／約5,774平方km</li>
                <li>主な地形：鈴鹿山脈・紀伊山地などの山地、伊勢平野、リアス式海岸の志摩・鳥羽、伊勢湾・熊野灘に面した長い海岸線</li>
                <li>気候区分：太平洋側気候（温暖多雨）、一部内陸性気候（山間部）</li>
                <li>平均気温・降水量：春（14℃・140mm）、夏（26℃・210mm）、秋（17℃・180mm）、冬（6℃・70mm）※津市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,726,000人（2025年推計）</li>
                <li>人口密度：約299人／km²</li>
                <li>中心都市：津市（人口約274,000人、県庁所在地で行政・経済の中心、津城跡や三重県立美術館など観光資源が豊富）</li>
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
              <option value="https://www.city.tsu.mie.jp/">津市</option>
<option value="https://www.city.yokkaichi.lg.jp/">四日市市</option>
<option value="https://www.city.suzuka.lg.jp/">鈴鹿市</option>
<option value="https://www.city.matsusaka.mie.jp/">松阪市</option>
<option value="https://www.city.ise.mie.jp/">伊勢市</option>
<option value="https://www.city.kuwana.lg.jp/">桑名市</option>
<option value="https://www.city.iga.lg.jp/">伊賀市</option>
<option value="https://www.city.kameyama.mie.jp/">亀山市</option>
<option value="https://www.city.inabe.mie.jp/">いなべ市</option>
<option value="https://www.city.shima.mie.jp/">志摩市</option>
<option value="https://www.city.toba.mie.jp/">鳥羽市</option>
<option value="https://www.city.kumano.mie.jp/">熊野市</option>
<option value="https://www.city.owase.lg.jp/">尾鷲市</option>
<option value="https://www.city.kisosaki.lg.jp/">名張市</option>
<option value="https://www.town.asahi.mie.jp/">朝日町</option>
<option value="https://www.town.kawagoe.mie.jp/">川越町</option>
<option value="https://www.town.kisosaki.lg.jp/">木曽岬町</option>
<option value="https://www.town.toin.lg.jp/">東員町</option>
<option value="https://www.town.komono.mie.jp/">菰野町</option>
<option value="https://www.town.tobishima.mie.jp/">多気町</option>
<option value="https://www.town.meiwa.mie.jp/">明和町</option>
<option value="https://www.town.taki.lg.jp/">大台町</option>
<option value="https://www.town.odaicho.com/">大紀町</option>
<option value="https://www.town.minamiise.lg.jp/">南伊勢町</option>
<option value="https://www.town.watarai.lg.jp/">度会町</option>
<option value="https://www.town.tamaki.lg.jp/">玉城町</option>
<option value="https://www.town.taiki.lg.jp/">大台町</option>
<option value="https://www.town.kihoku.lg.jp/">紀北町</option>
<option value="https://www.town.mihama.lg.jp/">御浜町</option>
<option value="https://www.town.kiho.lg.jp/">紀宝町</option>
<option value="https://www.vill.kiho.lg.jp/">紀宝村</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={mie.src}
              alt="三重県市区町村マップ"
              useMap="#miemap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="miemap">
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