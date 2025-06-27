import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import aomori from "@/global/img/aomori.png";

export default function Aomori() {
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
            <h1 className="hero__title">青森県の魅力</h1>
            <p className="hero__lead">
              青森県は十和田湖や白神山地、八甲田山など雄大な自然景観と、世界遺産や仏ヶ浦などの絶景スポットが魅力です。ねぶた祭りや弘前さくらまつりなどの伝統行事、りんごや海産物などの地元グルメも豊富で、自然と人情に恵まれ、主要都市への交通アクセスも良好です
            </p>
            <a href="#overview" className="hero__button">詳しく見る</a>
          </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
          <h2 className="overview__heading">青森県の概要</h2>
          <div className="overview__grid">
            <div className="overview__box">
              <h3>地形・気候</h3>
              <ul>
                  <li>位置・面積：東北地方北部／9,646平方km</li>
                  <li>主な地形：奥羽山脈の北端部（十和田・八甲田山系）、沖積平野、火山地、長い海岸線</li>
                  <li>気候区分：日本海側気候（冬の積雪が多い）、太平洋側気候（ヤマセと冷涼）、海洋性気候</li>
                  <li>平均気温・降水量：春（8℃・120mm）、夏（21℃・140mm）、秋（14℃・150mm）、冬（0℃・170mm）※青森市の都市部目安</li>
                </ul>
            </div>
            <div className="overview__box">
              <h3>人口・中心都市</h3>
              <ul>
                  <li>総人口：約120万人（2023年推計）</li>
                  <li>人口密度：約124人／km²</li>
                  <li>中心都市：青森市（人口約27万人、県庁所在地で観光・経済の拠点、ねぶた祭りや青森駅周辺の利便性が特徴）</li>
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
              <option value="https://www.city.aomori.aomori.jp/">青森市</option>
<option value="https://www.city.hirosaki.aomori.jp/">弘前市</option>
<option value="https://www.city.hachinohe.aomori.jp/">八戸市</option>
<option value="https://www.city.goshogawara.lg.jp/">五所川原市</option>
<option value="https://www.city.mutsu.lg.jp/">むつ市</option>
<option value="https://www.city.kuroishi.aomori.jp/">黒石市</option>
<option value="https://www.city.tsugaru.aomori.jp/">つがる市</option>
<option value="https://www.city.misawa.lg.jp/">三沢市</option>
<option value="https://www.city.towada.lg.jp/">十和田市</option>
<option value="https://www.city.hirakawa.lg.jp/">平川市</option>
<option value="https://www.town.aomori.aomori.jp/yomogita/">蓬田村</option>
<option value="https://www.town.imabetsu.lg.jp/">今別町</option>
<option value="https://www.town.sotogahama.lg.jp/">外ヶ浜町</option>
<option value="https://www.town.yomogita.lg.jp/">蓬田村</option>
<option value="https://www.town.sotogahama.lg.jp/">外ヶ浜町</option>
<option value="https://www.town.itayanagi.aomori.jp/">板柳町</option>
<option value="https://www.town.tsuruta.aomori.jp/">鶴田町</option>
<option value="https://www.town.nakadomari.lg.jp/">中泊町</option>
<option value="https://www.town.fukaura.lg.jp/">深浦町</option>
<option value="https://www.town.ajigasawa.lg.jp/">鰺ヶ沢町</option>
<option value="https://www.town.rokunohe.aomori.jp/">六戸町</option>
<option value="https://www.town.shichinohe.lg.jp/">七戸町</option>
<option value="https://www.town.gonohe.aomori.jp/">五戸町</option>
<option value="https://www.town.takko.lg.jp/">田子町</option>
<option value="https://www.town.nanbu.aomori.jp/">南部町</option>
<option value="https://www.town.sannohe.aomori.jp/">三戸町</option>
<option value="https://www.town.hashikami.lg.jp/">階上町</option>
<option value="https://www.town.shingo.aomori.jp/">新郷村</option>
<option value="https://www.town.oirase.aomori.jp/">おいらせ町</option>
<option value="https://www.town.tsuruta.aomori.jp/">鶴田町</option>
<option value="https://www.town.yokohama.lg.jp/">横浜町</option>
<option value="https://www.town.noheji.aomori.jp/">野辺地町</option>
<option value="https://www.town.rokkasho.lg.jp/">六ヶ所村</option>
<option value="https://www.town.hiranai.aomori.jp/">平内町</option>
<option value="https://www.town.shichinohe.lg.jp/">七戸町</option>
<option value="https://www.town.tohoku.lg.jp/">東北町</option>
<option value="https://www.town.kazamaura.lg.jp/">風間浦村</option>
<option value="https://www.town.sai.lg.jp/">佐井村</option>
<option value="https://www.town.omazaki.aomori.jp/">大間町</option>
<option value="https://www.town.higashidori.lg.jp/">東通村</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={aomori.src}
              alt="青森県市区町村マップ"
              useMap="#aomorimap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="aomorimap">
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