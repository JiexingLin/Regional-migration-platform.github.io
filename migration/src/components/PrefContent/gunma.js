import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import gunma from "@/global/img/gunma.png";

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
          <h1 className="hero__title">群馬県の魅力</h1>
          <p className="hero__lead">
            群馬県は草津温泉や伊香保温泉、世界遺産「富岡製糸場」など多彩な観光名所と、四季折々の絶景が自慢です。水沢うどんやこんにゃくなどの地元グルメ・特産品も豊富で、伝統文化や祭りも盛ん。自然と人情に恵まれ、関東圏からの交通アクセスも良好な住みやすい環境が魅力です
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">群馬県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：関東地方／約6,362平方km</li>
                <li>主な地形：赤城山・榛名山・妙義山などの山地、利根川流域の平野、温泉地や渓谷が点在</li>
                <li>気候区分：内陸性気候（寒暖差大）、一部太平洋側気候（南東部）</li>
                <li>平均気温・降水量：春（13℃・130mm）、夏（25℃・180mm）、秋（17℃・170mm）、冬（4℃・80mm）※前橋市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,930,000人（2024年推計）</li>
                <li>人口密度：約303人／km²</li>
                <li>中心都市：前橋市（人口約332,000人、県庁所在地で行政・経済の中心、赤城南面千本桜など自然と都市機能が調和）</li>
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
              <option value="https://www.city.maebashi.gunma.jp/">前橋市</option>
<option value="https://www.city.takasaki.gunma.jp/">高崎市</option>
<option value="https://www.city.kiryu.lg.jp/">桐生市</option>
<option value="https://www.city.isesaki.lg.jp/">伊勢崎市</option>
<option value="https://www.city.otone.or.jp/">太田市</option>
<option value="https://www.city.numata.gunma.jp/">沼田市</option>
<option value="https://www.city.annaka.lg.jp/">安中市</option>
<option value="https://www.city.shibukawa.lg.jp/">渋川市</option>
<option value="https://www.city.tatebayashi.gunma.jp/">館林市</option>
<option value="https://www.city.fujioka.gunma.jp/">藤岡市</option>
<option value="https://www.city.tomigiwa.gunma.jp/">富岡市</option>
<option value="https://www.city.midori.gunma.jp/">みどり市</option>
<option value="https://www.town.yoshioka.gunma.jp/">吉岡町</option>
<option value="https://www.town.shintomi.gunma.jp/">榛東村</option>
<option value="https://www.town.tamamura.gunma.jp/">玉村町</option>
<option value="https://www.town.kanra.gunma.jp/">甘楽町</option>
<option value="https://www.town.kanna.gunma.jp/">神流町</option>
<option value="https://www.town.ueshima.gunma.jp/">上野村</option>
<option value="https://www.town.shimonita.lg.jp/">下仁田町</option>
<option value="https://www.town.nanmoku.gunma.jp/">南牧村</option>
<option value="https://www.town.usui.gunma.jp/">南牧村</option>
<option value="https://www.town.tsumagoi.gunma.jp/">嬬恋村</option>
<option value="https://www.town.naganohara.gunma.jp/">長野原町</option>
<option value="https://www.town.kusatsu.gunma.jp/">草津町</option>
<option value="https://www.town.takayama.gunma.jp/">高山村</option>
<option value="https://www.town.higashiagatsuma.gunma.jp/">東吾妻町</option>
<option value="https://www.town.katashina.gunma.jp/">片品村</option>
<option value="https://www.town.kawaba.gunma.jp/">川場村</option>
<option value="https://www.town.showa.gunma.jp/">昭和村</option>
<option value="https://www.town.minakami.gunma.jp/">みなかみ町</option>
<option value="https://www.town.itakura.gunma.jp/">板倉町</option>
<option value="https://www.town.meiwa.gunma.jp/">明和町</option>
<option value="https://www.town.chiyoda.gunma.jp/">千代田町</option>
<option value="https://www.town.ora.gunma.jp/">邑楽町</option>
<option value="https://www.town.oizumi.gunma.jp/">大泉町</option>

            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={gunma.src}
              alt="群馬県市区町村マップ"
              useMap="#gunmamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="gunmamap">
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