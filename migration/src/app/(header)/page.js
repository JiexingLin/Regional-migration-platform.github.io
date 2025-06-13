// app/page.js
"use client"
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import ImageMapper from 'react-img-mapper';

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

  // 添加状态来管理地图容器的宽度
  const [mapContainerWidth, setMapContainerWidth] = useState(800);

  // 日本地图区域配置 - 使用官方格式
  const japanMapAreas = [
    { name: "hokkaido", shape: "rect", coords: [1111,36,1974,595], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "aomori", shape: "rect", coords: [1199,601,1353,729], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "iwate", shape: "rect", coords: [1280,729,1409,930], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "akita", shape: "rect", coords: [1177,718,1294,915], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "yamagata", shape: "rect", coords: [1163,893,1258,1058], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "miyagi", shape: "rect", coords: [1255,912,1360,1050], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "hukushima", shape: "rect", coords: [1137,1036,1316,1175], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "nigata", shape: "rect", coords: [970,947,1179,1157], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "nagano", shape: "rect", coords: [976,1186,1046,1343], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "yamanashi", shape: "rect", coords: [1046,1292,1101,1365], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "sizuoka", shape: "rect", coords: [987,1350,1122,1449], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "toyama", shape: "rect", coords: [896,1168,995,1226], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "gihu", shape: "rect", coords: [867,1235,983,1365], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "aichi", shape: "rect", coords: [884,1357,987,1439], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "ishikawa", shape: "rect", coords: [845,1091,930,1263], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "hukui", shape: "rect", coords: [775,1248,878,1336], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "tochigi", shape: "rect", coords: [1145,1145,1248,1233], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "gunma", shape: "rect", coords: [1059,1174,1162,1262], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "ibaraki", shape: "rect", coords: [1202,1168,1290,1285], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "tiba", shape: "rect", coords: [1198,1282,1286,1399], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "saitama", shape: "rect", coords: [1093,1246,1210,1292], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "tokyo", shape: "rect", coords: [1115,1285,1210,1321], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "kanagawa", shape: "rect", coords: [1107,1321,1199,1376], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "siga", shape: "rect", coords: [783,1321,867,1424], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "mie", shape: "rect", coords: [825,1377,888,1555], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "nara", shape: "rect", coords: [774,1442,815,1537], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "wakayama", shape: "rect", coords: [726,1478,797,1599], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "osaka", shape: "rect", coords: [750,1400,779,1486], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "kyoto", shape: "rect", coords: [717,1328,793,1405], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "hyogo", shape: "rect", coords: [649,1312,746,1497], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "tottori", shape: "rect", coords: [551,1317,657,1357], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "simane", shape: "rect", coords: [373,1347,519,1410], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "yamaguchi", shape: "rect", coords: [284,1440,430,1503], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "hiroshima", shape: "rect", coords: [416,1409,567,1463], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "okayama", shape: "rect", coords: [541,1358,644,1446], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "kagawa", shape: "rect", coords: [548,1467,665,1500], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "tokushima", shape: "rect", coords: [578,1497,673,1562], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "kouchi", shape: "rect", coords: [474,1540,636,1654], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "ehime", shape: "rect", coords: [439,1486,505,1610], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "oita", shape: "rect", coords: [296,1532,383,1654], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "fukuoka", shape: "rect", coords: [238,1497,285,1606], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "saga", shape: "rect", coords: [186,1552,249,1614], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "nagasaki", shape: "rect", coords: [22,1574,219,1723], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "kumamoto", shape: "rect", coords: [234,1610,303,1723], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "miyazaki", shape: "rect", coords: [285,1640,399,1797], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "kagoshima", shape: "rect", coords: [183,1730,291,1957], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" },
    { name: "okinawa", shape: "rect", coords: [1075,1658,1386,1884], preFillColor: "rgba(255, 255, 255, 0.1)", fillColor: "rgba(255, 0, 0, 0.3)" }
  ];

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

    // 监听窗口大小变化，更新地图容器宽度
    const updateMapWidth = () => {
      try {
        const mapBorder = document.querySelector('.map-border');
        if (mapBorder) {
          const width = mapBorder.offsetWidth - 60; // 减去padding
          setMapContainerWidth(Math.max(300, Math.min(width, 800))); // 最小300px，最大800px
        }
      } catch (error) {
        console.log('Map width update error:', error);
        setMapContainerWidth(800); // 出错时使用默认值
      }
    };

    // 延迟执行，确保DOM已加载
    setTimeout(updateMapWidth, 100);
    window.addEventListener('resize', updateMapWidth);

    return () => {
      window.removeEventListener('resize', updateMapWidth);
    };
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

  // 处理地图区域点击
  const handleMapClick = (area) => {
    console.log('点击了地区:', area.name); // 调试信息
    router.push(`/pref/${area.name}`);
  };

  // 处理鼠标悬停
  const handleMapHover = (area) => {
    console.log('鼠标悬停:', area.name); // 调试信息
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

      {/* 日本地图 */}
      <section className="map-section">
        <p className="map-title fade-in">地图から気に入る地方を探す</p>
        <div className="map-border fade-in">
          <ImageMapper
            src="/global/img/nihonchizu-color-todofuken.png"
            name="japan-map"
            areas={japanMapAreas}
            onClick={handleMapClick}
            onMouseEnter={handleMapHover}
            responsive={true}
            parentWidth={mapContainerWidth}
          />
        </div>
      </section>

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
    </div>
  );
}
