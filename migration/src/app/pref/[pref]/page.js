"use client"
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function PrefPage() {
  const params = useParams();
  const router = useRouter();
  const [prefData, setPrefData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrefData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching data for:', params.pref);
        
        // 构建文件路径
        const filePath = `/global/pref/${params.pref}.html`;
        console.log('Fetching from path:', filePath);
        
        const response = await fetch(filePath);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        console.log('Received HTML length:', html.length);
        
        if (!html || html.length === 0) {
          throw new Error('Received empty HTML content');
        }
        
        setPrefData(html);
      } catch (error) {
        console.error('Error fetching prefecture data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.pref) {
      console.log('Params pref:', params.pref);
      fetchPrefData();
    } else {
      console.log('No pref parameter found');
      setError('都道府県が指定されていません。');
    }
  }, [params.pref]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>読み込み中...</p>
      </div>
    );
  }

  if (error || !prefData) {
    return (
      <div className={styles.error}>
        <h1>エラー</h1>
        <p>都道府県の情報が見つかりませんでした。</p>
        <p>エラー詳細: {error || '不明なエラー'}</p>
        <button onClick={() => router.push('/')} className={styles.backButton}>
          ホームに戻る
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div dangerouslySetInnerHTML={{ __html: prefData }} />
      <button onClick={() => router.push('/')} className={styles.backButton}>
        ホームに戻る
      </button>
    </div>
  );
} 