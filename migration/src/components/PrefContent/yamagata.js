import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import yamagata from "@/global/img/yamagata.png";

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
          <h1 className="hero__title">山形県の魅力</h1>
          <p className="hero__lead">
            山形県は山寺（立石寺）や銀山温泉、蔵王連峰、白川湖の水没林など四季折々の絶景が楽しめ、花笠まつりや伝統的な温泉文化も魅力です。さくらんぼや米沢牛、玉こんにゃくなど地元グルメも豊富で、自然と人の温かさ、東京から新幹線で約3時間の好アクセスが住みやすさを支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">山形県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：東北地方／約9,323平方km</li>
                <li>主な地形：奥羽山脈・出羽山地などの山地、庄内平野、日本海に面した海岸線</li>
                <li>気候区分：日本海側気候（冬は雪が多く、夏は比較的高温）</li>
                <li>平均気温・降水量：春（12℃・110mm）、夏（25℃・170mm）、秋（15℃・130mm）、冬（2℃・180mm）※山形市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,030,000人（2025年推計）</li>
                <li>人口密度：約110人／km²</li>
                <li>中心都市：山形市（人口約245,000人、県庁所在地で行政・経済・文化の中心、山寺や蔵王温泉、花笠まつりなど観光資源も豊富）</li>
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
              <option value="https://www.city.yamagata-yamagata.lg.jp/">山形市</option>
<option value="https://www.city.tsuruoka.lg.jp/">鶴岡市</option>
<option value="https://www.city.sakata.lg.jp/">酒田市</option>
<option value="https://www.city.shinjo.yamagata.jp/">新庄市</option>
<option value="https://www.city.yonezawa.yamagata.jp/">米沢市</option>
<option value="https://www.city.obanazawa.yamagata.jp/">尾花沢市</option>
<option value="https://www.city.nagai.yamagata.jp/">長井市</option>
<option value="https://www.city.nanyo.yamagata.jp/">南陽市</option>
<option value="https://www.city.kaminoyama.yamagata.jp/">上山市</option>
<option value="https://www.city.murayama.lg.jp/">村山市</option>
<option value="https://www.city.tendo.yamagata.jp/">天童市</option>
<option value="https://www.city.higashine.yamagata.jp/">東根市</option>
<option value="https://www.city.sagae.yamagata.jp/">寒河江市</option>
<option value="https://www.town.yamanobe.yamagata.jp/">山辺町</option>
<option value="https://www.town.nakayama.yamagata.jp/">中山町</option>
<option value="https://www.town.kahoku.yamagata.jp/">河北町</option>
<option value="https://www.town.nishikawa.yamagata.jp/">西川町</option>
<option value="https://www.town.asahi.yamagata.jp/">朝日町</option>
<option value="https://www.town.oe.yamagata.jp/">大江町</option>
<option value="https://www.town.oguni.yamagata.jp/">小国町</option>
<option value="https://www.town.shirataka.yamagata.jp/">白鷹町</option>
<option value="https://www.town.iide.yamagata.jp/">飯豊町</option>
<option value="https://www.town.kawanishi.yamagata.jp/">川西町</option>
<option value="https://www.town.takahata.yamagata.jp/">高畠町</option>
<option value="https://www.town.yuza.lg.jp/">遊佐町</option>
<option value="https://www.town.sakegawa.yamagata.jp/">鮭川村</option>
<option value="https://www.town.funagata.yamagata.jp/">舟形町</option>
<option value="https://www.town.mogami.yamagata.jp/">最上町</option>
<option value="https://www.town.kaneyama.yamagata.jp/">金山町</option>
<option value="https://www.town.mamurogawa.yamagata.jp/">真室川町</option>
<option value="https://www.town.okura.yamagata.jp/">大蔵村</option>
<option value="https://www.town.tozawa.yamagata.jp/">戸沢村</option>
<option value="https://www.town.sho-nai.lg.jp/">庄内町</option>
<option value="https://www.town.mikawa.yamagata.jp/">三川町</option>
<option value="https://www.town.yuza.lg.jp/">遊佐町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={yamagata.src}
              alt="山形県市区町村マップ"
              useMap="#yamagatamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="yamagatamap">
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