// app/page.js
"use client"
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Script from 'next/script';

// 导入图片
import image1 from '@/global/img/point1.png';
import image2 from '@/global/img/point2.png';
import image3 from '@/global/img/point3.png';
import image4 from '@/global/img/point4.png';
import image5 from '@/global/img/point5.png';
import image6 from '@/global/img/point6.png';
import nihonchizu from '@/global/img/nihonchizu-color-todofuken.png';
import topImage from '@/global/img/top.png';

export default function HomePage() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // 添加滚动动画
    const els = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    els.forEach(el => obs.observe(el));
  }, []);

  const handleMatchingClick = () => {
    router.push('/matching');
  };

  const handleScroll = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-container">
      {/* サイト宣伝と紹介 */}
      <section className="intro fade-in">
        <div className="intro-image">
          <Image 
            src={topImage}
            alt="移住イメージ"
            width={800}
            height={400}
            className="fit"
          />
        </div>
        <div className="intro-text">
          <h2>あなたの新しい暮らしがここに</h2>
          <p>地方での暮らしを考え始めたあなたへ。私たちのサイトでは、地域ごとの生活情報や移住者同士のマッチング機能を提供しています。</p>
        </div>
      </section>

      {/* 地方移住の魅力 */}
      <div className="advantage">
        <div className="advantage__header">
          <h2>
            <span>地方移住の魅力</span>
          </h2>
          <p>地方移住には、都会暮らしにはない魅力がたくさんあります。その一部をご紹介します。</p>
        </div>
        <div className="points">
          <div className="points__element slide-in-left">
            <span className="points-tag">POINT 1</span>
            <h3>自然豊かな環境</h3>
            <figure>
              <Image 
                src={image1} 
                alt="POINT 1 自然豊かな暮らし"
                className="fit" 
                width={400}
                height={300}
              />
            </figure>
            <p>空気がきれいで四季を感じられ、ストレスの少ない生活が可能。</p>
          </div>
          <div className="points__element slide-in-left">
            <span className="points-tag">POINT 2</span>
            <h3>生活コストを抑えやすい</h3>
            <figure>
              <Image 
                src={image2} 
                alt="POINT 2 快適な空間で暮らせる"
                className="fit" 
                width={400}
                height={300}
              />
            </figure>
            <p>家賃や食費が都市部より安く、自治体の移住支援も充実。</p>
          </div>
          <div className="points__element slide-in-left">
            <span className="points-tag">POINT 3</span>
            <h3>子育て・教育環境が充実</h3>
            <figure>
              <Image 
                src={image3} 
                alt="POINT 3 豊かな子育て環境"
                className="fit" 
                width={400}
                height={300}
              />
            </figure>
            <p>少人数教育や自然体験が豊富で、地域全体で子どもを見守る風土がある。</p>
          </div>
          <div className="points__element slide-in-right">
            <span className="points-tag">POINT 4</span>
            <h3>人とのつながりが深まる</h3>
            <figure>
              <Image 
                src={image6} 
                alt="POINT 4 趣味中心の生活が出来る"
                className="fit" 
                width={400}
                height={300}
              />
            </figure>
            <p>地域コミュニティが強く、温かい人間関係を築きやすい。</p>
          </div>
          <div className="points__element slide-in-right">
            <span className="points-tag">POINT 5</span>
            <h3>満員電車ストレスが減る</h3>
            <figure>
              <Image 
                src={image4} 
                alt="POINT 5 食べ物が魅力"
                className="fit" 
                width={400}
                height={300}
              />
            </figure>
            <p>車移動や徒歩圏内の生活で、時間と心の余裕が生まれる。</p>
          </div>
          <div className="points__element slide-in-right">
            <span className="points-tag">POINT 6</span>
            <h3>仕事の選択肢が広がる</h3>
            <figure>
              <Image 
                src={image5} 
                alt="POINT 6 社会の役に立てる"
                className="fit" 
                width={400}
                height={300}
              />
            </figure>
            <p>リモートワークや地域密着の仕事（農業・観光業など）の可能性が増える。</p>
          </div>
        </div>
      </div>

      {/* 人気の移住地ランキング */}
      <section className="ranking-section">
        <h2 className="ranking-title">🏆 人気の移住地ランキング</h2>
        <div className="ranking-row">
          <a href="/pref/gunma" className="ranking-link">
            <div className="ranking-card rank-1">
              <span className="rank-number">1</span>
              <div className="rank-info">
                <h3>群馬県</h3>
                <p>都会と自然のバランスが抜群</p>
              </div>
            </div>
          </a>
          <a href="/pref/sizuoka" className="ranking-link">
            <div className="ranking-card rank-1">
              <span className="rank-number">2</span>
              <div className="rank-info">
                <h3>静岡県</h3>
                <p>温暖な気候と富士山の絶景が魅力</p>
              </div>
            </div>
          </a>
          <a href="/pref/tochigi" className="ranking-link">
            <div className="ranking-card rank-1">
              <span className="rank-number">3</span>
              <div className="rank-info">
                <h3>栃木県</h3>
                <p>日光の歴史と豊かな自然が調和</p>
              </div>
            </div>
          </a>
          <a href="/pref/nagano" className="ranking-link">
            <div className="ranking-card rank-1">
              <span className="rank-number">4</span>
              <div className="rank-info">
                <h3>長野県</h3>
                <p>高原の空気と温泉の美しさが魅力</p>
              </div>
            </div>
          </a>
          <a href="/pref/fukuoka" className="ranking-link">
            <div className="ranking-card rank-1">
              <span className="rank-number">5</span>
              <div className="rank-info">
                <h3>福岡県</h3>
                <p>都市の便利さと美食が楽しめる</p>
              </div>
            </div>
          </a>
          <a href="/pref/hokkaido" className="ranking-link">
            <div className="ranking-card rank-1">
              <span className="rank-number">6</span>
              <div className="rank-info">
                <h3>北海道</h3>
                <p>四季を感じながらテレワークも</p>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* 日本地図 */}
      <p className="map-title fade-in">地図から気に入る地方を探す</p>
      <div className="map-border fade-in">
        <img
          src="/global/img/nihonchizu-color-todofuken.png"
          alt="日本地図"
          useMap="#japanmap"
        />
        <map name="japanmap">
          <area alt="北海道" title="" href="/pref/hokkaido" coords="1111,595,1974,36" shape="rect" />
          <area alt="青森県" title="" href="/pref/aomori" coords="1199,729,1353,601" shape="rect" />
          <area alt="岩手県" title="" href="/pref/iwate" coords="1280,930,1409,729" shape="rect" />
          <area alt="秋田県" title="" href="/pref/akita" coords="1177,915,1294,718" shape="rect" />
          <area alt="山形県" title="" href="/pref/yamagata" coords="1163,1058,1258,893" shape="rect" />
          <area alt="宮城県" title="" href="/pref/miyagi" coords="1255,1050,1360,912" shape="rect" />
          <area alt="福島県" title="" href="/pref/hukushima" coords="1316,1036,1137,1175" shape="rect" />
          <area alt="新潟県" title="" href="/pref/nigata" coords="1179,947,970,1157" shape="rect" />
          <area alt="長野県" title="" href="/pref/nagano" coords="1046,1186,976,1343" shape="rect" />
          <area alt="山梨県" title="" href="/pref/yamanashi" coords="1101,1292,1046,1365" shape="rect" />
          <area alt="静岡県" title="" href="/pref/sizuoka" coords="1122,1350,987,1449" shape="rect" />
          <area alt="富山県" title="" href="/pref/toyama" coords="995,1168,896,1226" shape="rect" />
          <area alt="岐阜県" title="" href="/pref/gihu" coords="983,1235,867,1365" shape="rect" />
          <area alt="愛知県" title="" href="/pref/aichi" coords="987,1357,884,1439" shape="rect" />
          <area alt="石川県" title="" href="/pref/ishikawa" coords="930,1091,845,1263" shape="rect" />
          <area alt="福井県" title="" href="/pref/hukui" coords="878,1248,775,1336" shape="rect" />
          <area alt="栃木県" title="" href="/pref/tochigi" coords="1248,1145,1145,1233" shape="rect" />
          <area alt="群馬県" title="" href="/pref/gunma" coords="1162,1174,1059,1262" shape="rect" />
          <area alt="茨城県" title="" href="/pref/ibaraki" coords="1290,1168,1202,1285" shape="rect" />
          <area alt="千葉県" title="" href="/pref/tiba" coords="1286,1282,1198,1399" shape="rect" />
          <area alt="埼玉県" title="" href="/pref/saitama" coords="1210,1246,1093,1292" shape="rect" />
          <area alt="東京都" title="" href="/pref/tokyo" coords="1210,1285,1115,1321" shape="rect" />
          <area alt="神奈川県" title="" href="/pref/kanagawa" coords="1199,1376,1107,1321" shape="rect" />
          <area alt="滋賀県" title="" href="/pref/siga" coords="867,1424,783,1321" shape="rect" />
          <area alt="三重県" title="" href="/pref/mie" coords="888,1555,825,1377" shape="rect" />
          <area alt="奈良県" title="" href="/pref/nara" coords="815,1537,774,1442" shape="rect" />
          <area alt="和歌山県" title="" href="/pref/wakayama" coords="797,1599,726,1478" shape="rect" />
          <area alt="大阪府" title="" href="/pref/osaka" coords="779,1486,750,1400" shape="rect" />
          <area alt="京都府" title="" href="/pref/kyoto" coords="793,1405,717,1328" shape="rect" />
          <area alt="兵庫県" title="" href="/pref/hyogo" coords="746,1497,649,1312" shape="rect" />
          <area alt="鳥取県" title="" href="/pref/tottori" coords="657,1357,551,1317" shape="rect" />
          <area alt="島根県" title="" href="/pref/simane" coords="519,1347,373,1410" shape="rect" />
          <area alt="山口県" title="" href="/pref/yamaguchi" coords="430,1440,284,1503" shape="rect" />
          <area alt="広島県" title="" href="/pref/hiroshima" coords="567,1409,416,1463" shape="rect" />
          <area alt="岡山県" title="" href="/pref/okayama" coords="644,1358,541,1446" shape="rect" />
          <area alt="香川県" title="" href="/pref/kagawa" coords="665,1467,548,1500" shape="rect" />
          <area alt="徳島県" title="" href="/pref/tokushima" coords="673,1497,578,1562" shape="rect" />
          <area alt="高知県" title="" href="/pref/kouchi" coords="636,1540,474,1654" shape="rect" />
          <area alt="愛媛県" title="" href="/pref/ehime" coords="505,1486,439,1610" shape="rect" />
          <area alt="大分県" title="" href="/pref/oita" coords="383,1532,296,1654" shape="rect" />
          <area alt="福岡県" title="" href="/pref/fukuoka" coords="285,1497,238,1606" shape="rect" />
          <area alt="佐賀県" title="" href="/pref/saga" coords="249,1552,186,1614" shape="rect" />
          <area alt="長崎県" title="" href="/pref/nagasaki" coords="219,1574,22,1723" shape="rect" />
          <area alt="熊本県" title="" href="/pref/kumamoto" coords="303,1610,234,1723" shape="rect" />
          <area alt="宮崎県" title="" href="/pref/miyazaki" coords="399,1640,285,1797" shape="rect" />
          <area alt="鹿児島県" title="" href="/pref/kagoshima" coords="291,1730,183,1957" shape="rect" />
          <area alt="沖縄県" title="" href="/pref/okinawa" coords="1386,1658,1075,1884" shape="rect" />
        </map>
      </div>

      {/* 地域マッチング */}
      <section className="matching" id="matching">
        <div className="matching-container">
          <h2 className="matching-h2">地域マッチング</h2>
          <p className="matching-p">あなたにぴったりの移住先を見つけよう！</p>
          <button onClick={handleMatchingClick} className="matching-button">
            マッチングを始める
          </button>
        </div>
      </section>

      {/* お問い合わせ */}
      <section className="contact-section" id="contact-section">
        <div className="contact-container">
          <h1 className="contact-title">お問い合わせ</h1>
          <p className="contact-description">
            ご依頼やご相談など、まずはお気軽にお問い合わせください!
          </p>
          <a href="mailto:info@careercampas.com" className="contact-email">
            info@careercampas.com
          </a>
          <a href="/form" className="contact-button">
            お問い合わせ
          </a>
        </div>
      </section>

      <footer>
        <p>© 2024 地方移住者サイト | すべての権利を保有</p>
      </footer>

      <div id="back-to-top-button">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>⇧</button>
      </div>

      <Script src="https://unpkg.com/image-map-resizer@1.0.10/js/imageMapResizer.min.js" strategy="afterInteractive" />
      <Script id="image-map-resizer">
        {`
          window.addEventListener('load', () => {
            imageMapResize();
          });
        `}
      </Script>
    </div>
  );
}
