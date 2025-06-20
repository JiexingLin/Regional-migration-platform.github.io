"use client"
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.css';

export default function PrefPage() {
  const params = useParams();
  const router = useRouter();
  const [PrefComponent, setPrefComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPrefComponent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 动态导入对应的都道府县组件
        const componentPath = `../../../components/PrefContent/${params.pref}`;
        console.log('Loading component from path:', componentPath);
        
        // 严格验证参数
        if (!params || !params.pref || params.pref === 'undefined' || params.pref === 'null') {
          throw new Error(`Invalid prefecture parameter: ${params?.pref}`);
        }
        
        const prefName = params.pref.toString().trim();
        console.log('Clean prefecture name:', prefName);
        
        // 动态导入对应的都道府县组件 - 使用@路径别名
        console.log('Attempting to import:', `@/components/PrefContent/${prefName}.js`);
        
        const component = await import(`@/components/PrefContent/${prefName}.js`);
        
        if (component && component.default) {
          setPrefComponent(() => component.default);
          console.log('Component loaded successfully');
        } else {
          throw new Error('Component not found or invalid format');
        }
        
      } catch (error) {
        console.error('Error loading prefecture component:', error);
        setError(`${params.pref}県の情報が見つかりませんでした。`);
      } finally {
        setLoading(false);
      }
    };

    if (params.pref) {
      console.log('Params pref:', params.pref);
      loadPrefComponent();
    } else {
      console.log('No pref parameter found');
      setError('都道府県が指定されていません。');
      setLoading(false);
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

  if (error || !PrefComponent) {
    return (
      <div className={styles.error}>
        <h1>エラー</h1>
        <p>{error || '都道府県の情報が見つかりませんでした。'}</p>
        <p>利用可能な都道府県: hokkaido, aomori, iwate, akita, yamagata, miyagi, hukushima, ibaraki, tochigi, gunma, saitama, tiba, tokyo, kanagawa, nigata, toyama, ishikawa, hukui, yamanashi, nagano, gihu, sizuoka, aichi, mie, siga, kyoto, osaka, hyogo, nara, wakayama, tottori, simane, okayama, hiroshima, yamaguchi, tokushima, kagawa, ehime, kouchi, hukuoka, saga, nagasaki, kumamoto, oita, miyazaki, kagoshima, okinawa</p>
        <button onClick={() => router.push('/')} className={styles.backButton}>
          ホームに戻る
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <PrefComponent />
      <button onClick={() => router.push('/')} className={styles.backButton}>
        ホームに戻る
      </button>
    </div>
  );
} 