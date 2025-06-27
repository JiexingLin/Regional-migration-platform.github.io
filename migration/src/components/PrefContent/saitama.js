import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import saitama from "@/global/img/saitama.png";

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
          <h1 className="hero__title">埼玉県の魅力</h1>
          <p className="hero__lead">
            埼玉県は川越の蔵造りの町並みや時の鐘、長瀞渓谷や羊山公園の芝桜、三峯神社など多彩な観光資源があり、秩父夜祭や鷲宮神社の神楽など伝統文化も豊かです。草加せんべいやうどん、狭山茶など地元グルメも多彩で、都心からのアクセスが良く、自然と都市が調和した住みやすい環境が魅力です
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">埼玉県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：関東地方／約3,798平方km</li>
                <li>主な地形：秩父山地、関東平野、荒川や利根川などの河川</li>
                <li>気候区分：太平洋側気候（夏は高温多湿、冬は晴天多い）</li>
                <li>平均気温・降水量：春（15℃・120mm）、夏（27℃・160mm）、秋（18℃・130mm）、冬（6℃・30mm）※さいたま市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約7,320,000人（2025年推計）</li>
                <li>人口密度：約1,928人／km²</li>
                <li>中心都市：さいたま市（人口約1,320,000人、県庁所在地で行政・経済・文化の中心、鉄道博物館や大宮公園など観光資源も豊富）</li>
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
              <option value="https://www.city.saitama.jp/">さいたま市</option>
<option value="https://www.city.kawaguchi.lg.jp/">川口市</option>
<option value="https://www.city.kawagoe.saitama.jp/">川越市</option>
<option value="https://www.city.koshigaya.saitama.jp/">越谷市</option>
<option value="https://www.city.kasukabe.lg.jp/">春日部市</option>
<option value="https://www.city.iruma.saitama.jp/">入間市</option>
<option value="https://www.city.ageo.lg.jp/">上尾市</option>
<option value="https://www.city.soka.saitama.jp/">草加市</option>
<option value="https://www.city.warabi.saitama.jp/">蕨市</option>
<option value="https://www.city.tokorozawa.saitama.jp/">所沢市</option>
<option value="https://www.city.hanyu.lg.jp/">羽生市</option>
<option value="https://www.city.kumagaya.lg.jp/">熊谷市</option>
<option value="https://www.city.kuki.lg.jp/">久喜市</option>
<option value="https://www.city.konosu.saitama.jp/">鴻巣市</option>
<option value="https://www.city.fukaya.saitama.jp/">深谷市</option>
<option value="https://www.city.gyoda.lg.jp/">行田市</option>
<option value="https://www.city.honjo.lg.jp/">本庄市</option>
<option value="https://www.city.chichibu.lg.jp/">秩父市</option>
<option value="https://www.city.higashimatsuyama.lg.jp/">東松山市</option>
<option value="https://www.city.sakado.lg.jp/">坂戸市</option>
<option value="https://www.city.tsurugashima.lg.jp/">鶴ヶ島市</option>
<option value="https://www.city.hidaka.lg.jp/">日高市</option>
<option value="https://www.city.sayama.saitama.jp/">狭山市</option>
<option value="https://www.city.fujimi.saitama.jp/">富士見市</option>
<option value="https://www.city.fujimino.saitama.jp/">ふじみ野市</option>
<option value="https://www.city.shiki.lg.jp/">志木市</option>
<option value="https://www.city.asaka.lg.jp/">朝霞市</option>
<option value="https://www.city.wako.lg.jp/">和光市</option>
<option value="https://www.city.niiza.lg.jp/">新座市</option>
<option value="https://www.city.hasuda.saitama.jp/">蓮田市</option>
<option value="https://www.city.satte.lg.jp/">幸手市</option>
<option value="https://www.city.yashio.lg.jp/">八潮市</option>
<option value="https://www.city.kitagawa.saitama.jp/">北本市</option>
<option value="https://www.city.misato.lg.jp/">三郷市</option>
<option value="https://www.city.yorii.saitama.jp/">寄居町</option>
<option value="https://www.city.toda.saitama.jp/">戸田市</option>
<option value="https://www.city.hanno.lg.jp/">飯能市</option>
<option value="https://www.city.minano.saitama.jp/">皆野町</option>
<option value="https://www.city.ranzan.saitama.jp/">嵐山町</option>
<option value="https://www.city.ogano.saitama.jp/">小鹿野町</option>
<option value="https://www.town.namegawa.saitama.jp/">滑川町</option>
<option value="https://www.town.yoshimi.saitama.jp/">吉見町</option>
<option value="https://www.town.kawajima.saitama.jp/">川島町</option>
<option value="https://www.town.tokigawa.lg.jp/">ときがわ町</option>
<option value="https://www.town.hatoyama.saitama.jp/">鳩山町</option>
<option value="https://www.town.ogose.saitama.jp/">越生町</option>
<option value="https://www.town.moroyama.saitama.jp/">毛呂山町</option>
<option value="https://www.town.hatoyama.saitama.jp/">鳩山町</option>
<option value="https://www.town.miyoshi.saitama.jp/">三芳町</option>
<option value="https://www.town.matsubushi.lg.jp/">松伏町</option>
<option value="https://www.town.sugito.lg.jp/">杉戸町</option>
<option value="https://www.town.miyashiro.lg.jp/">宮代町</option>
<option value="https://www.town.shiraoka.lg.jp/">白岡市</option>
<option value="https://www.town.kamiizumi.saitama.jp/">神川町</option>
<option value="https://www.town.kamisato.saitama.jp/">上里町</option>
<option value="https://www.town.kamikawa.saitama.jp/">神川町</option>
<option value="https://www.town.minano.saitama.jp/">皆野町</option>
<option value="https://www.town.nagatoro.saitama.jp/">長瀞町</option>
<option value="https://www.town.yokoze.saitama.jp/">横瀬町</option>
<option value="https://www.town.ogano.saitama.jp/">小鹿野町</option>
<option value="https://www.town.higashichichibu.saitama.jp/">東秩父村</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={saitama.src}
              alt="埼玉県市区町村マップ"
              useMap="#saitamamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="saitamamap">
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