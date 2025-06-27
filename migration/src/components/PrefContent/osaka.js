import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import osaka from "@/global/img/osaka.png";

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
          <h1 className="hero__title">大阪府の魅力</h1>
          <p className="hero__lead">
            大阪府は大阪城や通天閣、ユニバーサル・スタジオ・ジャパンなど多彩な観光名所が揃い、道頓堀や黒門市場などグルメスポットも充実しています。伝統的な祭りや落語・漫才文化も根付いており、たこ焼きやお好み焼きなど地元グルメも有名。温暖な気候と人情味あふれる雰囲気、関西圏・全国への抜群の交通アクセスが住みやすさを支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">大阪府の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：近畿地方／約1,905平方km</li>
                <li>主な地形：大阪平野、北部に北摂山地、南部に和泉山脈、大阪湾に面した海岸線</li>
                <li>気候区分：太平洋側気候（温暖で降水量はやや多め）</li>
                <li>平均気温・降水量：春（15℃・120mm）、夏（28℃・160mm）、秋（19℃・130mm）、冬（7℃・50mm）※大阪市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約8,710,000人（2025年推計）</li>
                <li>人口密度：約4,574人／km²</li>
                <li>中心都市：大阪市（人口約2,740,000人、県庁所在地で行政・経済・文化の中心、大阪城や道頓堀、梅田など観光・商業の拠点）</li>
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
              <option value="https://www.city.osaka.lg.jp/">大阪市</option>
<option value="https://www.city.sakai.lg.jp/">堺市</option>
<option value="https://www.city.toyonaka.osaka.jp/">豊中市</option>
<option value="https://www.city.ikeda.osaka.jp/">池田市</option>
<option value="https://www.city.suita.osaka.jp/">吹田市</option>
<option value="https://www.city.takatsuki.osaka.jp/">高槻市</option>
<option value="https://www.city.moriguchi.osaka.jp/">守口市</option>
<option value="https://www.city.hirakata.osaka.jp/">枚方市</option>
<option value="https://www.city.kadoma.osaka.jp/">門真市</option>
<option value="https://www.city.settsu.osaka.jp/">摂津市</option>
<option value="https://www.city.ibaraki.osaka.jp/">茨木市</option>
<option value="https://www.city.yao.osaka.jp/">八尾市</option>
<option value="https://www.city.izumiotsu.lg.jp/">泉大津市</option>
<option value="https://www.city.takaishi.lg.jp/">高石市</option>
<option value="https://www.city.sennan.lg.jp/">泉南市</option>
<option value="https://www.city.habikino.lg.jp/">羽曳野市</option>
<option value="https://www.city.matsubara.osaka.jp/">松原市</option>
<option value="https://www.city.kashiwara.osaka.jp/">柏原市</option>
<option value="https://www.city.fujiidera.lg.jp/">藤井寺市</option>
<option value="https://www.city.osakasayama.osaka.jp/">大阪狭山市</option>
<option value="https://www.city.izumi.osaka.jp/">和泉市</option>
<option value="https://www.city.kaizuka.lg.jp/">貝塚市</option>
<option value="https://www.city.kishiwada.osaka.jp/">岸和田市</option>
<option value="https://www.city.tadaoka.lg.jp/">忠岡町</option>
<option value="https://www.city.hannan.lg.jp/">阪南市</option>
<option value="https://www.city.misaki.lg.jp/">岬町</option>
<option value="https://www.town.kumatori.lg.jp/">熊取町</option>
<option value="https://www.town.izumisano.lg.jp/">田尻町</option>
<option value="https://www.town.sennan.lg.jp/">泉佐野市</option>
<option value="https://www.town.shijonawate.lg.jp/">四條畷市</option>
<option value="https://www.city.daito.lg.jp/">大東市</option>
<option value="https://www.city.higashiosaka.lg.jp/">東大阪市</option>
<option value="https://www.city.minoh.lg.jp/">箕面市</option>
<option value="https://www.city.katano.osaka.jp/">交野市</option>
<option value="https://www.city.shijonawate.lg.jp/">四條畷市</option>
<option value="https://www.city.shimamoto.osaka.jp/">島本町</option>
<option value="https://www.town.toyono.osaka.jp/">豊能町</option>
<option value="https://www.town.nose.osaka.jp/">能勢町</option>
<option value="https://www.town.hannan.lg.jp/">河南町</option>
<option value="https://www.town.kawachinagano.osaka.jp/">千早赤阪村</option>
<option value="https://www.town.taishi.osaka.jp/">太子町</option>
<option value="https://www.town.kanan.osaka.jp/">河南町</option>
<option value="https://www.town.chihayaakasaka.osaka.jp/">千早赤阪村</option>
<option value="https://www.town.osakasayama.osaka.jp/">大阪狭山市</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={osaka.src}
              alt="大阪府市区町村マップ"
              useMap="#osakamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="osakamap">
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