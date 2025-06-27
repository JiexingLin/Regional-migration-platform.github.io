import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import aichi from "@/global/img/aichi.png";

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
            <h1 className="hero__title">愛知県の魅力</h1>
            <p className="hero__lead">
              愛知県は国宝犬山城や香嵐渓、伊良湖岬など多彩な観光名所や絶景スポットが点在し、名古屋まつりや藤まつりなど伝統行事も盛んです。名物の味噌カツやきしめん、地元の海産物や野菜グルメも豊富で、温暖な気候と発達した交通網、人の温かさが住みやすい環境をつくっています
            </p>
            <a href="#overview" className="hero__button">詳しく見る</a>
          </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
          <h2 className="overview__heading">愛知県の概要</h2>
          <div className="overview__grid">
            <div className="overview__box">
              <h3>地形・気候</h3>
              <ul>
                <li>位置・面積：中部地方／約5,172平方km</li>
                <li>主な地形：濃尾平野、三河山地、知多半島・渥美半島などの海岸線</li>
                <li>気候区分：太平洋側気候（温暖で雨が少ない）、一部内陸性気候</li>
                <li>平均気温・降水量：春（14℃・140mm）、夏（26℃・170mm）、秋（18℃・160mm）、冬（5℃・110mm）※名古屋市の都市部目安</li>
              </ul>
            </div>
            <div className="overview__box">
              <h3>人口・中心都市</h3>
              <ul>
                <li>総人口：約7,543,000人（2023年推計）</li>
                <li>人口密度：約1,460人／km²</li>
                <li>中心都市：名古屋市（人口約2,333,000人、政令指定都市で経済・交通・文化の中心、名古屋城や栄エリアなどの観光資源が豊富）</li>
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
              <option value="https://www.city.nagoya.jp/">名古屋市</option>
              <option value="https://www.city.toyohashi.lg.jp/">豊橋市</option>
              <option value="https://www.city.okazaki.lg.jp/">岡崎市</option>
              <option value="https://www.city.ichinomiya.aichi.jp/">一宮市</option>
              <option value="https://www.city.seto.aichi.jp/">瀬戸市</option>
              <option value="https://www.city.handashi.lg.jp/">半田市</option>
              <option value="https://www.city.kasugai.lg.jp/">春日井市</option>
              <option value="https://www.city.toyokawa.lg.jp/">豊川市</option>
              <option value="https://www.city.tsushima.lg.jp/">津島市</option>
              <option value="https://www.city.hekinan.aichi.jp/">碧南市</option>
              <option value="https://www.city.kariya.lg.jp/">刈谷市</option>
              <option value="https://www.city.takahama.lg.jp/">高浜市</option>
              <option value="https://www.city.iwakura.aichi.jp/">岩倉市</option>
              <option value="https://www.city.toyoake.lg.jp/">豊明市</option>
              <option value="https://www.city.chita.lg.jp/">知多市</option>
              <option value="https://www.city.chiryu.aichi.jp/">知立市</option>
              <option value="https://www.city.owariasahi.lg.jp/">尾張旭市</option>
              <option value="https://www.city.tokoname.aichi.jp/">常滑市</option>
              <option value="https://www.city.konan.lg.jp/">江南市</option>
              <option value="https://www.city.komaki.aichi.jp/">小牧市</option>
              <option value="https://www.city.inuyama.aichi.jp/">犬山市</option>
              <option value="https://www.city.nishio.aichi.jp/">西尾市</option>
              <option value="https://www.city.gamagori.lg.jp/">蒲郡市</option>
              <option value="https://www.city.anjo.aichi.jp/">安城市</option>
              <option value="https://www.city.shinshiro.lg.jp/">新城市</option>
              <option value="https://www.city.nisshin.lg.jp/">日進市</option>
              <option value="https://www.city.handa.lg.jp/">半田市</option>
              <option value="https://www.city.kitanagoya.lg.jp/">北名古屋市</option>
              <option value="https://www.city.miyoshi.aichi.jp/">みよし市</option>
              <option value="https://www.city.ama.aichi.jp/">あま市</option>
              <option value="https://www.city.tahara.aichi.jp/">田原市</option>
              <option value="https://www.city.inazawa.aichi.jp/">稲沢市</option>
              <option value="https://www.city.kiyosu.lg.jp/">清須市</option>
              <option value="https://www.city.agui.lg.jp/">阿久比町</option>
              <option value="https://www.town.higashiura.aichi.jp/">東浦町</option>
              <option value="https://www.town.minamichita.lg.jp/">南知多町</option>
              <option value="https://www.town.taketoyo.lg.jp/">武豊町</option>
              <option value="https://www.town.mihama.aichi.jp/">美浜町</option>
              <option value="https://www.town.toyoake.lg.jp/">豊明町</option>
              <option value="https://www.town.owari.asahi.aichi.jp/">尾張旭町</option>
              <option value="https://www.town.kota.lg.jp/">幸田町</option>
              <option value="https://www.town.togo.aichi.jp/">東郷町</option>
              <option value="https://www.town.fuso.lg.jp/">扶桑町</option>
              <option value="https://www.town.oharu.aichi.jp/">大治町</option>
              <option value="https://www.town.tobishima.aichi.jp/">飛島村</option>
              <option value="https://www.town.komaki.aichi.jp/">小牧町</option>
              <option value="https://www.town.oguchi.lg.jp/">大口町</option>
              <option value="https://www.town.kanie.lg.jp/">蟹江町</option>
              <option value="https://www.town.asahi.aichi.jp/">旭町</option>
              <option value="https://www.town.shitara.lg.jp/">設楽町</option>
              <option value="https://www.town.toei.lg.jp/">東栄町</option>
              <option value="https://www.town.toyone.aichi.jp/">豊根村</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={aichi.src}
              alt="愛知県市区町村マップ"
              useMap="#aichimap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="aichimap">
              {/* 地图区域可以在这里添加 <area> 标签 */}
              
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