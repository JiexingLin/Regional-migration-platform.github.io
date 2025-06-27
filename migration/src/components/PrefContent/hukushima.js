import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import hukushima from "@/global/img/hukushima.png";

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
          <h1 className="hero__title">福島県の魅力</h1>
          <p className="hero__lead">
            福島県は鶴ヶ城や磐梯吾妻スカイライン、五色沼など多彩な観光名所・絶景スポットが点在し、歴史ある伝統文化や祭りも盛んです。会津ラーメンや地元の果物、新鮮な海産物などグルメも豊富で、自然と人情に恵まれ、首都圏からの交通アクセスも良好な住みやすい環境が魅力です
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">福島県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：東北地方／約13,784平方km（全国第3位の広さ）</li>
                <li>主な地形：奥羽山脈や阿武隈山地などの山地、会津盆地などの平野、太平洋・日本海に面した海岸線</li>
                <li>気候区分：太平洋側気候（浜通り）、日本海側気候（会津）、内陸性気候（中通り）</li>
                <li>平均気温・降水量：春（11℃・130mm）、夏（24℃・170mm）、秋（16℃・160mm）、冬（2℃・120mm）※福島市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約1,790,000人（2024年推計）</li>
                <li>人口密度：約130人／km²</li>
                <li>中心都市：福島市（人口約280,000人、県庁所在地で行政・経済の中心、花見山公園や浄土平など観光資源が豊富）[4][5]</li>
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
              <option value="https://www.city.fukushima.fukushima.jp/">福島市</option>
<option value="https://www.city.aizuwakamatsu.fukushima.jp/">会津若松市</option>
<option value="https://www.city.koriyama.lg.jp/">郡山市</option>
<option value="https://www.city.iwaki.lg.jp/">いわき市</option>
<option value="https://www.city.sukagawa.fukushima.jp/">須賀川市</option>
<option value="https://www.city.kitakata.fukushima.jp/">喜多方市</option>
<option value="https://www.city.shirakawa.fukushima.jp/">白河市</option>
<option value="https://www.city.soma.fukushima.jp/">相馬市</option>
<option value="https://www.city.nihonmatsu.lg.jp/">二本松市</option>
<option value="https://www.city.tamura.lg.jp/">田村市</option>
<option value="https://www.city.minamisoma.lg.jp/">南相馬市</option>
<option value="https://www.city.date.fukushima.jp/">伊達市</option>
<option value="https://www.city.motomiya.lg.jp/">本宮市</option>
<option value="https://www.town.nishigo.fukushima.jp/">西郷村</option>
<option value="https://www.town.shirakawa.fukushima.jp/">泉崎村</option>
<option value="https://www.town.nakajima.fukushima.jp/">中島村</option>
<option value="https://www.town.yabuki.fukushima.jp/">矢吹町</option>
<option value="https://www.town.tanagura.fukushima.jp/">棚倉町</option>
<option value="https://www.town.yamatsuri.fukushima.jp/">矢祭町</option>
<option value="https://www.town.hanamiyama.fukushima.jp/">塙町</option>
<option value="https://www.town.samegawa.fukushima.jp/">鮫川村</option>
<option value="https://www.town.ishikawa.fukushima.jp/">石川町</option>
<option value="https://www.town.tamakawa.fukushima.jp/">玉川村</option>
<option value="https://www.town.hirata.fukushima.jp/">平田村</option>
<option value="https://www.town.asakawa.fukushima.jp/">浅川町</option>
<option value="https://www.town.furudono.fukushima.jp/">古殿町</option>
<option value="https://www.town.miharu.fukushima.jp/">三春町</option>
<option value="https://www.town.ono.fukushima.jp/">小野町</option>
<option value="https://www.town.hirono.fukushima.jp/">広野町</option>
<option value="https://www.town.naraha.lg.jp/">楢葉町</option>
<option value="https://www.town.tomioka.fukushima.jp/">富岡町</option>
<option value="https://www.town.kawauchi.fukushima.jp/">川内村</option>
<option value="https://www.town.okuma.fukushima.jp/">大熊町</option>
<option value="https://www.town.futaba.fukushima.jp/">双葉町</option>
<option value="https://www.town.namie.fukushima.jp/">浪江町</option>
<option value="https://www.town.katsurao.fukushima.jp/">葛尾村</option>
<option value="https://www.town.shinchi.fukushima.jp/">新地町</option>
<option value="https://www.town.iitate.fukushima.jp/">飯舘村</option>
<option value="https://www.town.aizubange.fukushima.jp/">会津坂下町</option>
<option value="https://www.town.yanaizu.fukushima.jp/">柳津町</option>
<option value="https://www.town.mishima.fukushima.jp/">三島町</option>
<option value="https://www.town.kaneyama.fukushima.jp/">金山町</option>
<option value="https://www.town.showa.fukushima.jp/">昭和村</option>
<option value="https://www.town.aizumisato.fukushima.jp/">会津美里町</option>
<option value="https://www.town.nishiaizu.fukushima.jp/">西会津町</option>
<option value="https://www.town.inawashiro.fukushima.jp/">猪苗代町</option>
<option value="https://www.town.bandai.fukushima.jp/">磐梯町</option>
<option value="https://www.town.kitashiobara.fukushima.jp/">北塩原村</option>
<option value="https://www.town.yugawa.fukushima.jp/">湯川村</option>
<option value="https://www.town.agatsuma.fukushima.jp/">会津高田町</option>
<option value="https://www.town.minamiaizu.fukushima.jp/">南会津町</option>
<option value="https://www.town.shimogo.fukushima.jp/">下郷町</option>
<option value="https://www.town.hinoemata.fukushima.jp/">檜枝岐村</option>
<option value="https://www.town.tadami.fukushima.jp/">只見町</option>
<option value="https://www.town.minamiaizu.fukushima.jp/">南会津町</option>
<option value="https://www.town.shimogo.fukushima.jp/">下郷町</option>
<option value="https://www.town.hinoemata.fukushima.jp/">檜枝岐村</option>
<option value="https://www.town.tadami.fukushima.jp/">只見町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={hukushima.src}
              alt="福島県市区町村マップ"
              useMap="#hukushimap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="hukushimap">
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