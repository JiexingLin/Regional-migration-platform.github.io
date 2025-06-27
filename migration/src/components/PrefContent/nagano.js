import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import nagano from "@/global/img/nagano.png";

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
          <h1 className="hero__title">長野県の魅力</h1>
          <p className="hero__lead">
            長野県は上高地や美ヶ原高原、善光寺、松本城など名所・絶景が豊富で、伝統的な祭りや工芸、歴史文化も息づきます。信州そばやおやき、りんご、雷鳥の里や七味唐からしなど地元グルメ・特産品も多彩。豊かな自然と人の温かさ、首都圏からの交通アクセスの良さが住みやすさを支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">長野県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：中部地方／約13,561平方km</li>
                <li>主な地形：北アルプス・中央アルプス・南アルプスの山岳地帯、諏訪盆地・松本平などの平野、河川や湖も点在</li>
                <li>気候区分：内陸性気候（寒暖差が大きい）、一部太平洋側気候・日本海側気候の影響も受ける</li>
                <li>平均気温・降水量：春（10℃・90mm）、夏（22℃・170mm）、秋（13℃・110mm）、冬（-1℃・50mm）※長野市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約2,003,000人（2025年推計）</li>
                <li>人口密度：約148人／km²</li>
                <li>中心都市：長野市（人口約360,000人、県庁所在地で行政・経済・文化の中心、善光寺や門前町の賑わいが特徴）</li>
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
              <option value="https://www.city.nagano.nagano.jp/">長野市</option>
<option value="https://www.city.matsumoto.nagano.jp/">松本市</option>
<option value="https://www.city.ueda.nagano.jp/">上田市</option>
<option value="https://www.city.okaya.lg.jp/">岡谷市</option>
<option value="https://www.city.iida.lg.jp/">飯田市</option>
<option value="https://www.city.suwa.lg.jp/">諏訪市</option>
<option value="https://www.city.saku.nagano.jp/">佐久市</option>
<option value="https://www.city.chikuma.lg.jp/">千曲市</option>
<option value="https://www.city.shiojiri.lg.jp/">塩尻市</option>
<option value="https://www.city.komoro.lg.jp/">小諸市</option>
<option value="https://www.city.iiyama.nagano.jp/">飯山市</option>
<option value="https://www.city.anan.nagano.jp/">安曇野市</option>
<option value="https://www.city.tomi.nagano.jp/">東御市</option>
<option value="https://www.city.komagane.nagano.jp/">駒ヶ根市</option>
<option value="https://www.city.ina.nagano.jp/">伊那市</option>
<option value="https://www.city.kiso.nagano.jp/">木曽町</option>
<option value="https://www.city.minamiminowa.lg.jp/">南箕輪村</option>
<option value="https://www.city.suzaka.nagano.jp/">須坂市</option>
<option value="https://www.city.azumino.nagano.jp/">安曇野市</option>
<option value="https://www.town.shimosuwa.lg.jp/">下諏訪町</option>
<option value="https://www.town.fujimi.lg.jp/">富士見町</option>
<option value="https://www.town.hara.lg.jp/">原村</option>
<option value="https://www.town.miyada.lg.jp/">宮田村</option>
<option value="https://www.town.minowa.lg.jp/">箕輪町</option>
<option value="https://www.town.tatsuno.nagano.jp/">辰野町</option>
<option value="https://www.town.minamiminowa.lg.jp/">南箕輪村</option>
<option value="https://www.town.kiso.nagano.jp/">木曽町</option>
<option value="https://www.town.kiso.nagano.jp/">木祖村</option>
<option value="https://www.town.kaida.nagano.jp/">開田村</option>
<option value="https://www.town.nagawa.nagano.jp/">長和町</option>
<option value="https://www.town.nagiso.nagano.jp/">南木曽町</option>
<option value="https://www.town.agasawara.nagano.jp/">阿智村</option>
<option value="https://www.town.anan.nagano.jp/">阿南町</option>
<option value="https://www.town.urugi.nagano.jp/">売木村</option>
<option value="https://www.town.tenryu.nagano.jp/">天龍村</option>
<option value="https://www.town.yasuoka.nagano.jp/">泰阜村</option>
<option value="https://www.town.shimojo.nagano.jp/">下條村</option>
<option value="https://www.town.agematsu.nagano.jp/">上松町</option>
<option value="https://www.town.otaki.nagano.jp/">大滝村</option>
<option value="https://www.town.ookuwa.nagano.jp/">大桑村</option>
<option value="https://www.town.oyamada.nagano.jp/">小山田村</option>
<option value="https://www.town.kawakami.nagano.jp/">川上村</option>
<option value="https://www.town.minamiaiki.nagano.jp/">南相木村</option>
<option value="https://www.town.kitaaiki.nagano.jp/">北相木村</option>
<option value="https://www.town.sakuho.nagano.jp/">佐久穂町</option>
<option value="https://www.town.yachiho.nagano.jp/">八千穂村</option>
<option value="https://www.town.saku.nagano.jp/">佐久市</option>
<option value="https://www.town.tateshina.nagano.jp/">立科町</option>
<option value="https://www.town.aoki.nagano.jp/">青木村</option>
<option value="https://www.town.nagawa.nagano.jp/">長和町</option>
<option value="https://www.town.shimosuwa.lg.jp/">下諏訪町</option>
<option value="https://www.town.okaya.lg.jp/">岡谷市</option>
<option value="https://www.town.kiso.nagano.jp/">木曽町</option>
<option value="https://www.town.nakagawa.nagano.jp/">中川村</option>
<option value="https://www.town.shiojiri.lg.jp/">塩尻市</option>
<option value="https://www.town.ikusaka.nagano.jp/">生坂村</option>
<option value="https://www.town.yamagata.nagano.jp/">山形村</option>
<option value="https://www.town.asahi.nagano.jp/">朝日村</option>
<option value="https://www.town.chikuhoku.lg.jp/">筑北村</option>
<option value="https://www.town.ikeda.nagano.jp/">池田町</option>
<option value="https://www.town.matsukawa.lg.jp/">松川村</option>
<option value="https://www.town.hakuba.lg.jp/">白馬村</option>
<option value="https://www.town.otari.nagano.jp/">小谷村</option>
<option value="https://www.town.ogasawara.nagano.jp/">小笠原村</option>
<option value="https://www.town.iijima.lg.jp/">飯島町</option>
<option value="https://www.town.takagi.nagano.jp/">高森町</option>
<option value="https://www.town.matsukawa.lg.jp/">松川町</option>
<option value="https://www.town.takayama.nagano.jp/">高山村</option>
<option value="https://www.town.obuse.nagano.jp/">小布施町</option>
<option value="https://www.town.sakaki.lg.jp/">坂城町</option>
<option value="https://www.town.yamanouchi.nagano.jp/">山ノ内町</option>
<option value="https://www.town.kijimadaira.nagano.jp/">木島平村</option>
<option value="https://www.town.nakano.nagano.jp/">中野市</option>
<option value="https://www.town.nozawaonsen.nagano.jp/">野沢温泉村</option>
<option value="https://www.town.iiyama.nagano.jp/">飯山市</option>
<option value="https://www.town.sakae.nagano.jp/">栄村</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={nagano.src}
              alt="長野県市区町村マップ"
              useMap="#naganomap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="naganomap">
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