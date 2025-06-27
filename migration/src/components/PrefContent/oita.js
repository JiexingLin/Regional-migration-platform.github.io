import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import oita from "@/global/img/oita.png";

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
          <h1 className="hero__title">大分県の魅力</h1>
          <p className="hero__lead">
            大分県は別府・湯布院の温泉地や地獄めぐり、くじゅう連山や耶馬渓などの絶景、宇佐神宮や臼杵石仏など歴史的名所が豊富です。とり天や豊後牛、関アジ・関サバなど地元グルメも多彩で、温暖な気候と人の温かさ、九州各地へのアクセスの良さが住みやすさを支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">大分県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：九州地方／約6,341平方km</li>
                <li>主な地形：くじゅう連山や祖母山などの山地、別府湾・豊後水道に面した海岸、平野部（大分平野）</li>
                <li>気候区分：太平洋側気候（温暖・多雨）、一部内陸性気候（山間部）</li>
                <li>平均気温・降水量：春（15℃・150mm）、夏（27℃・280mm）、秋（19℃・170mm）、冬（7℃・60mm）※大分市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,086,000人（2025年推計）</li>
                <li>人口密度：約171人／km²</li>
                <li>中心都市：大分市（人口約470,000人、県庁所在地で行政・経済・文化の中心、うみたまごや高崎山、歴史的建造物も豊富）</li>
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
              <option value="https://www.city.oita.oita.jp/">大分市</option>
<option value="https://www.city.beppu.oita.jp/">別府市</option>
<option value="https://www.city.nakatsu.lg.jp/">中津市</option>
<option value="https://www.city.saiki.oita.jp/">佐伯市</option>
<option value="https://www.city.hita.oita.jp/">日田市</option>
<option value="https://www.city.usuki.oita.jp/">臼杵市</option>
<option value="https://www.city.tsukumi.oita.jp/">津久見市</option>
<option value="https://www.city.taketa.oita.jp/">竹田市</option>
<option value="https://www.city.bungotakada.oita.jp/">豊後高田市</option>
<option value="https://www.city.usa.oita.jp/">宇佐市</option>
<option value="https://www.city.bungoono.oita.jp/">豊後大野市</option>
<option value="https://www.city.yufu.oita.jp/">由布市</option>
<option value="https://www.city.kunisaki.oita.jp/">国東市</option>
<option value="https://www.city.kitsuki.lg.jp/">杵築市</option>
<option value="https://www.town.himeshima.oita.jp/">姫島村</option>
<option value="https://www.town.hiji.lg.jp/">日出町</option>
<option value="https://www.town.kokonoe.oita.jp/">九重町</option>
<option value="https://www.town.kusu.oita.jp/">玖珠町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={oita.src}
              alt="大分県市区町村マップ"
              useMap="#oitamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="oitamap">
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