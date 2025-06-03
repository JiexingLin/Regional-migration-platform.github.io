import React from 'react'
import styles from './faq.module.css'

const faqs = [
  {
    question: 'Q1: まず、どんなことから準備をしたらいいですか？',
    answer: '自分がどんな生活をしたいのか、優先すべきことは何なのか、書き出してみましょう。そうすると移住する目的や暮らし方がはっきり見えてくると思います。サイト内で移住の希望条件をお選び頂けますので、参考にしてください。'
  },
  {
    question: 'Q2: 自然災害がない地域はどこですか？',
    answer: '自然災害が全くない地域はありません。地域によって台風が多い、降水量が多いなどリスクが異なります。希望の地域を絞るときの参考になるので、インターネットでハザードマップを調べたり自治体に問い合わせてみましょう。'
  },
  {
    question: 'Q3: 田舎は物価が安いと聞きますが本当ですか？',
    answer: 'すべての地域で物価が安いとは限りません。都会と比べて価格競争が少ないため、日用品などは高い場合もあります。しかし、住居費が比較的安価なこともあり、都会と比べると生活費はずいぶん抑えられる傾向です。'
  },
  {
    question: 'Q4:車がなくても大丈夫ですか？',
    answer: '地方では車が必需品となる場合がほとんどです。地方都市や交通機関が整備された限られた地域では車がなくても生活はできますが、不便なことも多いので運転免許証は取得しておいたほうがよいでしょう。先輩移住者が登壇するセミナーや現地の担当者と直接話せる出張相談デスクに参加して、実情を確認するのもおすすめです。'
  },
  {
    question: 'Q5: 地方に移住する際の初期費用はどれくらいかかりますか？',
    answer: '初期費用は住居の契約金、引越し費用、車両購入費用（必要な場合）、地域特有の手続き費用などが考慮されます。地域ごとに差がありますので、早めに予算を立てておくことが大切です。'
  },
  {
    question: 'Q6: 子どもがいるので、子育て環境が気になります。子育て支援に関する情報及び医療福祉、教育環境などの情報はどこで手に入りますか？',
    answer: 'マッチング結果で子育てに関する資料も表示されておりますので、ご覧ください。各自治体によって異なりますので、詳細等につきましては自治体の窓口をご案内いたします。'
  }
];

export default function FaqPage() {
  return (
    <div className={styles.faqBg}>
      <div className={styles.faqContainer}>
        <h1 className={styles.faqTitle}>よくある質問</h1>
        <div className={styles.faqList}>
          {faqs.map((item, idx) => (
            <div className={styles.faqCard} key={idx}>
              <div className={styles.faqQuestion}>{item.question}</div>
              <div className={styles.faqAnswer}>{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
