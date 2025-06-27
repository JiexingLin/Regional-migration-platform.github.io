import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import kyoto from "@/global/img/kyoto.png";

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
          <h1 className="hero__title">京都府の魅力</h1>
          <p className="hero__lead">
            京都府は清水寺や金閣寺、嵐山など世界遺産や歴史的名所が点在し、春の桜や秋の紅葉、冬の雪景色など四季折々の絶景が楽しめます。祇園祭や時代祭など伝統文化も息づき、京料理や宇治抹茶など地元グルメも豊富。自然と歴史、人の温かさ、交通アクセスの良さが住みやすさを支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">京都府の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：近畿地方／約4,613平方km</li>
                <li>主な地形：丹波山地、京都盆地、丹後半島、日本海に面した海岸線</li>
                <li>気候区分：太平洋側気候（南部）、日本海側気候（北部・丹後地方）</li>
                <li>平均気温・降水量：春（14℃・130mm）、夏（27℃・180mm）、秋（17℃・150mm）、冬（6℃・80mm）※京都市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約2,529,000人（2025年推計）</li>
                <li>人口密度：約548人／km²</li>
                <li>中心都市：京都市（人口約1,450,000人、県庁所在地で歴史・文化・観光の中心、世界遺産や伝統行事が豊富）</li>
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
              <option value="https://www.city.kyoto.lg.jp/">京都市</option>
<option value="https://www.city.fukuchiyama.lg.jp/">福知山市</option>
<option value="https://www.city.maizuru.kyoto.jp/">舞鶴市</option>
<option value="https://www.city.ayabe.lg.jp/">綾部市</option>
<option value="https://www.city.umezuru.kyoto.jp/">宇治市</option>
<option value="https://www.city.kameoka.kyoto.jp/">亀岡市</option>
<option value="https://www.city.miyazu.kyoto.jp/">宮津市</option>
<option value="https://www.city.muko.kyoto.jp/">向日市</option>
<option value="https://www.city.nagaokakyo.lg.jp/">長岡京市</option>
<option value="https://www.city.yawata.kyoto.jp/">八幡市</option>
<option value="https://www.city.joyo.kyoto.jp/">城陽市</option>
<option value="https://www.city.kyotanabe.lg.jp/">京田辺市</option>
<option value="https://www.city.kyotango.lg.jp/">京丹後市</option>
<option value="https://www.city.nantan.kyoto.jp/">南丹市</option>
<option value="https://www.city.kizugawa.lg.jp/">木津川市</option>
<option value="https://www.town.kumiyama.lg.jp/">久御山町</option>
<option value="https://www.town.ujitawara.kyoto.jp/">宇治田原町</option>
<option value="https://www.town.ide.kyoto.jp/">井手町</option>
<option value="https://www.town.wazuka.kyoto.jp/">和束町</option>
<option value="https://www.town.seika.kyoto.jp/">精華町</option>
<option value="https://www.town.kasagi.lg.jp/">笠置町</option>
<option value="https://www.town.minamiyamashiro.lg.jp/">南山城村</option>
<option value="https://www.town.kyotamba.kyoto.jp/">京丹波町</option>
<option value="https://www.town.yosano.lg.jp/">与謝野町</option>
<option value="https://www.town.ine.kyoto.jp/">伊根町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={kyoto.src}
              alt="京都府市区町村マップ"
              useMap="#kyotomap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="kyotomap">
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