import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import yamaguchi from "@/global/img/yamaguchi.png";

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
          <h1 className="hero__title">山口県の魅力</h1>
          <p className="hero__lead">
            山口県は角島大橋や秋吉台、元乃隅神社、笠戸島の夕日など絶景スポットが豊富で、萩の城下町や松下村塾など歴史的名所も多彩です。ふぐや外郎、かまぼこ、萩焼など地元グルメや伝統工芸も魅力。温泉や自然、人の温かさ、鉄道・高速道路で中国・九州各地へのアクセスも良好な住環境が整っています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">山口県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：中国地方／約6,112平方km</li>
                <li>主な地形：中国山地、瀬戸内海・日本海に面した海岸、平野部は防府・宇部・下関など沿岸部に分布</li>
                <li>気候区分：瀬戸内海側は温暖少雨、日本海側や内陸部は冬に曇天・降雪もある日本海側気候</li>
                <li>平均気温・降水量：春（14℃・120mm）、夏（26℃・180mm）、秋（17℃・130mm）、冬（6℃・60mm）※山口市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,280,000人（2025年推計）</li>
                <li>人口密度：約210人／km²</li>
                <li>中心都市：山口市（人口約190,000人、県庁所在地で行政・文化の中心、瑠璃光寺五重塔や温泉、歴史・自然資源が豊富）</li>
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
              <option value="https://www.city.shimonoseki.lg.jp/">下関市</option>
<option value="https://www.city.ube.yamaguchi.jp/">宇部市</option>
<option value="https://www.city.yamaguchi.lg.jp/">山口市</option>
<option value="https://www.city.hagi.lg.jp/">萩市</option>
<option value="https://www.city.hofu.yamaguchi.jp/">防府市</option>
<option value="https://www.city.shunan.lg.jp/">下松市</option>
<option value="https://www.city.iwakuni.lg.jp/">岩国市</option>
<option value="https://www.city.hikari.lg.jp/">光市</option>
<option value="https://www.city.nagato.yamaguchi.jp/">長門市</option>
<option value="https://www.city.yanai.lg.jp/">柳井市</option>
<option value="https://www.city.mine.lg.jp/">美祢市</option>
<option value="https://www.city.shunan.lg.jp/">周南市</option>
<option value="https://www.city.sanyo-onoda.lg.jp/">山陽小野田市</option>
<option value="https://www.town.suooshima.lg.jp/">周防大島町</option>
<option value="https://www.town.tabuse.lg.jp/">田布施町</option>
<option value="https://www.town.hirao.lg.jp/">平生町</option>
<option value="https://www.town.kaminoseki.lg.jp/">上関町</option>
<option value="https://www.town.shunan.lg.jp/">和木町</option>
<option value="https://www.town.abucho.lg.jp/">阿武町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={yamaguchi.src}
              alt="山口県市区町村マップ"
              useMap="#yamaguchimap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="yamaguchimap">
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