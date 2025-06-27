import React, { useEffect } from "react";
import "../../global/css/todofuken.css";
import hokkaido from "@/global/img/hokkaido.png";

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
      <h1 className="hero__title">北海道の魅力</h1>
      <p className="hero__lead">
        北海道は知床や富良野など世界遺産や絶景スポットが豊富で、アイヌ文化やさっぽろ雪まつりなどの伝統行事も魅力です。新鮮な海鮮や乳製品、ジンギスカンなど多彩な地元グルメが楽しめ、広大な自然と人の温かさ、札幌を中心に発達した交通アクセスが快適な住環境を支えています。
      </p>
      <a href="#overview" className="hero__button">詳しく見る</a>
    </div>
  </section>

        {/* 県概要セクション */}
        <section id="overview" className="overview">
    <h2 className="overview__heading">北海道の概要</h2>
    <div className="overview__grid">
      <div className="overview__box">
        <h3>地形・気候</h3>
        <ul>
            <li>位置・面積：北海道地方／約83,424平方km</li>
            <li>主な地形：大雪山系や日高山脈などの山地、石狩平野・十勝平野などの広大な平野、長大な海岸線</li>
            <li>気候区分：太平洋側気候、日本海側気候、オホーツク海側気候（寒冷で積雪が多い）</li>
            <li>平均気温・降水量：春（6℃・130mm）、夏（20℃・110mm）、秋（12℃・150mm）、冬（-3℃・170mm）</li>
          </ul>
      </div>
      <div className="overview__box">
        <h3>人口・中心都市</h3>
        <ul>
            <li>総人口：約5,224,000人（2020年推計、最新の推計値に差し替え可能）</li>
            <li>人口密度：約63人／km²</li>
            <li>中心都市：札幌市（人口約1,973,000人、行政・経済・文化の中心で、雪まつりや歓楽街すすきのなど観光資源が豊富）</li>
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
              <option value="https://www.city.sapporo.jp/">札幌市</option>
