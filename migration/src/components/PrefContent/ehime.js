import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import ehime from "@/global/img/ehime.png";

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
            <h1 className="hero__title">愛媛県の魅力</h1>
            <p className="hero__lead">
              愛媛県は日本最古の湯「道後温泉」や国宝松山城、しまなみ海道など多彩な観光名所・絶景スポットが点在し、伝統文化や祭りも豊かです。みかんや瀬戸内の海産物、今治タオルなど特産品も魅力で、温暖な気候と人の温かさ、松山を中心としたアクセス良好な住環境が特徴です
            </p>
            <a href="#overview" className="hero__button">詳しく見る</a>
          </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">愛媛県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：四国地方／約5,676平方km</li>
                <li>主な地形：石鎚山や四国カルストなどの山地、道後平野、瀬戸内海・宇和海に面した長い海岸線</li>
                <li>気候区分：瀬戸内式気候（温暖少雨）、一部太平洋側気候（南予地域）</li>
                <li>平均気温・降水量：春（14℃・110mm）、夏（26℃・170mm）、秋（18℃・160mm）、冬（6℃・80mm）※松山市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,323,000人（2024年推計）</li>
                <li>人口密度：約233人／km²</li>
                <li>中心都市：松山市（人口約506,000人、県庁所在地で観光・文化・経済の中心、松山城や道後温泉など観光資源が豊富）</li>
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
              {/* 愛媛県 市区町村リスト */}
              <option value="https://www.city.matsuyama.ehime.jp/">松山市</option>
<option value="https://www.city.imabari.ehime.jp/">今治市</option>
<option value="https://www.city.uwajima.ehime.jp/">宇和島市</option>
<option value="https://www.city.yawatahama.ehime.jp/">八幡浜市</option>
<option value="https://www.city.saijo.ehime.jp/">西条市</option>
<option value="https://www.city.ozu.ehime.jp/">大洲市</option>
<option value="https://www.city.niihama.lg.jp/">新居浜市</option>
<option value="https://www.city.seiyo.ehime.jp/">西予市</option>
<option value="https://www.city.toon.ehime.jp/">東温市</option>
<option value="https://www.city.shikokuchuo.ehime.jp/">四国中央市</option>
<option value="https://www.city.iyo.lg.jp/">伊予市</option>
<option value="https://www.town.kumakogen.ehime.jp/">久万高原町</option>
<option value="https://www.town.masaki.ehime.jp/">松前町</option>
<option value="https://www.town.tobe.ehime.jp/">砥部町</option>
<option value="https://www.town.kihoku.ehime.jp/">鬼北町</option>
<option value="https://www.town.matsuno.ehime.jp/">松野町</option>
<option value="https://www.town.uwajima.ehime.jp/">愛南町</option>
<option value="https://www.town.ikamicho.ehime.jp/">伊方町</option>
<option value="https://www.town.uwa.ehime.jp/">内子町</option>
<option value="https://www.town.kamijima.lg.jp/">上島町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={aichi.src}
              alt="愛媛県市区町村マップ"
              useMap="#ehimeimap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="ehimeimap">
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