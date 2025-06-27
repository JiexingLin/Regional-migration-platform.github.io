// app/page.js
"use client"
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

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

  // 日本地图区域配置 - 使用官方格式
  const japanMapAreas = [
    { name: "hokkaido", shape: "rect", coords: [1111,36,1974,595], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "aomori", shape: "rect", coords: [1199,601,1353,729], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "iwate", shape: "rect", coords: [1280,729,1409,930], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "akita", shape: "rect", coords: [1177,718,1294,915], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "yamagata", shape: "rect", coords: [1163,893,1258,1058], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "miyagi", shape: "rect", coords: [1255,912,1360,1050], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "hukushima", shape: "rect", coords: [1137,1036,1316,1175], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "nigata", shape: "rect", coords: [970,947,1179,1157], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "nagano", shape: "rect", coords: [976,1186,1046,1343], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "yamanashi", shape: "rect", coords: [1046,1292,1101,1365], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "sizuoka", shape: "rect", coords: [987,1350,1122,1449], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "toyama", shape: "rect", coords: [896,1168,995,1226], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "gihu", shape: "rect", coords: [867,1235,983,1365], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "aichi", shape: "rect", coords: [884,1357,987,1439], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "ishikawa", shape: "rect", coords: [845,1091,930,1263], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "hukui", shape: "rect", coords: [775,1248,878,1336], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "tochigi", shape: "rect", coords: [1145,1145,1248,1233], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "gunma", shape: "rect", coords: [1059,1174,1162,1262], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "ibaraki", shape: "rect", coords: [1202,1168,1290,1285], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "tiba", shape: "rect", coords: [1198,1282,1286,1399], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "saitama", shape: "rect", coords: [1093,1246,1210,1292], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "tokyo", shape: "rect", coords: [1115,1285,1210,1321], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "kanagawa", shape: "rect", coords: [1107,1321,1199,1376], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "siga", shape: "rect", coords: [783,1321,867,1424], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "mie", shape: "rect", coords: [825,1377,888,1555], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "nara", shape: "rect", coords: [774,1442,815,1537], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "wakayama", shape: "rect", coords: [726,1478,797,1599], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "osaka", shape: "rect", coords: [750,1400,779,1486], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "kyoto", shape: "rect", coords: [717,1328,793,1405], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "hyogo", shape: "rect", coords: [649,1312,746,1497], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "tottori", shape: "rect", coords: [551,1317,657,1357], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "simane", shape: "rect", coords: [373,1347,519,1410], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "yamaguchi", shape: "rect", coords: [284,1440,430,1503], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "hiroshima", shape: "rect", coords: [416,1409,567,1463], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "okayama", shape: "rect", coords: [541,1358,644,1446], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "kagawa", shape: "rect", coords: [548,1467,665,1500], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "tokushima", shape: "rect", coords: [578,1497,673,1562], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "kouchi", shape: "rect", coords: [474,1540,636,1654], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "ehime", shape: "rect", coords: [439,1486,505,1610], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "oita", shape: "rect", coords: [296,1532,383,1654], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "fukuoka", shape: "rect", coords: [238,1497,285,1606], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "saga", shape: "rect", coords: [186,1552,249,1614], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "nagasaki", shape: "rect", coords: [22,1574,219,1723], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "kumamoto", shape: "rect", coords: [234,1610,303,1723], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "miyazaki", shape: "rect", coords: [285,1640,399,1797], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "kagoshima", shape: "rect", coords: [183,1730,291,1957], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 },
    { name: "okinawa", shape: "rect", coords: [1075,1658,1386,1884], preFillColor: "transparent", fillColor: "transparent", strokeColor: "transparent", lineWidth: 0 }
  ];

  useEffect(() => {
    // 动态加载 image-map-resizer 库
    const loadImageMapResizer = () => {
      return new Promise((resolve, reject) => {
        // 检查是否已经加载
        if (window.imageMapResize) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/image-map-resizer@1.0.10/js/imageMapResizer.min.js';
        script.onload = () => {
          console.log('Image Map Resizer 库加载成功');
          resolve();
        };
        script.onerror = (error) => {
          console.error('Image Map Resizer 库加载失败:', error);
          reject(error);
        };
        document.head.appendChild(script);
      });
    };

    // 初始化地图和动画
    const initializeMap = async () => {
      try {
        // 加载库
        await loadImageMapResizer();
        
        // 等待图片加载完成
        const mapImg = document.getElementById('japan-map-img');
        if (mapImg && mapImg.complete) {
          // 图片已加载，直接初始化
          setTimeout(() => {
            if (window.imageMapResize) {
              window.imageMapResize();
              console.log('地图初始化完成');
            }
          }, 100);
        } else if (mapImg) {
          // 等待图片加载
          mapImg.addEventListener('load', () => {
            setTimeout(() => {
              if (window.imageMapResize) {
                window.imageMapResize();
                console.log('地图初始化完成');
              }
            }, 100);
          });
        }

        // 添加地图区域点击事件
        const areas = document.querySelectorAll('area[data-pref]');
        areas.forEach(area => {
          area.addEventListener('click', (e) => {
            e.preventDefault(); // 阻止默认跳转
            const prefName = area.getAttribute('data-pref');
            const prefTitle = area.getAttribute('title');
            
            console.log('点击了地区:', prefTitle, '(' + prefName + ')');
            router.push(`/pref/${prefName}`);
          });

          // 鼠标悬停效果
          area.addEventListener('mouseenter', () => {
            const prefTitle = area.getAttribute('title');
            console.log('鼠标悬停:', prefTitle);
          });
        });

        // 窗口大小改变时重新调整地图
        const handleResize = () => {
          if (window.imageMapResize) {
            window.imageMapResize();
          }
        };
        
        window.addEventListener('resize', handleResize);

        // 清理函数
        return () => {
          window.removeEventListener('resize', handleResize);
        };

      } catch (error) {
        console.error('地图初始化失败:', error);
      }
    };

    // 添加滚动动画
    const els = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });    }, { threshold: 0.1 });
  
    els.forEach(el => obs.observe(el));

    // 初始化地图
    initializeMap();
  }, [router]);

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

      {/* 日本地图 */}
      <section className="map-section">
        <p className="map-title fade-in">地图から気に入る地方を探す</p>
        <div className="map-border fade-in">
          {/* HTML原生Image Map */}
          <img 
            src="/global/img/nihonchizu-color-todofuken.png"
            alt="日本地図"
            id="japan-map-img"
            useMap="#japan-map"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <map name="japan-map" id="japan-map">
            {/* 北海道 */}
            <area shape="rect" coords="1111,36,1974,595" data-pref="hokkaido" title="北海道" alt="北海道" />
            
            {/* 青森県 */}
            <area shape="rect" coords="1199,601,1353,729" data-pref="aomori" title="青森県" alt="青森県" />
            
            {/* 岩手県 */}
            <area shape="rect" coords="1280,729,1409,930" data-pref="iwate" title="岩手県" alt="岩手県" />
            
            {/* 秋田県 */}
            <area shape="rect" coords="1177,718,1294,915" data-pref="akita" title="秋田県" alt="秋田県" />
            
            {/* 山形県 */}
            <area shape="rect" coords="1163,893,1258,1058" data-pref="yamagata" title="山形県" alt="山形県" />
            
            {/* 宮城県 */}
            <area shape="rect" coords="1255,912,1360,1050" data-pref="miyagi" title="宮城県" alt="宮城県" />
            
            {/* 福島県 */}
            <area shape="rect" coords="1137,1036,1316,1175" data-pref="hukushima" title="福島県" alt="福島県" />
            
            {/* 新潟県 */}
            <area shape="rect" coords="970,947,1179,1157" data-pref="nigata" title="新潟県" alt="新潟県" />
            
            {/* 長野県 */}
            <area shape="rect" coords="976,1186,1046,1343" data-pref="nagano" title="長野県" alt="長野県" />
            
            {/* 山梨県 */}
            <area shape="rect" coords="1046,1292,1101,1365" data-pref="yamanashi" title="山梨県" alt="山梨県" />
            
            {/* 静岡県 */}
            <area shape="rect" coords="987,1350,1122,1449" data-pref="sizuoka" title="静岡県" alt="静岡県" />
            
            {/* 富山県 */}
            <area shape="rect" coords="896,1168,995,1226" data-pref="toyama" title="富山県" alt="富山県" />
            
            {/* 岐阜県 */}
            <area shape="rect" coords="867,1235,983,1365" data-pref="gihu" title="岐阜県" alt="岐阜県" />
            
            {/* 愛知県 */}
            <area shape="rect" coords="884,1357,987,1439" data-pref="aichi" title="愛知県" alt="愛知県" />
            
            {/* 石川県 */}
            <area shape="rect" coords="845,1091,930,1263" data-pref="ishikawa" title="石川県" alt="石川県" />
            
            {/* 福井県 */}
            <area shape="rect" coords="775,1248,878,1336" data-pref="hukui" title="福井県" alt="福井県" />
            
            {/* 栃木県 */}
            <area shape="rect" coords="1145,1145,1248,1233" data-pref="tochigi" title="栃木県" alt="栃木県" />
            
            {/* 群馬県 */}
            <area shape="rect" coords="1059,1174,1162,1262" data-pref="gunma" title="群馬県" alt="群馬県" />
            
            {/* 茨城県 */}
            <area shape="rect" coords="1202,1168,1290,1285" data-pref="ibaraki" title="茨城県" alt="茨城県" />
            
            {/* 千葉県 */}
            <area shape="rect" coords="1198,1282,1286,1399" data-pref="tiba" title="千葉県" alt="千葉県" />
            
            {/* 埼玉県 */}
            <area shape="rect" coords="1093,1246,1210,1292" data-pref="saitama" title="埼玉県" alt="埼玉県" />
            
            {/* 東京都 */}
            <area shape="rect" coords="1115,1285,1210,1321" data-pref="tokyo" title="東京都" alt="東京都" />
            
            {/* 神奈川県 */}
            <area shape="rect" coords="1107,1321,1199,1376" data-pref="kanagawa" title="神奈川県" alt="神奈川県" />
            
            {/* 滋賀県 */}
            <area shape="rect" coords="783,1321,867,1424" data-pref="siga" title="滋賀県" alt="滋賀県" />
            
            {/* 三重県 */}
            <area shape="rect" coords="825,1377,888,1555" data-pref="mie" title="三重県" alt="三重県" />
            
            {/* 奈良県 */}
            <area shape="rect" coords="774,1442,815,1537" data-pref="nara" title="奈良県" alt="奈良県" />
            
            {/* 和歌山県 */}
            <area shape="rect" coords="726,1478,797,1599" data-pref="wakayama" title="和歌山県" alt="和歌山県" />
            
            {/* 大阪府 */}
            <area shape="rect" coords="750,1400,779,1486" data-pref="osaka" title="大阪府" alt="大阪府" />
            
            {/* 京都府 */}
            <area shape="rect" coords="717,1328,793,1405" data-pref="kyoto" title="京都府" alt="京都府" />
            
            {/* 兵庫県 */}
            <area shape="rect" coords="649,1312,746,1497" data-pref="hyogo" title="兵庫県" alt="兵庫県" />
            
            {/* 鳥取県 */}
            <area shape="rect" coords="551,1317,657,1357" data-pref="tottori" title="鳥取県" alt="鳥取県" />
            
            {/* 島根県 */}
            <area shape="rect" coords="373,1347,519,1410" data-pref="simane" title="島根県" alt="島根県" />
            
            {/* 山口県 */}
            <area shape="rect" coords="284,1440,430,1503" data-pref="yamaguchi" title="山口県" alt="山口県" />
            
            {/* 広島県 */}
            <area shape="rect" coords="416,1409,567,1463" data-pref="hiroshima" title="広島県" alt="広島県" />
            
            {/* 岡山県 */}
            <area shape="rect" coords="541,1358,644,1446" data-pref="okayama" title="岡山県" alt="岡山県" />
            
            {/* 香川県 */}
            <area shape="rect" coords="548,1467,665,1500" data-pref="kagawa" title="香川県" alt="香川県" />
            
            {/* 徳島県 */}
            <area shape="rect" coords="578,1497,673,1562" data-pref="tokushima" title="徳島県" alt="徳島県" />
            
            {/* 高知県 */}
            <area shape="rect" coords="474,1540,636,1654" data-pref="kouchi" title="高知県" alt="高知県" />
            
            {/* 愛媛県 */}
            <area shape="rect" coords="439,1486,505,1610" data-pref="ehime" title="愛媛県" alt="愛媛県" />
            
            {/* 大分県 */}
            <area shape="rect" coords="296,1532,383,1654" data-pref="oita" title="大分県" alt="大分県" />
            
            {/* 福岡県 */}
            <area shape="rect" coords="238,1497,285,1606" data-pref="fukuoka" title="福岡県" alt="福岡県" />
            
            {/* 佐賀県 */}
            <area shape="rect" coords="186,1552,249,1614" data-pref="saga" title="佐賀県" alt="佐賀県" />
            
            {/* 長崎県 */}
            <area shape="rect" coords="22,1574,219,1723" data-pref="nagasaki" title="長崎県" alt="長崎県" />
            
            {/* 熊本県 */}
            <area shape="rect" coords="234,1610,303,1723" data-pref="kumamoto" title="熊本県" alt="熊本県" />
            
            {/* 宮崎県 */}
            <area shape="rect" coords="285,1640,399,1797" data-pref="miyazaki" title="宮崎県" alt="宮崎県" />
            
            {/* 鹿児島県 */}
            <area shape="rect" coords="183,1730,291,1957" data-pref="kagoshima" title="鹿児島県" alt="鹿児島県" />
            
            {/* 沖縄県 */}
            <area shape="rect" coords="1075,1658,1386,1884" data-pref="okinawa" title="沖縄県" alt="沖縄県" />
          </map>
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
