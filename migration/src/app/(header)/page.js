// app/page.js
"use client"
import React from'react';
import { usePathname } from 'next/navigation';



export default function HomePage() {
  const pathname = usePathname();
  return (
    <>
      
      <section className="intro">
        <div className="intro-image">
          <img src='@/global/top_image.png' alt="移住イメージ" />
        </div>
        <div className="intro-text">
          <h2>あなたの新しい暮らしがここに</h2>
          <p>地方での暮らしを考え始めたあなたへ。私たちのサイトでは、地域ごとの生活情報や移住者同士のマッチング機能を提供しています。</p>
        </div>
      </section>

      <section className="matching">
        <h2>地域マッチング</h2>
        <p>あなたにぴったりの移住先を見つけよう！</p>
        <button onClick={() => window.location.href = '#'}>マッチングを始める</button>
      </section>

      <footer>
        <p>© 2024 地方移住者サイト | すべての権利を保有</p>
      </footer>
    </>
  );
}
