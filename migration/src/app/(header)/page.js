// app/page.js
"use client"
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

// 导入图片
import image1 from '@/global/image_copy_1.png';
import image2 from '@/global/image_copy_2.png';
import image3 from '@/global/image_copy_3.png';
import image4 from '@/global/image_copy_4.png';
import image5 from '@/global/image_copy_5.png';
import image6 from '@/global/image_copy_6.png';

export default function HomePage() {
  const pathname = usePathname();
  const router = useRouter();

  const handleMatchingClick = () => {
    router.push('/matching');
  };

  return (
    <>
      <section className="intro">
        <div className="intro-text">
          <h2>あなたの新しい暮らしがここに</h2>
          <p>地方での暮らしを考え始めたあなたへ。私たちのサイトでは、地域ごとの生活情報や移住者同士のマッチング機能を提供しています。</p>
        </div>
      </section>
    <section>
      <div className="advantage">
        <div className="advantage__header">
            <h2>
                <span>地方移住の魅力</span>
            </h2>
            <p>
              地方移住には、都会暮らしにはない魅力がたくさんあります。その一部をご紹介します。</p>
        </div>
        <div className="points">
            <div className="points__element">
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
            <div className="points__element">
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
            <div className="points__element">
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
            <div className="points__element">
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
            <div className="points__element">
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
            <div className="points__element">
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
    </section>
      <section className="matching">
        <h2>地域マッチング</h2>
        <p>あなたにぴったりの移住先を見つけよう！</p>
        <button onClick={handleMatchingClick}>マッチングを始める</button>
      </section>

      <footer>
        <p>© 2024 地方移住者サイト | すべての権利を保有</p>
      </footer>
    </>
  );
}
