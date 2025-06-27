import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import fukuoka from "@/global/img/fukuoka.png";

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
          <h1 className="hero__title">福岡県の魅力</h1>
          <p className="hero__lead">
            福岡県は太宰府天満宮や門司港レトロ、糸島の絶景など多彩な観光名所が充実し、博多祇園山笠や桜まつりなど伝統文化・祭りも盛んです。明太子や博多ラーメン、もつ鍋など地元グルメも豊富で、温暖な気候と人の温かさ、交通アクセスの良さが住みやすい環境を支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">福岡県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：九州地方／約4,986平方km</li>
                <li>主な地形：筑紫山地、福岡平野、糸島半島、玄界灘・周防灘に面した海岸線</li>
                <li>気候区分：瀬戸内海式気候（温暖少雨）、一部日本海側気候（北部）</li>
                <li>平均気温・降水量：春（15℃・140mm）、夏（27℃・190mm）、秋（19℃・150mm）、冬（7℃・90mm）※福岡市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約5,131,000人（2024年推計）</li>
                <li>人口密度：約1,030人／km²</li>
                <li>中心都市：福岡市（人口約1,607,000人、九州最大の都市で経済・文化・交通の中心、天神・博多エリアなど観光資源が豊富）[1][8]</li>
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
              <option value="https://www.city.fukuoka.lg.jp/">福岡市</option>
<option value="https://www.city.kitakyushu.lg.jp/">北九州市</option>
<option value="https://www.city.kurume.fukuoka.jp/">久留米市</option>
<option value="https://www.city.omuta.lg.jp/">大牟田市</option>
<option value="https://www.city.nogata.lg.jp/">直方市</option>
<option value="https://www.city.iizuka.lg.jp/">飯塚市</option>
<option value="https://www.city.tagawa.fukuoka.jp/">田川市</option>
<option value="https://www.city.yanagawa.fukuoka.jp/">柳川市</option>
<option value="https://www.city.yukuhashi.fukuoka.jp/">行橋市</option>
<option value="https://www.city.munakata.lg.jp/">宗像市</option>
<option value="https://www.city.buzen.lg.jp/">豊前市</option>
<option value="https://www.city.nakama.lg.jp/">中間市</option>
<option value="https://www.city.ogori.fukuoka.jp/">小郡市</option>
<option value="https://www.city.chikugo.lg.jp/">筑後市</option>
<option value="https://www.city.okawa.lg.jp/">大川市</option>
<option value="https://www.city.yame.fukuoka.jp/">八女市</option>
<option value="https://www.city.chikushino.fukuoka.jp/">筑紫野市</option>
<option value="https://www.city.koga.fukuoka.jp/">古賀市</option>
<option value="https://www.city.fukutsu.lg.jp/">福津市</option>
<option value="https://www.city.ukiha.fukuoka.jp/">うきは市</option>
<option value="https://www.city.miyawaka.lg.jp/">宮若市</option>
<option value="https://www.city.kama.lg.jp/">嘉麻市</option>
<option value="https://www.city.asakura.lg.jp/">朝倉市</option>
<option value="https://www.city.itonoseki.fukuoka.jp/">糸島市</option>
<option value="https://www.city.kurume.fukuoka.jp/">久留米市</option>
<option value="https://www.city.dazaifu.lg.jp/">太宰府市</option>
<option value="https://www.city.kasuya.fukuoka.jp/">春日市</option>
<option value="https://www.city.ono.fukuoka.jp/">大野城市</option>
<option value="https://www.city.miyama.lg.jp/">みやま市</option>
<option value="https://www.town.keisen.fukuoka.jp/">桂川町</option>
<option value="https://www.town.kawara.fukuoka.jp/">香春町</option>
<option value="https://www.town.koho.fukuoka.jp/">糸田町</option>
<option value="https://www.town.kawasaki.fukuoka.jp/">川崎町</option>
<option value="https://www.town.sue.fukuoka.jp/">須恵町</option>
<option value="https://www.town.shime.lg.jp/">志免町</option>
<option value="https://www.town.kasuya.lg.jp/">粕屋町</option>
<option value="https://www.town.sasaguri.fukuoka.jp/">篠栗町</option>
<option value="https://www.town.umi.lg.jp/">宇美町</option>
<option value="https://www.town.chikuzen.lg.jp/">筑前町</option>
<option value="https://www.town.toho.lg.jp/">東峰村</option>
<option value="https://www.town.tachiarai.fukuoka.jp/">大刀洗町</option>
<option value="https://www.town.ogori.fukuoka.jp/">大木町</option>
<option value="https://www.town.okagaki.lg.jp/">岡垣町</option>
<option value="https://www.town.munakata.lg.jp/">芦屋町</option>
<option value="https://www.town.mizumaki.lg.jp/">水巻町</option>
<option value="https://www.town.ono.fukuoka.jp/">遠賀町</option>
<option value="https://www.town.kanda.lg.jp/">苅田町</option>
<option value="https://www.town.miyako.lg.jp/">みやこ町</option>
<option value="https://www.town.chikujou.lg.jp/">築上町</option>
<option value="https://www.town.yoshitomi.lg.jp/">吉富町</option>
<option value="https://www.town.koge.lg.jp/">上毛町</option>
<option value="https://www.town.kawara.fukuoka.jp/">香春町</option>
<option value="https://www.town.itaru.fukuoka.jp/">糸田町</option>
<option value="https://www.town.soehara.fukuoka.jp/">添田町</option>
<option value="https://www.town.akita.fukuoka.jp/">赤村</option>
<option value="https://www.town.fukuchi.lg.jp/">福智町</option>
<option value="https://www.town.otsuka.fukuoka.jp/">大任町</option>
<option value="https://www.town.kawara.fukuoka.jp/">川崎町</option>
<option value="https://www.town.tagawa.fukuoka.jp/">田川町</option>
<option value="https://www.town.kawara.fukuoka.jp/">川崎町</option>
<option value="https://www.town.sue.fukuoka.jp/">須恵町</option>
<option value="https://www.town.shime.lg.jp/">志免町</option>
<option value="https://www.town.kasuya.lg.jp/">粕屋町</option>
<option value="https://www.town.sasaguri.fukuoka.jp/">篠栗町</option>
<option value="https://www.town.umi.lg.jp/">宇美町</option>
<option value="https://www.town.chikuzen.lg.jp/">筑前町</option>
<option value="https://www.town.toho.lg.jp/">東峰村</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={fukuoka.src}
              alt="福岡県市区町村マップ"
              useMap="#fukuokamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="fukuokamap">
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