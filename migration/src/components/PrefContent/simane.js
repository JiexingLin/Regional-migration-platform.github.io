import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import simane from "@/global/img/simane.png";

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
          <h1 className="hero__title">島根県の魅力</h1>
          <p className="hero__lead">
            島根県は縁結びの聖地・出雲大社や世界遺産の石見銀山、国宝・松江城、夕日が美しい宍道湖など多彩な絶景・名所が点在します。神楽や安来節など伝統芸能、和菓子や出雲そば、海産物など特産品も豊富。美肌の湯・玉造温泉や人の温かさ、交通アクセスの良さも住みやすさの魅力です
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">島根県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：中国地方／約6,708平方km</li>
                <li>主な地形：中国山地、出雲平野、宍道湖、日本海に面した海岸線、隠岐諸島などの離島</li>
                <li>気候区分：日本海側気候（冬は曇天・雨や雪が多い）、一部内陸性気候</li>
                <li>平均気温・降水量：春（13℃・120mm）、夏（25℃・180mm）、秋（16℃・150mm）、冬（5℃・110mm）※松江市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約650,000人（2025年推計）</li>
                <li>人口密度：約97人／km²</li>
                <li>中心都市：松江市（人口約195,000人、県庁所在地で行政・経済・文化の中心、松江城や宍道湖、和菓子文化が息づく水の都）</li>
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
              <option value="https://www.city.matsue.shimane.jp/">松江市</option>
<option value="https://www.city.izumo.shimane.jp/">出雲市</option>
<option value="https://www.city.hamada.shimane.jp/">浜田市</option>
<option value="https://www.city.masuda.lg.jp/">益田市</option>
<option value="https://www.city.unnan.shimane.jp/">雲南市</option>
<option value="https://www.city.gotsu.lg.jp/">江津市</option>
<option value="https://www.city.okuizumo.shimane.jp/">大田市</option>
<option value="https://www.city.tsuwano.lg.jp/">安来市</option>
<option value="https://www.town.yasugi.shimane.jp/">奥出雲町</option>
<option value="https://www.town.izumo.shimane.jp/">飯南町</option>
<option value="https://www.town.kawamoto.shimane.jp/">川本町</option>
<option value="https://www.town.misato.shimane.jp/">美郷町</option>
<option value="https://www.town.oonan.shimane.jp/">邑南町</option>
<option value="https://www.town.tsuwano.lg.jp/">津和野町</option>
<option value="https://www.town.yoshika.lg.jp/">吉賀町</option>
<option value="https://www.town.ama.shimane.jp/">海士町</option>
<option value="https://www.town.nishinoshima.shimane.jp/">西ノ島町</option>
<option value="https://www.town.chibu.shimane.jp/">知夫村</option>
<option value="https://www.town.okinoshima.shimane.jp/">隠岐の島町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={simane.src}
              alt="島根県市区町村マップ"
              useMap="#simanemap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="simanemap">
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