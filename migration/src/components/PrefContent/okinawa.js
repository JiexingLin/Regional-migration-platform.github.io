import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import okinawa from "@/global/img/okinawa.png";

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
          <h1 className="hero__title">沖縄県の魅力</h1>
          <p className="hero__lead">
            沖縄県はエメラルドグリーンの海や残波岬、知念岬公園などの絶景スポットが点在し、伝統的なエイサーや琉球王朝の祭りも息づきます。ゴーヤーチャンプルーや沖縄そば、泡盛など地元グルメも多彩で、温暖な気候と人の温かさ、那覇空港を中心とした交通アクセスの良さが住みやすさを支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">沖縄県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：九州地方／約2,282平方km</li>
                <li>主な地形：沖縄本島、石垣島・宮古島などの離島、サンゴ礁に囲まれた海岸、なだらかな丘陵地や平野</li>
                <li>気候区分：亜熱帯海洋性気候（太平洋側気候）</li>
                <li>平均気温・降水量：春（21℃・170mm）、夏（29℃・210mm）、秋（25℃・220mm）、冬（17℃・100mm）※那覇市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,450,000人（2025年推計）</li>
                <li>人口密度：約636人／km²</li>
                <li>中心都市：那覇市（人口約310,000人、県庁所在地で行政・経済・文化の中心、国際通りや首里城、空港アクセスも良好）</li>
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
              <option value="https://www.city.naha.okinawa.jp/">那覇市</option>
<option value="https://www.city.okinawa.okinawa.jp/">沖縄市</option>
<option value="https://www.city.urasoe.lg.jp/">浦添市</option>
<option value="https://www.city.ginowan.lg.jp/">宜野湾市</option>
<option value="https://www.city.itoman.lg.jp/">糸満市</option>
<option value="https://www.city.nago.okinawa.jp/">名護市</option>
<option value="https://www.city.tomigusuku.okinawa.jp/">豊見城市</option>
<option value="https://www.city.nanjo.okinawa.jp/">南城市</option>
<option value="https://www.city.miyakojima.lg.jp/">宮古島市</option>
<option value="https://www.city.ishigaki.okinawa.jp/">石垣市</option>
<option value="https://www.city.uruma.lg.jp/">うるま市</option>
<option value="https://www.town.kunigami.okinawa.jp/">国頭村</option>
<option value="https://www.town.ogimi.okinawa.jp/">大宜味村</option>
<option value="https://www.town.higashi.okinawa.jp/">東村</option>
<option value="https://www.town.nakijin.okinawa.jp/">今帰仁村</option>
<option value="https://www.town.motobu.okinawa.jp/">本部町</option>
<option value="https://www.town.onna.okinawa.jp/">恩納村</option>
<option value="https://www.town.ginoza.okinawa.jp/">宜野座村</option>
<option value="https://www.town.kin.okinawa.jp/">金武町</option>
<option value="https://www.town.ie.okinawa.jp/">伊江村</option>
<option value="https://www.town.yomitan.okinawa.jp/">読谷村</option>
<option value="https://www.town.kadena.okinawa.jp/">嘉手納町</option>
<option value="https://www.town.chatan.okinawa.jp/">北谷町</option>
<option value="https://www.town.kitanakagusuku.okinawa.jp/">北中城村</option>
<option value="https://www.town.nakagusuku.okinawa.jp/">中城村</option>
<option value="https://www.town.nishihara.okinawa.jp/">西原町</option>
<option value="https://www.town.yonabaru.okinawa.jp/">与那原町</option>
<option value="https://www.town.haebaru.lg.jp/">南風原町</option>
<option value="https://www.town.itoman.okinawa.jp/">渡嘉敷村</option>
<option value="https://www.vill.zamami.okinawa.jp/">座間味村</option>
<option value="https://www.vill.aguni.okinawa.jp/">粟国村</option>
<option value="https://www.vill.tokashiki.okinawa.jp/">渡名喜村</option>
<option value="https://www.vill.kumejima.okinawa.jp/">久米島町</option>
<option value="https://www.vill.tonaki.okinawa.jp/">南大東村</option>
<option value="https://www.vill.kitadaito.okinawa.jp/">北大東村</option>
<option value="https://www.vill.ie.okinawa.jp/">伊平屋村</option>
<option value="https://www.vill.izena.okinawa.jp/">伊是名村</option>
<option value="https://www.vill.tarama.okinawa.jp/">多良間村</option>
<option value="https://www.vill.yonaguni.okinawa.jp/">与那国町</option>
<option value="https://www.town.taketomi.lg.jp/">竹富町</option>
<option value="https://www.town.yaeyama.okinawa.jp/">与那国町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={okinawa.src}
              alt="沖縄県市区町村マップ"
              useMap="#okinawamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="okinawamap">
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