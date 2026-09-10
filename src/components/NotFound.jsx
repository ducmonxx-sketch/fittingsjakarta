import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import styles from './NotFound.module.css';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const pipeLeftRef = useRef(null);
  const pipeRightRef = useRef(null);
  const dropRef = useRef(null);

  useEffect(() => {
    // Entrance animations
    anime({
      targets: `.${styles.logo}, .${styles.title}, .${styles.subtitle}, .${styles.button}`,
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutElastic(1, .8)',
      delay: anime.stagger(200)
    });

    // Pipe connection animation
    const timeline = anime.timeline({
      loop: true,
      easing: 'easeInOutSine'
    });

    timeline
      .add({
        targets: pipeLeftRef.current,
        translateX: [0, 20],
        duration: 800,
      })
      .add({
        targets: pipeRightRef.current,
        translateX: [0, -20],
        duration: 800,
      }, '-=800')
      .add({
        targets: dropRef.current,
        opacity: [0, 1, 0],
        translateY: ['-50%', '150%'],
        duration: 1000,
        easing: 'easeOutExpo'
      })
      .add({
        targets: [pipeLeftRef.current, pipeRightRef.current],
        translateX: 0,
        duration: 800,
      }, '+=200');

    // Background slow pulsing
    anime({
      targets: `.${styles.backgroundGlow}`,
      scale: [1, 1.2, 1],
      opacity: [0.6, 1, 0.6],
      duration: 5000,
      loop: true,
      easing: 'easeInOutSine'
    });
  }, []);

  const handleReturnHome = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.backgroundGlow}></div>
      
      <div className={styles.logoContainer}>
        <img src="/pt_buana_logam_perkasa.webp?v=2" alt="PT Buana Logam Perkasa" className={styles.logo} />
      </div>

      <div className={styles.content}>
        <div className={styles.pipeContainer}>
          {/* Left Pipe SVG */}
          <div className={styles.pipeLeft} ref={pipeLeftRef}>
            <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 10H50C55.5228 10 60 14.4772 60 20C60 25.5228 55.5228 30 50 30H0V10Z" fill="#1b3b5f"/>
              <rect x="50" y="5" width="15" height="30" rx="2" fill="#1b3b5f"/>
              <path d="M50 5H65V35H50V5Z" stroke="#f2b824" strokeWidth="2"/>
            </svg>
          </div>

          {/* Right Pipe SVG */}
          <div className={styles.pipeRight} ref={pipeRightRef}>
            <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M80 10H30C24.4772 10 20 14.4772 20 20C20 25.5228 24.4772 30 30 30H80V10Z" fill="#1b3b5f"/>
              <rect x="15" y="5" width="15" height="30" rx="2" fill="#1b3b5f"/>
              <path d="M15 5H30V35H15V5Z" stroke="#f2b824" strokeWidth="2"/>
            </svg>
          </div>

          {/* The missing "drop" or spark */}
          <div className={styles.pipeDrop} ref={dropRef}></div>
        </div>

        <h1 className={styles.title}>{t('notFound.title')}</h1>
        <p className={styles.subtitle}>
          {t('notFound.subtitleLine1')}<br/>{t('notFound.subtitleLine2')}
        </p>

        <a href="/" onClick={handleReturnHome} className={styles.button}>
          {t('notFound.btnReturn')}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  );
}
