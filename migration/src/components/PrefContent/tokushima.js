import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import tokushima from "@/global/img/tokushima.png";

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
          <h1 className="hero__title">徳島の魅力</h1>
          <p className="hero__lead">
            徳島県は鳴門の渦潮や大塚国際美術館、眉山などの絶景・名所が豊富で、阿波おどりや阿波人形浄瑠璃など伝統文化も息づきます。すだちや鳴門金時、阿波尾鶏など地元グルメも多彩。自然と人の温かさ、四国・関西圏からの良好な交通アクセスが住みやすさを支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">徳島県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：四国地方／約4,146平方km</li>
                <li>主な地形：四国山地、吉野川流域の平野、紀伊水道・太平洋に面した海岸線</li>
                <li>気候区分：太平洋側気候（温暖・多雨）、一部内陸性気候（山間部）</li>
                <li>平均気温・降水量：春（15℃・120mm）、夏（27℃・180mm）、秋（18℃・130mm）、冬（7℃・50mm）※徳島市の都市部目安</li>
              </ul>
              
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約690,000人（2025年推計）</li>
                <li>人口密度：約166人／km²</li>
                <li>中心都市：徳島市（人口約250,000人、県庁所在地で行政・経済・文化の中心、阿波おどりや眉山、大塚国際美術館など観光資源が豊富）</li>
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
              <option value="https://www.city.tokushima.tokushima.jp/">徳島市</option>
<option value="https://www.city.naruto.tokushima.jp/">鳴門市</option>
<option value="https://www.city.komatsushima.tokushima.jp/">小松島市</option>
<option value="https://www.city.anan.tokushima.jp/">阿南市</option>
<option value="https://www.city.yoshinogawa.lg.jp/">吉野川市</option>
<option value="https://www.city.awa.lg.jp/">阿波市</option>
<option value="https://www.city.mima.lg.jp/">美馬市</option>
<option value="https://www.city.miyoshi.tokushima.jp/">三好市</option>
<option value="https://www.town.matsushige.tokushima.jp/">松茂町</option>
<option value="https://www.town.kitajima.lg.jp/">北島町</option>
<option value="https://www.town.aizumi.tokushima.jp/">藍住町</option>
<option value="https://www.town.itano.tokushima.jp/">板野町</option>
<option value="https://www.town.kamiita.lg.jp/">上板町</option>
<option value="https://www.town.kamiyama.lg.jp/">神山町</option>
<option value="https://www.town.ishii.lg.jp/">石井町</option>
<option value="https://www.town.kamiyama.lg.jp/">那賀町</option>
<option value="https://www.town.kamikatsu.lg.jp/">勝浦町</option>
<option value="https://www.town.katsuura.tokushima.jp/">上勝町</option>
<option value="https://www.town.minami.tokushima.jp/">美波町</option>
<option value="https://www.town.minami.tokushima.jp/">牟岐町</option>
<option value="https://www.town.kaifu.tokushima.jp/">海陽町</option>
<option value="https://www.town.tsurugi.tokushima.jp/">つるぎ町</option>
<option value="https://www.town.higashimiyoshi.lg.jp/">東みよし町</option>
<option value="https://www.vill.sanagochi.lg.jp/">佐那河内村</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={tokushima.src}
              alt="徳島県市区町村マップ"
              useMap="#tokushimamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="tokushimamap">
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