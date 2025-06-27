import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import okayama from "@/global/img/okayama.png";

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
          <h1 className="hero__title">岡山県の魅力</h1>
          <p className="hero__lead">
            岡山県は日本三名園の岡山後楽園や倉敷美観地区、黒漆塗りの岡山城など歴史と美しい景観が調和した名所が多く、桃太郎伝説や吉備津神社など伝統文化も息づきます。白桃やマスカット、ばら寿司など地元グルメも充実し、温暖な気候と人の温かさ、関西・東京から新幹線でアクセスしやすい住環境も魅力です
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">岡山県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：中国地方／約7,114平方km</li>
                <li>主な地形：中国山地、吉備高原、岡山平野、瀬戸内海に面した海岸線、児島半島や多島美の島々</li>
                <li>気候区分：瀬戸内型気候（温暖少雨）</li>
                <li>平均気温・降水量：春（15℃・110mm）、夏（27℃・140mm）、秋（18℃・90mm）、冬（6℃・40mm）※岡山市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,860,000人（2025年推計）</li>
                <li>人口密度：約262人／km²</li>
                <li>中心都市：岡山市（人口約720,000人、県庁所在地で行政・経済・文化の中心、岡山後楽園や岡山城、交通の要衝として発展）</li>
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
              <option value="https://www.city.okayama.jp/">岡山市</option>
<option value="https://www.city.kurashiki.okayama.jp/">倉敷市</option>
<option value="https://www.city.tsuyama.okayama.jp/">津山市</option>
<option value="https://www.city.tamano.lg.jp/">玉野市</option>
<option value="https://www.city.sojya.okayama.jp/">総社市</option>
<option value="https://www.city.takahashi.okayama.jp/">高梁市</option>
<option value="https://www.city.niimi.okayama.jp/">新見市</option>
<option value="https://www.city.bizen.okayama.jp/">備前市</option>
<option value="https://www.city.setouchi.lg.jp/">瀬戸内市</option>
<option value="https://www.city.akashi.okayama.jp/">赤磐市</option>
<option value="https://www.city.manisashi.okayama.jp/">真庭市</option>
<option value="https://www.city.ibara.okayama.jp/">井原市</option>
<option value="https://www.city.asakuchi.lg.jp/">浅口市</option>
<option value="https://www.city.mimasaka.lg.jp/">美作市</option>
<option value="https://www.city.kasaoka.okayama.jp/">笠岡市</option>
<option value="https://www.town.wake.lg.jp/">和気町</option>
<option value="https://www.town.kumenan.lg.jp/">久米南町</option>
<option value="https://www.town.misaki.okayama.jp/">美咲町</option>
<option value="https://www.town.shoou.lg.jp/">勝央町</option>
<option value="https://www.town.nagi.okayama.jp/">奈義町</option>
<option value="https://www.town.kagamino.lg.jp/">鏡野町</option>
<option value="https://www.town.kibichuo.lg.jp/">吉備中央町</option>
<option value="https://www.town.hayashima.lg.jp/">早島町</option>
<option value="https://www.town.yakage.lg.jp/">矢掛町</option>
<option value="https://www.town.asakuchi.lg.jp/">里庄町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={okayama.src}
              alt="岡山県市区町村マップ"
              useMap="#okayamamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="okayamamap">
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