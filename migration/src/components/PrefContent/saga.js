import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import saga from "@/global/img/saga.png";

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
          <h1 className="hero__title">佐賀県の魅力</h1>
          <p className="hero__lead">
            佐賀県は日本三大松原の虹の松原や七ツ釜、御船山楽園などの絶景、吉野ヶ里遺跡や唐津城、有田・伊万里焼といった歴史文化、唐津くんちや伊万里トンテントン祭りなど伝統行事も豊富です。呼子のイカや佐賀牛など地元グルメも充実し、温泉や自然、人の温かさ、西九州新幹線など交通アクセスの良さが住みやすさを支えています
          </p>
          <a href="#overview" className="hero__button">詳しく見る</a>
        </div>
        </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
        <h2 className="overview__heading">佐賀県の概要</h2>
        <div className="overview__grid">
          <div className="overview__box">
            <h3>地形・気候</h3>
            <ul>
                <li>位置・面積：九州地方／約2,440平方km</li>
                <li>主な地形：脊振山地、佐賀平野、有明海・玄界灘に面した海岸線、干潟や棚田も点在</li>
                <li>気候区分：日本海側気候（冬は曇天・雨が多い）、一部太平洋側気候の影響も受ける</li>
                <li>平均気温・降水量：春（15℃・130mm）、夏（27℃・290mm）、秋（19℃・120mm）、冬（7℃・55mm）※佐賀市の都市部目安</li>
              </ul>
          </div>
          <div className="overview__box">
            <h3>人口・中心都市</h3>
            <ul>
                <li>総人口：約803,000人（2025年推計）</li>
                <li>人口密度：約329人／km²</li>
                <li>中心都市：佐賀市（人口約230,000人、県庁所在地で行政・経済の中心、佐賀城やバルーンフェスタ、温泉や文化施設も豊富）</li>
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
              <option value="https://www.city.saga.lg.jp/">佐賀市</option>
<option value="https://www.city.karatsu.lg.jp/">唐津市</option>
<option value="https://www.city.tosu.lg.jp/">鳥栖市</option>
<option value="https://www.city.takeo.lg.jp/">武雄市</option>
<option value="https://www.city.imari.saga.jp/">伊万里市</option>
<option value="https://www.city.kashima.saga.jp/">鹿島市</option>
<option value="https://www.city.oureshi.lg.jp/">小城市</option>
<option value="https://www.city.ureshino.lg.jp/">嬉野市</option>
<option value="https://www.city.kanzaki.saga.jp/">神埼市</option>
<option value="https://www.city.taku.lg.jp/">多久市</option>
<option value="https://www.town.yoshinogari.lg.jp/">吉野ヶ里町</option>
<option value="https://www.town.kamimine.lg.jp/">上峰町</option>
<option value="https://www.town.kiyama.lg.jp/">基山町</option>
<option value="https://www.town.miyaki.lg.jp/">みやき町</option>
<option value="https://www.town.tara.lg.jp/">太良町</option>
<option value="https://www.town.omachi.saga.jp/">大町町</option>
<option value="https://www.town.kouhoku.saga.jp/">江北町</option>
<option value="https://www.town.shiroishi.lg.jp/">白石町</option>
<option value="https://www.town.arita.lg.jp/">有田町</option>
<option value="https://www.town.genkai.lg.jp/">玄海町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={saga.src}
              alt="佐賀県市区町村マップ"
              useMap="#sagamap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="sagamap">
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