import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import ibaraki from "@/global/img/ibaraki.png";

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
          <h1 className="hero__title">茨城県の魅力</h1>
          <p className="hero__lead">
            茨城県は国営ひたち海浜公園や袋田の滝、偕楽園など多彩な観光名所・絶景スポットが広がり、伝統的な祭りや文化も盛んです。新鮮な海産物や納豆、常陸牛など地元グルメも豊富で、自然と人情、首都圏からの良好な交通アクセスが住みやすい環境を支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">茨城県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：関東地方／約6,097平方km</li>
                <li>主な地形：筑波山などの山地、関東平野東部、太平洋に面した長い海岸線</li>
                <li>気候区分：太平洋側気候（温暖で降水量がやや少ない）</li>
                <li>平均気温・降水量：春（13℃・130mm）、夏（25℃・160mm）、秋（18℃・170mm）、冬（5℃・90mm）※水戸市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約2,865,000人（2024年推計）</li>
                <li>人口密度：約470人／km²</li>
                <li>中心都市：水戸市（人口約269,000人、県庁所在地で歴史・文化の中心、偕楽園や弘道館など観光資源が豊富）</li>
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
              <option value="https://www.city.mito.lg.jp/">水戸市</option>
<option value="https://www.city.hitachi.lg.jp/">日立市</option>
<option value="https://www.city.tsukuba.lg.jp/">つくば市</option>
<option value="https://www.city.tsuchiura.lg.jp/">土浦市</option>
<option value="https://www.city.kasama.lg.jp/">笠間市</option>
<option value="https://www.city.koga.ibaraki.jp/">古河市</option>
<option value="https://www.city.ryugasaki.ibaraki.jp/">龍ケ崎市</option>
<option value="https://www.city.ishioka.lg.jp/">石岡市</option>
<option value="https://www.city.yuki.ibaraki.jp/">結城市</option>
<option value="https://www.city.hitachinaka.lg.jp/">ひたちなか市</option>
<option value="https://www.city.kashima.ibaraki.jp/">鹿嶋市</option>
<option value="https://www.city.itako.lg.jp/">潮来市</option>
<option value="https://www.city.naka.ibaraki.jp/">那珂市</option>
<option value="https://www.city.chikusei.lg.jp/">筑西市</option>
<option value="https://www.city.bandou.lg.jp/">坂東市</option>
<option value="https://www.city.inashiki.lg.jp/">稲敷市</option>
<option value="https://www.city.kasumigaura.lg.jp/">かすみがうら市</option>
<option value="https://www.city.sakuragawa.lg.jp/">桜川市</option>
<option value="https://www.city.kami-miso.lg.jp/">神栖市</option>
<option value="https://www.city.hitachiota.ibaraki.jp/">常陸太田市</option>
<option value="https://www.city.hitachiomiya.lg.jp/">常陸大宮市</option>
<option value="https://www.city.shimotsuma.lg.jp/">下妻市</option>
<option value="https://www.city.moriya.ibaraki.jp/">守谷市</option>
<option value="https://www.city.joso.lg.jp/">常総市</option>
<option value="https://www.city.toride.ibaraki.jp/">取手市</option>
<option value="https://www.city.yuki.ibaraki.jp/">結城市</option>
<option value="https://www.city.tsukubamirai.lg.jp/">つくばみらい市</option>
<option value="https://www.city.omitama.lg.jp/">小美玉市</option>
<option value="https://www.city.hokota.lg.jp/">鉾田市</option>
<option value="https://www.city.kitaibaraki.lg.jp/">北茨城市</option>
<option value="https://www.city.ogawa.ibaraki.jp/">大子町</option>
<option value="https://www.town.ami.lg.jp/">阿見町</option>
<option value="https://www.town.miho.lg.jp/">美浦村</option>
<option value="https://www.town.ushiku.lg.jp/">牛久市</option>
<option value="https://www.town.tokai.ibaraki.jp/">東海村</option>
<option value="https://www.town.yachiyo.ibaraki.jp/">八千代町</option>
<option value="https://www.town.goka.lg.jp/">五霞町</option>
<option value="https://www.town.sakai.ibaraki.jp/">境町</option>
<option value="https://www.town.tone.ibaraki.jp/">利根町</option>
<option value="https://www.town.izumigaoka.ibaraki.jp/">大洗町</option>
<option value="https://www.town.kawachi.ibaraki.jp/">河内町</option>
<option value="https://www.town.shirosato.ibaraki.jp/">城里町</option>
<option value="https://www.town.ibaraki.ibaraki.jp/">茨城町</option>
<option value="https://www.town.asahi.ibaraki.jp/">阿見町</option>
<option value="https://www.town.hokota.ibaraki.jp/">美浦村</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={ibaraki.src}
              alt="茨城県市区町村マップ"
              useMap="#ibarakimap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="ibarakimap">
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