import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import kumamoto from "@/global/img/kumamoto.png";

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
          <h1 className="hero__title">熊本県の魅力</h1>
          <p className="hero__lead">
            熊本県は熊本城や阿蘇山、黒川温泉など名所・絶景が豊富で、火の国まつりや山鹿灯籠まつりなど伝統行事も盛んです。熊本ラーメンや馬刺し、いきなり団子など地元グルメも多彩で、豊かな自然と人の温かさ、九州各地への良好な交通アクセスが住みやすさを支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">熊本県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：九州地方／約7,409平方km</li>
                <li>主な地形：阿蘇山や九州山地の山岳地帯、熊本平野、有明海・八代海・天草諸島の海岸線</li>
                <li>気候区分：太平洋側気候（温暖・多雨）、一部内陸性気候（阿蘇・山間部）</li>
                <li>平均気温・降水量：春（15℃・180mm）、夏（27℃・350mm）、秋（19℃・170mm）、冬（7℃・60mm）※熊本市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,695,000人（2025年推計）</li>
                <li>人口密度：約229人／km²</li>
                <li>中心都市：熊本市（人口約730,000人、県庁所在地で行政・経済・文化の中心、熊本城や水前寺成趣園など観光資源が豊富）</li>
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
              <option value="https://www.city.kumamoto.jp/">熊本市</option>
<option value="https://www.city.yatsushiro.lg.jp/">八代市</option>
<option value="https://www.city.amakusa.kumamoto.jp/">天草市</option>
<option value="https://www.city.hitoyoshi.lg.jp/">人吉市</option>
<option value="https://www.city.arao.lg.jp/">荒尾市</option>
<option value="https://www.city.tamana.lg.jp/">玉名市</option>
<option value="https://www.city.yamaga.kumamoto.jp/">山鹿市</option>
<option value="https://www.city.kikuchi.lg.jp/">菊池市</option>
<option value="https://www.city.uto.kumamoto.jp/">宇土市</option>
<option value="https://www.city.usuki.kumamoto.jp/">宇城市</option>
<option value="https://www.city.ashikita.lg.jp/">阿蘇市</option>
<option value="https://www.city.kosai.kumamoto.jp/">合志市</option>
<option value="https://www.city.misato.kumamoto.jp/">美里町</option>
<option value="https://www.city.tamana.lg.jp/">玉東町</option>
<option value="https://www.town.nagasu.lg.jp/">長洲町</option>
<option value="https://www.town.nankan.lg.jp/">南関町</option>
<option value="https://www.town.gyokuto.kumamoto.jp/">玉東町</option>
<option value="https://www.town.kikuchi.kumamoto.jp/">菊陽町</option>
<option value="https://www.town.ozu.kumamoto.jp/">大津町</option>
<option value="https://www.town.ueki.kumamoto.jp/">和水町</option>
<option value="https://www.town.nagomi.lg.jp/">和水町</option>
<option value="https://www.town.kumamoto.kumamoto.jp/">西原村</option>
<option value="https://www.town.mashiki.lg.jp/">益城町</option>
<option value="https://www.town.kashima.kumamoto.jp/">嘉島町</option>
<option value="https://www.town.yamato.kumamoto.jp/">山都町</option>
<option value="https://www.town.mifune.kumamoto.jp/">御船町</option>
<option value="https://www.town.kosa.kumamoto.jp/">甲佐町</option>
<option value="https://www.town.ugui.kumamoto.jp/">宇城市</option>
<option value="https://www.town.misato.kumamoto.jp/">美里町</option>
<option value="https://www.town.takamori.kumamoto.jp/">高森町</option>
<option value="https://www.town.minamiaso.lg.jp/">南阿蘇村</option>
<option value="https://www.town.nishihara.kumamoto.jp/">西原村</option>
<option value="https://www.town.oguni.kumamoto.jp/">小国町</option>
<option value="https://www.town.uzumasa.kumamoto.jp/">産山村</option>
<option value="https://www.town.minamioguni.kumamoto.jp/">南小国町</option>
<option value="https://www.town.oguni.kumamoto.jp/">小国町</option>
<option value="https://www.town.oguni.kumamoto.jp/">南小国町</option>
<option value="https://www.town.oguni.kumamoto.jp/">産山村</option>
<option value="https://www.town.nishiki.kumamoto.jp/">錦町</option>
<option value="https://www.town.taragi.lg.jp/">多良木町</option>
<option value="https://www.town.yunomae.kumamoto.jp/">湯前町</option>
<option value="https://www.town.mizukami.kumamoto.jp/">水上村</option>
<option value="https://www.town.sagara.kumamoto.jp/">相良村</option>
<option value="https://www.town.itsuki.lg.jp/">五木村</option>
<option value="https://www.town.yamae.kumamoto.jp/">山江村</option>
<option value="https://www.town.kuma.kumamoto.jp/">球磨村</option>
<option value="https://www.town.asagiri.kumamoto.jp/">あさぎり町</option>
<option value="https://www.town.reihoku.lg.jp/">苓北町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={kumamoto.src}
              alt="熊本県市区町村マップ"
              useMap="#kumamatomap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="kumamatomap">
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