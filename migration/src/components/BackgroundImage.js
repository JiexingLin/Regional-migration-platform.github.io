"use client"
import React from 'react';
import styles from './BackgroundImage.module.css';
import Image from 'next/image';
import topImage from '@/global/top_image.png';

const BackgroundImage = () => {
  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.gradientOverlay}></div>
      <Image 
        src={topImage}
        alt="移住イメージ"
        fill
        className={styles.backgroundImage}
        priority
      />
    </div>
  );
};

export default BackgroundImage; 