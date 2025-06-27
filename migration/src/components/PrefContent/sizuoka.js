import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import sizuoka from "@/global/img/sizuoka.png";

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
          <h1 className="hero__title">静岡県の魅力</h1>
          <p className="hero__lead">
            静岡県は世界遺産の富士山や伊豆半島、浜名湖、日本平など絶景スポットが豊富で、久能山東照宮や伝統的な祭りも魅力です。お茶や桜えび、うなぎ、いちご、静岡おでんなど地元グルメも多彩。温暖な気候と人の温かさ、首都圏や中京圏からの交通アクセスの良さが住みやすさを支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">静岡県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：中部地方／約7,777平方km</li>
                <li>主な地形：富士山・南アルプスの山地、駿河湾・遠州灘に面した海岸線、伊豆半島、広大な平野部（静岡平野・浜松平野）</li>
                <li>気候区分：太平洋側気候（温暖・比較的少雨）、一部山間部は内陸性気候</li>
                <li>平均気温・降水量：春（15℃・120mm）、夏（27℃・180mm）、秋（18℃・140mm）、冬（7℃・50mm）※静岡市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約3,580,000人（2025年推計）</li>
                <li>人口密度：約460人／km²</li>
                <li>中心都市：静岡市（人口約680,000人、県庁所在地で行政・経済・文化の中心、久能山東照宮や日本平、静岡おでんなど観光・グルメも充実）</li>
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
              <option value="https://www.city.shizuoka.lg.jp/">静岡市</option>
<option value="https://www.city.hamamatsu.shizuoka.jp/">浜松市</option>
<option value="https://www.city.numazu.shizuoka.jp/">沼津市</option>
<option value="https://www.city.atami.lg.jp/">熱海市</option>
<option value="https://www.city.mishima.shizuoka.jp/">三島市</option>
<option value="https://www.city.fuji.shizuoka.jp/">富士市</option>
<option value="https://www.city.ito.shizuoka.jp/">伊東市</option>
<option value="https://www.city.shimada.shizuoka.jp/">島田市</option>
<option value="https://www.city.fujinomiya.lg.jp/">富士宮市</option>
<option value="https://www.city.iwata.shizuoka.jp/">磐田市</option>
<option value="https://www.city.yaizu.lg.jp/">焼津市</option>
<option value="https://www.city.kakegawa.shizuoka.jp/">掛川市</option>
<option value="https://www.city.fukuroi.shizuoka.jp/">袋井市</option>
<option value="https://www.city.gotenba.lg.jp/">御殿場市</option>
<option value="https://www.city.fujieda.shizuoka.jp/">藤枝市</option>
<option value="https://www.city.shimoda.shizuoka.jp/">下田市</option>
<option value="https://www.city.susono.shizuoka.jp/">裾野市</option>
<option value="https://www.city.makinohara.shizuoka.jp/">牧之原市</option>
<option value="https://www.city.omaezaki.shizuoka.jp/">御前崎市</option>
<option value="https://www.city.kosai.shizuoka.jp/">湖西市</option>
<option value="https://www.city.izu.shizuoka.jp/">伊豆市</option>
<option value="https://www.city.izunokuni.shizuoka.jp/">伊豆の国市</option>
<option value="https://www.city.higashiizu.shizuoka.jp/">東伊豆町</option>
<option value="https://www.town.kawazu.shizuoka.jp/">河津町</option>
<option value="https://www.town.minamiizu.shizuoka.jp/">南伊豆町</option>
<option value="https://www.town.matsuzaki.shizuoka.jp/">松崎町</option>
<option value="https://www.town.nishiizu.shizuoka.jp/">西伊豆町</option>
<option value="https://www.town.kannami.shizuoka.jp/">函南町</option>
<option value="https://www.town.shimizu.shizuoka.jp/">清水町</option>
<option value="https://www.town.nagaizumi.shizuoka.jp/">長泉町</option>
<option value="https://www.town.shimizu.shizuoka.jp/">小山町</option>
<option value="https://www.town.yoshida.shizuoka.jp/">吉田町</option>
<option value="https://www.town.kikugawa.shizuoka.jp/">川根本町</option>
<option value="https://www.town.morimachi-kikugawa.jp/">森町</option>
<option value="https://www.town.shimada.shizuoka.jp/">菊川市</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={sizuoka.src}
              alt="静岡県市区町村マップ"
              useMap="#sizuokamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="sizuokamap">
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