<option value="https://www.city.hakodate.hokkaido.jp/">函館市</option>
<option value="https://www.city.otaru.lg.jp/">小樽市</option>
<option value="https://www.city.asahikawa.hokkaido.jp/">旭川市</option>
<option value="https://www.city.muroran.lg.jp/">室蘭市</option>
<option value="https://www.city.kushiro.lg.jp/">釧路市</option>
<option value="https://www.city.obihiro.hokkaido.jp/">帯広市</option>
<option value="https://www.city.kitami.lg.jp/">北見市</option>
<option value="https://www.city.yubari.lg.jp/">夕張市</option>
<option value="https://www.city.iwamizawa.hokkaido.jp/">岩見沢市</option>
<option value="https://www.city.abashiri.hokkaido.jp/">網走市</option>
<option value="https://www.city.bibai.hokkaido.jp/">美唄市</option>
<option value="https://www.city.ashibetsu.hokkaido.jp/">芦別市</option>
<option value="https://www.city.ebetsu.hokkaido.jp/">江別市</option>
<option value="https://www.city.akabira.hokkaido.jp/">赤平市</option>
<option value="https://www.city.monbetsu.hokkaido.jp/">紋別市</option>
<option value="https://www.city.shibetsu.lg.jp/">士別市</option>
<option value="https://www.city.nayoro.lg.jp/">名寄市</option>
<option value="https://www.city.mikasa.hokkaido.jp/">三笠市</option>
<option value="https://www.city.takikawa.hokkaido.jp/">滝川市</option>
<option value="https://www.city.sunagawa.hokkaido.jp/">砂川市</option>
<option value="https://www.city.fukagawa.lg.jp/">深川市</option>
<option value="https://www.city.tomakomai.hokkaido.jp/">苫小牧市</option>
<option value="https://www.city.rumoi.lg.jp/">留萌市</option>
<option value="https://www.city.wakkanai.hokkaido.jp/">稚内市</option>
<option value="https://www.city.bibai.hokkaido.jp/">美唄市</option>
<option value="https://www.city.iwamizawa.hokkaido.jp/">岩見沢市</option>
<option value="https://www.city.ebetsu.hokkaido.jp/">江別市</option>
<option value="https://www.city.akabira.hokkaido.jp/">赤平市</option>
<option value="https://www.city.monbetsu.hokkaido.jp/">紋別市</option>
<option value="https://www.city.shibetsu.lg.jp/">士別市</option>
<option value="https://www.city.nayoro.lg.jp/">名寄市</option>
<option value="https://www.city.mikasa.hokkaido.jp/">三笠市</option>
<option value="https://www.city.takikawa.hokkaido.jp/">滝川市</option>
<option value="https://www.city.sunagawa.hokkaido.jp/">砂川市</option>
<option value="https://www.city.fukagawa.lg.jp/">深川市</option>
<option value="https://www.city.tomakomai.hokkaido.jp/">苫小牧市</option>
<option value="https://www.city.rumoi.lg.jp/">留萌市</option>
<option value="https://www.kuraso-hokkaido.com/town/info/wakkanai/">稚内市</option>
<option value="https://www.city.engaru.lg.jp/">遠軽町</option>
<option value="https://www.town.kamifurano.hokkaido.jp/">上富良野町</option>
<option value="https://www.town.kamiyubetsu.lg.jp/">上湧別町</option>
<option value="https://www.town.kemikawa.hokkaido.jp/">剣淵町</option>
<option value="https://www.town.kikonai.hokkaido.jp/">木古内町</option>
<option value="https://www.town.kimobetsu.hokkaido.jp/">喜茂別町</option>
<option value="https://www.town.kitahiroshima.hokkaido.jp/">北広島市</option>
<option value="https://www.town.koshimizu.hokkaido.jp/">小清水町</option>
<option value="https://www.town.kubota.hokkaido.jp/">久保田町</option>
<option value="https://www.town.kutchan.hokkaido.jp/">倶知安町</option>
<option value="https://www.town.makubetsu.lg.jp/">幕別町</option>
<option value="https://www.town.mashike.hokkaido.jp/">増毛町</option>
<option value="https://www.town.mashu.hokkaido.jp/">摩周町</option>
<option value="https://www.town.matsumae.hokkaido.jp/">松前町</option>
<option value="https://www.town.mikasa.hokkaido.jp/">三笠町</option>
<option value="https://www.town.minamifurano.hokkaido.jp/">南富良野町</option>
<option value="https://www.town.mombetsu.hokkaido.jp/">紋別町</option>
<option value="https://www.town.mukawa.lg.jp/">むかわ町</option>
<option value="https://www.town.nakagawa.hokkaido.jp/">中川町</option>
<option value="https://www.town.nakafurano.hokkaido.jp/">中富良野町</option>
<option value="https://www.town.nanae.hokkaido.jp/">七飯町</option>
<option value="https://www.town.nayoro.hokkaido.jp/">名寄町</option>
<option value="https://www.town.niki.hokkaido.jp/">仁木町</option>
<option value="https://www.town.niseko.lg.jp/">ニセコ町</option>
<option value="https://www.town.noboribetsu.lg.jp/">登別市</option>
<option value="https://www.town.numata.hokkaido.jp/">沼田町</option>
<option value="https://www.town.obira.hokkaido.jp/">小平町</option>
<option value="https://www.town.obihiro.hokkaido.jp/">帯広町</option>
<option value="https://www.town.oketo.hokkaido.jp/">置戸町</option>
<option value="https://www.town.okoppe.hokkaido.jp/">興部町</option>
<option value="https://www.town.oshima.hokkaido.jp/">渡島町</option>
<option value="https://www.town.otobe.hokkaido.jp/">乙部町</option>
<option value="https://www.town.otsu.hokkaido.jp/">乙津町</option>
<option value="https://www.town.ozora.hokkaido.jp/">大空町</option>
<option value="https://www.town.rikubetsu.lg.jp/">陸別町</option>
<option value="https://www.town.rusutsu.lg.jp/">留寿都村</option>
<option value="https://www.town.sarufutsu.hokkaido.jp/">猿払村</option>
<option value="https://www.town.shakotan.lg.jp/">積丹町</option>
<option value="https://www.town.shari.hokkaido.jp/">斜里町</option>
<option value="https://www.town.shibecha.hokkaido.jp/">標茶町</option>
<option value="https://www.town.shibetsu.lg.jp/">標津町</option>
<option value="https://www.town.shikabe.lg.jp/">鹿部町</option>
<option value="https://www.town.shimamaki.lg.jp/">島牧村</option>
<option value="https://www.town.shimizu.hokkaido.jp/">清水町</option>
<option value="https://www.town.shinshinotsu.hokkaido.jp/">新篠津村</option>
<option value="https://www.town.shintotsukawa.lg.jp/">新十津川町</option>
<option value="https://www.town.shiranuka.lg.jp/">白糠町</option>
<option value="https://www.town.shiraoi.hokkaido.jp/">白老町</option>
<option value="https://www.town.shiriuchi.hokkaido.jp/">知内町</option>
<option value="https://www.town.sobetsu.lg.jp/">壮瞥町</option>
<option value="https://www.town.takasu.hokkaido.jp/">鷹栖町</option>
<option value="https://www.town.takikawa.hokkaido.jp/">滝川町</option>
<option value="https://www.town.teshio.lg.jp/">天塩町</option>
<option value="https://www.town.tobetsu.hokkaido.jp/">当別町</option>
<option value="https://www.town.tohma.hokkaido.jp/">当麻町</option>
<option value="https://www.town.tomamae.lg.jp/">苫前町</option>
<option value="https://www.town.tomari.hokkaido.jp/">泊村</option>
<option value="https://www.town.toyako.hokkaido.jp/">洞爺湖町</option>
<option value="https://www.town.toyotomi.hokkaido.jp/">豊富町</option>
<option value="https://www.town.toyoura.hokkaido.jp/">豊浦町</option>
<option value="https://www.town.tsubetsu.hokkaido.jp/">津別町</option>
<option value="https://www.town.urakawa.hokkaido.jp/">浦河町</option>
<option value="https://www.town.urausu.hokkaido.jp/">浦臼町</option>
<option value="https://www.town.urakawa.hokkaido.jp/">浦河町</option>
<option value="https://www.town.urakawa.hokkaido.jp/">浦河町</option>
<option value="https://www.town.urakawa.hokkaido.jp/">浦河町</option>
<option value="https://www.town.usubetsu.hokkaido.jp/">鵜住居町</option>
<option value="https://www.town.utsukushigaoka.hokkaido.jp/">美しが丘町</option>
<option value="https://www.town.wakkanai.hokkaido.jp/">稚内町</option>
<option value="https://www.town.yakumo.lg.jp/">八雲町</option>
<option value="https://www.town.yubari.hokkaido.jp/">夕張町</option>
<option value="https://www.town.yuni.lg.jp/">由仁町</option>
<option value="https://www.town.yutaka.hokkaido.jp/">豊田町</option>
            </select>
            <button id="go" type="button">公式サイトへ</button>
          </div>

          {/* 地図画像 */}
          <div className="map-container">
            <img
              src={hokkaido.src}
              alt="北海道市区町村マップ"
              useMap="#hokkaidomap"
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            />
            <map name="hokkaidomap">
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