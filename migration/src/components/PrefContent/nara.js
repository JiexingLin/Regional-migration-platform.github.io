import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import nara from "@/global/img/nara.png";

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
          <h1 className="hero__title">奈良県の魅力</h1>
          <p className="hero__lead">
            山や海に囲まれた北海道の暮らしをご紹介します。……テキスト……
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">奈良県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            奈良県は東大寺や春日大社、興福寺など世界遺産の寺社や奈良公園の鹿、若草山など歴史と自然が調和する名所が豊富です。伝統行事「お水取り」や若草山焼きなど祭りも多彩で、柿の葉寿司や奈良漬けなど地元グルメも充実。自然と人の温かさ、関西圏への良好な交通アクセスも魅力です
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>位置・面積：近畿地方／約3,691平方km</li>
                <li>主な地形：奈良盆地、大和高原、吉野山地（紀伊山地）、平野部は奈良盆地中心、海岸線は無し</li>
                <li>気候区分：内陸性気候（盆地部は寒暖差大）、一部太平洋側気候（南部山地）</li>
                <li>平均気温・降水量：春（13℃・120mm）、夏（26℃・180mm）、秋（17℃・130mm）、冬（5℃・50mm）※奈良市の都市部目安</li>
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
              <option value="https://www.city.nara.lg.jp/">奈良市</option>
<option value="https://www.city.yamatokoriyama.nara.jp/">大和郡山市</option>
<option value="https://www.city.yamatotakada.nara.jp/">大和高田市</option>
<option value="https://www.city.tenri.nara.jp/">天理市</option>
<option value="https://www.city.kashihara.nara.jp/">橿原市</option>
<option value="https://www.city.sakurai.lg.jp/">桜井市</option>
<option value="https://www.city.gojo.lg.jp/">五條市</option>
<option value="https://www.city.ikoma.lg.jp/">生駒市</option>
<option value="https://www.city.kashiba.lg.jp/">香芝市</option>
<option value="https://www.city.gose.nara.jp/">御所市</option>
<option value="https://www.city.katsuragi.nara.jp/">葛城市</option>
<option value="https://www.city.uda.nara.jp/">宇陀市</option>
<option value="https://www.town.yamatotakada.nara.jp/">平群町</option>
<option value="https://www.town.sango.nara.jp/">三郷町</option>
<option value="https://www.town.ikoma.nara.jp/">斑鳩町</option>
<option value="https://www.town.andou.nara.jp/">安堵町</option>
<option value="https://www.town.kawanishi.nara.jp/">川西町</option>
<option value="https://www.town.kawai.nara.jp/">三宅町</option>
<option value="https://www.town.oyodo.nara.jp/">田原本町</option>
<option value="https://www.town.tawaramoto.nara.jp/">高取町</option>
<option value="https://www.town.asuka.nara.jp/">明日香村</option>
<option value="https://www.town.katsuragi.nara.jp/">上牧町</option>
<option value="https://www.town.koryo.nara.jp/">王寺町</option>
<option value="https://www.town.kanmaki.nara.jp/">広陵町</option>
<option value="https://www.town.kawakami.nara.jp/">河合町</option>
<option value="https://www.town.shimoichi.nara.jp/">大淀町</option>
<option value="https://www.town.yoshino.nara.jp/">下市町</option>
<option value="https://www.town.shimokitayama.nara.jp/">黒滝村</option>
<option value="https://www.town.totsukawa.lg.jp/">天川村</option>
<option value="https://www.town.nosegawa.nara.jp/">野迫川村</option>
<option value="https://www.town.kawakami.nara.jp/">十津川村</option>
<option value="https://www.town.tenkawa.nara.jp/">下北山村</option>
<option value="https://www.town.kamikitayama.nara.jp/">上北山村</option>
<option value="https://www.town.kawakami.nara.jp/">川上村</option>
<option value="https://www.town.higashiyoshino.nara.jp/">東吉野村</option>
<option value="https://www.town.yoshino.nara.jp/">吉野町</option>
<option value="https://www.town.oyodo.nara.jp/">大淀町</option>
<option value="https://www.town.shimoichi.nara.jp/">下市町</option>
<option value="https://www.town.kawakami.nara.jp/">黒滝村</option>
<option value="https://www.town.totsukawa.lg.jp/">天川村</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={nara.src}
              alt="奈良県市区町村マップ"
              useMap="#naramap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="naramap">
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