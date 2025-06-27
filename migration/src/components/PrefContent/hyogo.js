import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import hyogo from "@/global/img/hyogo.png";

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
          <h1 className="hero__title">兵庫県の魅力</h1>
          <p className="hero__lead">
            兵庫県は世界遺産「姫路城」や有馬温泉、明石海峡大橋など多彩な観光名所・絶景スポットが広がり、伝統文化や祭りも盛んです。神戸牛や出石そばなど地元グルメも豊富で、自然と人情、関西圏からの良好な交通アクセスが住みやすい環境を支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">兵庫県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：近畿地方／約8,401平方km</li>
                <li>主な地形：六甲山地・中国山地などの山地、播磨平野、瀬戸内海・日本海に面した長い海岸線</li>
                <li>気候区分：瀬戸内式気候（温暖少雨・神戸など）、日本海側気候（北部・冬季は積雪）、内陸性気候（山地）</li>
                <li>平均気温・降水量：春（14℃・130mm）、夏（26℃・170mm）、秋（18℃・160mm）、冬（5℃・100mm）※神戸市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約5,418,000人（2024年推計）</li>
                <li>人口密度：約645人／km²</li>
                <li>中心都市：神戸市（人口約1,524,000人、県庁所在地で国際港湾都市、観光・経済・文化の中心）[7][10]</li>
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
              <option value="https://www.city.kobe.lg.jp/">神戸市</option>
<option value="https://www.city.himeji.lg.jp/">姫路市</option>
<option value="https://www.city.amagasaki.hyogo.jp/">尼崎市</option>
<option value="https://www.city.akashi.lg.jp/">明石市</option>
<option value="https://www.city.nishinomiya.lg.jp/">西宮市</option>
<option value="https://www.city.ashiya.lg.jp/">芦屋市</option>
<option value="https://www.city.itami.lg.jp/">伊丹市</option>
<option value="https://www.city.aioi.lg.jp/">相生市</option>
<option value="https://www.city.toyooka.lg.jp/">豊岡市</option>
<option value="https://www.city.kakogawa.lg.jp/">加古川市</option>
<option value="https://www.city.akou.lg.jp/">赤穂市</option>
<option value="https://www.city.nishiwaki.lg.jp/">西脇市</option>
<option value="https://www.city.takarazuka.hyogo.jp/">宝塚市</option>
<option value="https://www.city.miki.lg.jp/">三木市</option>
<option value="https://www.city.takasago.lg.jp/">高砂市</option>
<option value="https://www.city.kasai.hyogo.jp/">加西市</option>
<option value="https://www.city.sanda.lg.jp/">三田市</option>
<option value="https://www.city.kasai.hyogo.jp/">加東市</option>
<option value="https://www.city.asago.hyogo.jp/">朝来市</option>
<option value="https://www.city.awaji.lg.jp/">淡路市</option>
<option value="https://www.city.sumoto.lg.jp/">洲本市</option>
<option value="https://www.city.minamiawaji.hyogo.jp/">南あわじ市</option>
<option value="https://www.city.yabu.hyogo.jp/">養父市</option>
<option value="https://www.city.tamba.lg.jp/">丹波市</option>
<option value="https://www.city.tambasasayama.hyogo.jp/">丹波篠山市</option>
<option value="https://www.city.shiso.lg.jp/">宍粟市</option>
<option value="https://www.city.kami.hyogo.jp/">加美町（※正しくは香美町）</option>
<option value="https://www.city.shinonsen.lg.jp/">新温泉町</option>
<option value="https://www.town.inagawa.lg.jp/">猪名川町</option>
<option value="https://www.town.taishi.hyogo.jp/">太子町</option>
<option value="https://www.town.kamikawa.hyogo.jp/">神河町</option>
<option value="https://www.town.ichikawa.lg.jp/">市川町</option>
<option value="https://www.town.fukusaki.hyogo.jp/">福崎町</option>
<option value="https://www.town.tatsuno.lg.jp/">たつの市（※正しくはたつの市）</option>
<option value="https://www.town.ako.lg.jp/">上郡町</option>
<option value="https://www.town.sayo.lg.jp/">佐用町</option>
<option value="https://www.town.taka.lg.jp/">多可町</option>
<option value="https://www.town.kami.hyogo.jp/">香美町</option>
<option value="https://www.town.shinonsen.lg.jp/">新温泉町</option>
<option value="https://www.town.awaji.lg.jp/">淡路町（※現在は淡路市に合併）</option>
<option value="https://www.town.sumoto.lg.jp/">五色町（※現在は洲本市に合併）</option>
<option value="https://www.town.minamiawaji.hyogo.jp/">南淡町（※現在は南あわじ市に合併）</option>
<option value="https://www.town.kamikawa.hyogo.jp/">家島町（※現在は姫路市に合併）</option>
<option value="https://www.town.yumesaki.lg.jp/">夢前町（※現在は姫路市に合併）</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={hyogo.src}
              alt="兵庫県市区町村マップ"
              useMap="#hyogomap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="hyogomap">
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