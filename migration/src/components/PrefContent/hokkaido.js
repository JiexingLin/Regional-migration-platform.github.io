import React, { useRef } from "react";

// 注意：图片请放在 public/global/img/hokkaido.png 下
//      这样 src="/global/img/hokkaido.png" 就能直接访问

export default function Hokkaido() {
  // 用于市区町村跳转
  const muniRef = useRef();

  // 跳转按钮点击事件
  const handleGoClick = () => {
    const url = muniRef.current.value;
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("市区町村を選択してください");
    }
  };

  return (
    <div>

      <main>
        {/* ① ヒーローセクション */}
        <section className="hero">
          <div className="hero__inner">
            <h1 className="hero__title">北海道の魅力</h1>
            <p className="hero__lead">
              北海道は知床や富良野など世界遺産や絶景スポットが豊富で、アイヌ文化やさっぽろ雪まつりなどの伝統行事も魅力です。新鮮な海鮮や乳製品、ジンギスカンなど多彩な地元グルメが楽しめ、広大な自然と人の温かさ、札幌を中心に発達した交通アクセスが快適な住環境を支えています。
            </p>
            <a href="#overview" className="hero__button">詳しく見る</a>
          </div>
        </section>

        {/* ② 県概要セクション */}
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
          <div id="municipality-select">
            <label htmlFor="muni">市区町村を選択：</label>
            <select id="muni" ref={muniRef}>
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
            <button type="button" onClick={handleGoClick}>公式サイトへ</button>
          </div>
          {/* 地图图片和区域（可选实现） */}
          <img
            src="/global/img/hokkaido.png"
            alt="北海道市区町村マップ"
            usemap="#hokkaidomap"
            style={{ maxWidth: "100%", height: "auto", display: "block" }}
          />
            <map name="hokkaidomap">
              <area target="" alt="蘂取村" title="" href="https://itchao.jp/hokkaido/shibetoromura" coords="4507,2661,4184,2356" shape="rect"/>
              <area target="" alt="紗那村" title="" href="" coords="4167,2736,3896,2504" shape="rect"/>
              <area target="" alt="留別村" title="" href="" coords="4008,2703,3420,3173" shape="rect"/>
              <area target="" alt="留夜別村" title="" href="" coords="3928,964,3511,1259" shape="rect"/>
              <area target="" alt="泊村" title="" href="" coords="3595,1253,3331,1572" shape="rect"/>
              <area target="" alt="色丹村" title="" href="" coords="4143,1355,3933,1549" shape="rect"/>
              <area target="" alt="歯舞群島" title="" href="" coords="3836,1558,3579,1806" shape="rect"/>
              <area target="" alt="根室市" title="" href="" coords="3549,1749,3258,1915" shape="rect"/>
              <area target="" alt="羅臼町" title="" href="" coords="3309,1100,3103,1391,3174,1441" shape="poly"/>
              <area target="" alt="斜里町" title="" href="" coords="3293,1068,3267,1193,2985,1509,2905,1403" shape="poly"/>
              <area target="" alt="標津町" title="" href="" coords="3104,1393,3161,1438,3225,1621,2976,1524" shape="poly"/>
              <area target="" alt="中標津町" title="" href="" coords="3016,1503,3187,1621,3124,1701,2888,1634" shape="poly"/>
              <area target="" alt="別海町" title="" href="" coords="3241,1619,3266,1801,3141,1880,2973,1798,2980,1708" shape="poly"/>
              <area target="" alt="浜中町" title="" href="" coords="3239,1861,3271,1899,3128,2033,3095,1936,3104,1861" shape="poly"/>
              <area target="" alt="厚岸町" title="" href="" coords="2955,1781,3073,1848,3115,2029,2909,2042,3010,1890" shape="poly"/>
              <area target="" alt="釧路町" title="" href="" coords="2811,1937,2922,2059,2993,2038,2972,2088,2833,2059" shape="poly"/>
              <area target="" alt="標茶町" title="" href="" coords="2901,1627,2875,1736,2745,1719,2829,1955,2896,1980,3027,1900,2947,1685" shape="poly"/>
              <area target="" alt="清里町" title="" href="" coords="2896,1408,2955,1445,2984,1559,2917,1614,2849,1555" shape="poly"/>
              <area target="" alt="弟子屈町" title="" href="" coords="2762,1534,2854,1554,2901,1652,2892,1757,2724,1711" shape="poly"/>
              <area target="" alt="小清水町" title="" href="" coords="2833,1371,2892,1367,2905,1438,2854,1544,2774,1531" shape="poly"/>
              <area target="" alt="鶴居村" title="" href="" coords="2717,1732,2766,1758,2821,1885,2812,1977,2673,1826" shape="poly"/>
              <area target="" alt="釧路市" title="" href="" coords="2658,1672,2721,1678,2690,1855,2837,2078,2597,1927,2606,1817" shape="poly"/>
              <area target="" alt="津別町" title="" href="" coords="2505,1535,2644,1506,2707,1624,2631,1712,2488,1598" shape="poly"/>
              <area target="" alt="美幌町" title="" href="" coords="2665,1387,2700,1406,2763,1524,2703,1593,2661,1492,2564,1509" shape="poly"/>
              <area target="" alt="大空町" title="" href="" coords="2640,1358,2707,1346,2812,1464,2783,1531,2715,1464" shape="poly"/>
              <area target="" alt="網走市" title="" href="" coords="2644,1259,2711,1247,2829,1375,2808,1417,2614,1354" shape="poly"/>
              <area target="" alt="北見市" title="" href="" coords="2618,1436,2522,1532,2454,1478,2288,1562,2196,1545,2408,1402,2631,1234" shape="poly"/>
              <area target="" alt="訓子府町" title="" href="" coords="2421,1475,2513,1500,2505,1568,2421,1576" shape="poly"/>
              <area target="" alt="陸別町" title="" href="" coords="2374,1601,2463,1584,2597,1685,2454,1765,2340,1689" shape="poly"/>
              <area target="" alt="足寄町" title="" href="" coords="2240,1643,2442,1767,2569,1702,2606,1767,2479,1889,2319,1868,2219,1736" shape="poly"/>
              <area target="" alt="置戸町" title="" href="" coords="2192,1598,2437,1488,2416,1589,2336,1678" shape="poly"/>
              <area target="" alt="本別町" title="" href="" coords="2303,1862,2496,1896,2370,1980,2311,1972" shape="poly"/>
              <area target="" alt="白糠町" title="" href="" coords="2489,1916,2586,1772,2715,2033,2590,2092" shape="poly"/>
              <area target="" alt="釧路市" title="" href="" coords="2454,2013,2513,1942,2597,2081,2538,2144" shape="poly"/>
              <area target="" alt="浦幌町" title="" href="" coords="2396,1989,2480,1930,2542,2162,2404,2238" shape="poly"/>
              <area target="" alt="池田町" title="" href="" coords="2273,1975,2370,1983,2391,2126,2265,2088" shape="poly"/>
              <area target="" alt="豊頃町" title="" href="" coords="2285,2160,2386,2102,2408,2304,2265,2275" shape="poly"/>
              <area target="" alt="佐呂間町" title="" href="" coords="2547,1239,2581,1264,2458,1416,2391,1352,2479,1252" shape="poly"/>
              <area target="" alt="湧別町" title="" href="" coords="2357,1135,2433,1152,2463,1329,2311,1224" shape="poly"/>
              <area target="" alt="遠軽町" title="" href="" coords="2206,1297,2395,1267,2387,1402,2193,1520,2096,1415" shape="poly"/>
            </map>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 地方移住者サイト | すべての権利を保有</p>
      </footer>
    </div>
  );
}
