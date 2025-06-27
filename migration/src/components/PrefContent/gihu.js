import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import gihu from "@/global/img/gihu.png";

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
          <h1 className="hero__title">岐阜県の魅力</h1>
          <p className="hero__lead">
            岐阜県は白川郷合掌造り集落や岐阜城、モネの池など世界遺産や絶景スポットが豊富で、高山祭や郡上おどりなど伝統文化・祭りも盛んです。飛騨牛や朴葉味噌、美濃焼など多彩な地元グルメ・特産品があり、豊かな自然と人の温かさ、交通アクセスの良さが住みやすい環境を支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">岐阜県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：中部地方／約10,621平方km</li>
                <li>主な地形：飛騨山脈（北アルプス）、木曽山脈、濃尾平野、美濃三河高原、長良川など河川が豊富</li>
                <li>気候区分：内陸性気候（飛騨地域は寒暖差大）、太平洋側気候（美濃・尾張地域は温暖）</li>
                <li>平均気温・降水量：春（14℃・140mm）、夏（26℃・180mm）、秋（17℃・170mm）、冬（4℃・90mm）※岐阜市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,914,000人（2024年推計）</li>
                <li>人口密度：約180人／km²</li>
                <li>中心都市：岐阜市（人口約401,000人、県庁所在地で歴史・文化・経済の中心、岐阜城や長良川など観光資源が豊富）</li>
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
              <option value="https://www.city.gifu.lg.jp/">岐阜市</option>
<option value="https://www.city.ogaki.lg.jp/">大垣市</option>
<option value="https://www.city.takayama.lg.jp/">高山市</option>
<option value="https://www.city.minokamo.gifu.jp/">美濃加茂市</option>
<option value="https://www.city.minoshi.lg.jp/">美濃市</option>
<option value="https://www.city.seki.lg.jp/">関市</option>
<option value="https://www.city.kakamigahara.lg.jp/">各務原市</option>
<option value="https://www.city.hashima.lg.jp/">羽島市</option>
<option value="https://www.city.kani.lg.jp/">可児市</option>
<option value="https://www.city.mizunami.lg.jp/">瑞浪市</option>
<option value="https://www.city.toki.lg.jp/">土岐市</option>
<option value="https://www.city.nakatsugawa.lg.jp/">中津川市</option>
<option value="https://www.city.ena.lg.jp/">恵那市</option>
<option value="https://www.city.gujo.gifu.jp/">郡上市</option>
<option value="https://www.city.hida.gifu.jp/">飛騨市</option>
<option value="https://www.city.mizuho.lg.jp/">瑞穂市</option>
<option value="https://www.city.motosu.lg.jp/">本巣市</option>
<option value="https://www.city.yamagata.gifu.jp/">山県市</option>
<option value="https://www.city.kakamigahara.lg.jp/">各務原市</option>
<option value="https://www.city.gero.lg.jp/">下呂市</option>
<option value="https://www.city.sakahogi.lg.jp/">坂祝町</option>
<option value="https://www.town.tomika.lg.jp/">富加町</option>
<option value="https://www.town.kawabe.lg.jp/">川辺町</option>
<option value="https://www.town.hichiso.lg.jp/">七宗町</option>
<option value="https://www.town.yao.gifu.jp/">八百津町</option>
<option value="https://www.town.shirakawa.gifu.jp/">白川町</option>
<option value="https://www.town.higashishirakawa.gifu.jp/">東白川村</option>
<option value="https://www.town.minokamo.gifu.jp/">御嵩町</option>
<option value="https://www.town.kani.gifu.jp/">坂祝町</option>
<option value="https://www.town.seki.gifu.jp/">関ケ原町</option>
<option value="https://www.town.tarui.lg.jp/">垂井町</option>
<option value="https://www.town.seki.gifu.jp/">関ケ原町</option>
<option value="https://www.town.godo.gifu.jp/">神戸町</option>
<option value="https://www.town.anpachi.gifu.jp/">安八町</option>
<option value="https://www.town.wanouchi.gifu.jp/">輪之内町</option>
<option value="https://www.town.hozumi.gifu.jp/">北方町</option>
<option value="https://www.town.seki.gifu.jp/">関ケ原町</option>
<option value="https://www.town.ikeda.gifu.jp/">池田町</option>
<option value="https://www.town.ogaki.gifu.jp/">揖斐川町</option>
<option value="https://www.town.ogaki.gifu.jp/">大野町</option>
<option value="https://www.town.ogaki.gifu.jp/">養老町</option>
<option value="https://www.town.shirakawa.lg.jp/">白川村</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={gihu.src}
              alt="岐阜県市区町村マップ"
              useMap="#gihumap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="gihumap">
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