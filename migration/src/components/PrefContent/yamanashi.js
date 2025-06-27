import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import yamanashi from "@/global/img/yamanashi.png";

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
          <h1 className="hero__title">山梨県の魅力</h1>
          <p className="hero__lead">
            山梨県は世界遺産・富士山や河口湖、昇仙峡などの絶景スポットが豊富で、桃源郷春祭りや伝統工芸「甲州印伝」など文化も息づきます。ほうとうやワイン、桃・ぶどうなど地元グルメも多彩。果物狩りや温泉、自然と人の温かさ、首都圏からの良好な交通アクセスも魅力です
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">山梨県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：中部地方／約4,465平方km</li>
                <li>主な地形：富士山・南アルプスなどの山地、甲府盆地、河口湖や山中湖などの湖沼、海岸線はなし</li>
                <li>気候区分：太平洋側気候（内陸性で寒暖差大きい）</li>
                <li>平均気温・降水量：春（13℃・110mm）、夏（25℃・170mm）、秋（15℃・120mm）、冬（3℃・40mm）※甲府市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約790,000人（2025年推計）</li>
                <li>人口密度：約177人／km²</li>
                <li>中心都市：甲府市（人口約185,000人、県庁所在地で行政・経済・文化の中心、武田神社や昇仙峡、ワインやほうとうなど観光資源も豊富）</li>
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
              <option value="https://www.city.kofu.yamanashi.jp/">甲府市</option>
<option value="https://www.city.fuefuki.yamanashi.jp/">笛吹市</option>
<option value="https://www.city.fujiyoshida.yamanashi.jp/">富士吉田市</option>
<option value="https://www.city.minami-alps.yamanashi.jp/">南アルプス市</option>
<option value="https://www.city.tsuru.yamanashi.jp/">都留市</option>
<option value="https://www.city.uenohara.yamanashi.jp/">上野原市</option>
<option value="https://www.city.koshu.yamanashi.jp/">甲州市</option>
<option value="https://www.city.yamanashi.yamanashi.jp/">山梨市</option>
<option value="https://www.city.omiya.yamanashi.jp/">大月市</option>
<option value="https://www.city.hokuto.yamanashi.jp/">北杜市</option>
<option value="https://www.city.nirasaki.lg.jp/">韮崎市</option>
<option value="https://www.city.kai.yamanashi.jp/">甲斐市</option>
<option value="https://www.city.chuo.yamanashi.jp/">中央市</option>
<option value="https://www.town.fujikawaguchiko.lg.jp/">富士河口湖町</option>
<option value="https://www.town.nishikatsura.yamanashi.jp/">西桂町</option>
<option value="https://www.town.yamanakako.lg.jp/">山中湖村</option>
<option value="https://www.town.doshi.lg.jp/">道志村</option>
<option value="https://www.town.narusawa.yamanashi.jp/">鳴沢村</option>
<option value="https://www.town.oshino.lg.jp/">忍野村</option>
<option value="https://www.town.yamanakako.lg.jp/">山中湖村</option>
<option value="https://www.town.tsuru.yamanashi.jp/">上野原市（町域）</option>
<option value="https://www.town.ichikawamisato.yamanashi.jp/">市川三郷町</option>
<option value="https://www.town.showa.yamanashi.jp/">昭和町</option>
<option value="https://www.town.chuo.yamanashi.jp/">中央市（町域）</option>
<option value="https://www.town.minobu.lg.jp/">身延町</option>
<option value="https://www.town.nanbu.lg.jp/">南部町</option>
<option value="https://www.town.hayakawa.lg.jp/">早川町</option>
<option value="https://www.town.fujikawa.yamanashi.jp/">富士川町</option>
<option value="https://www.town.ichikawamisato.yamanashi.jp/">市川三郷町</option>
<option value="https://www.town.minobu.lg.jp/">身延町</option>
<option value="https://www.town.nanbu.lg.jp/">南部町</option>
<option value="https://www.town.hayakawa.lg.jp/">早川町</option>
<option value="https://www.town.fujikawa.yamanashi.jp/">富士川町</option>
<option value="https://www.town.showa.yamanashi.jp/">昭和町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={yamanashi.src}
              alt="山梨県市区町村マップ"
              useMap="#yamanashimap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="yamanashimap">
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