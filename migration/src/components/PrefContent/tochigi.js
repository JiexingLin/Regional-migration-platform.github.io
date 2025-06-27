import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import tochigi from "@/global/img/tochigi.png";

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
          <h1 className="hero__title">栃木県の魅力</h1>
          <p className="hero__lead">
            栃木県は世界遺産・日光東照宮や中禅寺湖、華厳の滝、那須高原など自然と歴史が調和する名所が豊富で、あしかがフラワーパークや伝統的な祭りも魅力です。宇都宮餃子やいちごなど地元グルメも充実し、温泉地や人の温かさ、首都圏からの良好な交通アクセスが住みやすさを支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">栃木県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：関東地方／約6,408平方km</li>
                <li>主な地形：日光連山・那須連山などの山地、関東平野北部、鬼怒川や那珂川などの河川、海岸線はなし</li>
                <li>気候区分：太平洋側気候（内陸性で寒暖差が大きい）</li>
                <li>平均気温・降水量：春（13℃・110mm）、夏（25℃・180mm）、秋（16℃・120mm）、冬（3℃・30mm）※宇都宮市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,900,000人（2025年推計）</li>
                <li>人口密度：約297人／km²</li>
                <li>中心都市：宇都宮市（人口約510,000人、県庁所在地で行政・経済・文化の中心、餃子の街として有名で観光資源も多彩）</li>
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
              <option value="https://www.city.utsunomiya.tochigi.jp/">宇都宮市</option>
<option value="https://www.city.ashikaga.tochigi.jp/">足利市</option>
<option value="https://www.city.kanuma.tochigi.jp/">鹿沼市</option>
<option value="https://www.city.sano.lg.jp/">佐野市</option>
<option value="https://www.city.nikko.lg.jp/">日光市</option>
<option value="https://www.city.oyama.tochigi.jp/">小山市</option>
<option value="https://www.city.tochigi.lg.jp/">栃木市</option>
<option value="https://www.city.mooka.lg.jp/">真岡市</option>
<option value="https://www.city.otawara.tochigi.jp/">大田原市</option>
<option value="https://www.city.yaita.tochigi.jp/">矢板市</option>
<option value="https://www.city.nasukarasuyama.lg.jp/">那須烏山市</option>
<option value="https://www.city.nasushiobara.lg.jp/">那須塩原市</option>
<option value="https://www.city.shimotsuke.lg.jp/">下野市</option>
<option value="https://www.city.haga.tochigi.jp/">さくら市</option>
<option value="https://www.town.nishikata.tochigi.jp/">西方町</option>
<option value="https://www.town.kaminokawa.lg.jp/">上三川町</option>
<option value="https://www.town.mashiko.lg.jp/">益子町</option>
<option value="https://www.town.motegi.tochigi.jp/">茂木町</option>
<option value="https://www.town.ichikai.lg.jp/">市貝町</option>
<option value="https://www.town.haga.tochigi.jp/">芳賀町</option>
<option value="https://www.town.nakagawa.tochigi.jp/">那珂川町</option>
<option value="https://www.town.nasu.lg.jp/">那須町</option>
<option value="https://www.town.shioya.tochigi.jp/">塩谷町</option>
<option value="https://www.town.takanezawa.tochigi.jp/">高根沢町</option>
<option value="https://www.town.tsuga.tochigi.jp/">壬生町</option>
<option value="https://www.town.tochigi.tochigi.jp/">野木町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={tochigi.src}
              alt="栃木県市区町村マップ"
              useMap="#tochimap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="tochimap">
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