import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import iwate from "@/global/img/iwate.png";

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
          <h1 className="hero__title">岩手県の魅力</h1>
          <p className="hero__lead">
            岩手県は世界遺産・平泉や浄土ヶ浜、龍泉洞などの絶景スポットが点在し、チャグチャグ馬コや盛岡さんさ踊りなど伝統文化・祭りも豊かです。盛岡冷麺や南部鉄器、久慈琥珀など地元グルメ・特産品も多彩で、広大な自然と人の温かさ、交通アクセスの良さが住みやすい環境を支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        <section id="overview" className="overview">
        <h2 className="overview__heading">岩手県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：東北地方／15,275.05平方km</li>
                <li>主な地形：北上山地、奥羽山脈、北上平野、三陸海岸（リアス式海岸）</li>
                <li>気候区分：太平洋側気候（沿岸部）、内陸性気候（内陸部）、一部日本海側気候</li>
                <li>平均気温・降水量：春（4.6℃・100mm）、夏（19.7℃・200mm）、秋（8.9℃・120mm）、冬（-2.9℃・70mm）※区界観測所の目安[3]</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,132,853人（2025年4月1日推計）[5]</li>
                <li>人口密度：約74人／km²[5]</li>
                <li>中心都市：盛岡市（人口約290,000人、県庁所在地で行政・経済・文化の中心、盛岡冷麺や伝統工芸など観光資源が豊富）[4][5]</li>
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
              <option value="https://www.city.morioka.iwate.jp/">盛岡市</option>
<option value="https://www.city.miyako.iwate.jp/">宮古市</option>
<option value="https://www.city.ofunato.iwate.jp/">大船渡市</option>
<option value="https://www.city.hanamaki.iwate.jp/">花巻市</option>
<option value="https://www.city.kitakami.iwate.jp/">北上市</option>
<option value="https://www.city.kamaishi.iwate.jp/">釜石市</option>
<option value="https://www.city.esashi.iwate.jp/">遠野市</option>
<option value="https://www.city.rikuzentakata.iwate.jp/">陸前高田市</option>
<option value="https://www.city.oshu.iwate.jp/">奥州市</option>
<option value="https://www.city.takizawa.iwate.jp/">滝沢市</option>
<option value="https://www.city.ninohe.lg.jp/">二戸市</option>
<option value="https://www.city.hachimantai.lg.jp/">八幡平市</option>
<option value="https://www.city.ichinoseki.iwate.jp/">一関市</option>
<option value="https://www.city.tonami.iwate.jp/">一戸町</option>
<option value="https://www.town.shizukuishi.iwate.jp/">雫石町</option>
<option value="https://www.town.yahaba.iwate.jp/">矢巾町</option>
<option value="https://www.town.takata.iwate.jp/">紫波町</option>
<option value="https://www.town.hachimantai.iwate.jp/">西和賀町</option>
<option value="https://www.town.kuzumaki.iwate.jp/">葛巻町</option>
<option value="https://www.town.ichinohe.iwate.jp/">岩手町</option>
<option value="https://www.town.kunohe.iwate.jp/">九戸村</option>
<option value="https://www.town.noda.iwate.jp/">野田村</option>
<option value="https://www.town.fudai.iwate.jp/">普代村</option>
<option value="https://www.town.tanohata.iwate.jp/">田野畑村</option>
<option value="https://www.town.iwaizumi.lg.jp/">岩泉町</option>
<option value="https://www.town.yamada.iwate.jp/">山田町</option>
<option value="https://www.town.otsuchi.iwate.jp/">大槌町</option>
<option value="https://www.town.sumita.iwate.jp/">住田町</option>
<option value="https://www.town.kanegasaki.iwate.jp/">金ケ崎町</option>
<option value="https://www.town.hiraizumi.iwate.jp/">平泉町</option>
<option value="https://www.town.ichinohe.iwate.jp/">一戸町</option>
<option value="https://www.town.ninohe.iwate.jp/">軽米町</option>
<option value="https://www.town.karume.iwate.jp/">洋野町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={iwate.src}
              alt="岩手県市区町村マップ"
              useMap="#iwatemap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="iwatemap">
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