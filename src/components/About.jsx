import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { FadeUp, FadeIn, AnimatedCounter } from '../hooks'
import { useLanguage } from '../context/LanguageContext'
import styles from './About.module.css'

const images = [
  '/About-Us/about-store-11years-ago.webp',
  '/About-Us/about-store.webp',
  '/About-Us/logam-buana-perkasa-stocks 2.webp',
  '/About-Us/valve-stocks.webp'
]

export default function About() {
  const { t } = useLanguage()
  const stackRef = useRef(null)

  const features = [
    t('about.feat1'),
    t('about.feat2'),
    t('about.feat3'),
    t('about.p2'),
  ]

  useEffect(() => {
    if (!stackRef.current) return;
    
    let currentIndex = 0;
    const items = stackRef.current.children;
    const total = items.length;
    
    // Initial Setup
    Array.from(items).forEach((item, i) => {
      item.style.zIndex = total - i;
      item.style.opacity = i === 0 ? 1 : 0;
      item.style.transform = 'scale(1.0)';
    });

    // Start the Ken Burns effect on the first image
    let activeScaleAnim = anime({
      targets: items[0],
      scale: [1.0, 1.08],
      duration: 5000,
      easing: 'linear'
    });

    const interval = setInterval(() => {
      if (!items || items.length === 0) return;
      const currentItem = items[currentIndex];
      const nextIndex = (currentIndex + 1) % total;
      const nextItem = items[nextIndex];
      
      // Start scaling the next item
      activeScaleAnim = anime({
        targets: nextItem,
        scale: [1.0, 1.08],
        duration: 5000,
        easing: 'linear'
      });
      
      // Fade out the current image
      anime({
        targets: currentItem,
        opacity: [1, 0],
        duration: 1000,
        easing: 'easeInOutQuad'
      });

      // Fade in the next image
      anime({
        targets: nextItem,
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: () => {
          // Reset current item and send to the back of the stack
          currentItem.style.zIndex = 0;
          currentItem.style.transform = 'scale(1.0)';
          
          // Promote all other items in z-index
          for (let i = 0; i < total; i++) {
            if (i !== currentIndex) {
              const currentZ = parseInt(items[i].style.zIndex || 0);
              items[i].style.zIndex = currentZ + 1;
            }
          }
          
          currentIndex = nextIndex;
        }
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      if (activeScaleAnim) activeScaleAnim.pause();
      anime.remove(items);
    };
  }, []);

  return (
    <section id="about-us" className={`section ${styles.about}`} aria-labelledby="about-heading">
      <div className="container">
        <div className={styles.layout}>
          {/* Left: image */}
          <FadeIn delay={0}>
            <div className={styles.imgSide}>
              <div className={styles.imgFrame}>
                <div ref={stackRef} className={styles.imageStack}>
                  {images.map((src, idx) => (
                    <img
                      key={src}
                      src={src}
                      alt={`PT. Buana Logam Perkasa - ${idx + 1}`}
                      className={styles.stackImg}
                      loading={idx === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  ))}
                </div>
                <div className={styles.imgOverlay} />
              </div>
              {/* Floating stat card */}
              <div className={styles.statCard} aria-label={t('about.badgeText')}>
                <div className={styles.statRow}>
                  <span className={styles.statNum}><AnimatedCounter target={10} suffix="+" /></span>
                  <span className={styles.statLabel}>{t('hero.stat1Label')}</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.statRow}>
                  <span className={styles.statNum}><AnimatedCounter target={500} suffix="+" /></span>
                  <span className={styles.statLabel}>{t('hero.stat2Label')}</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: text */}
          <div className={styles.textSide}>
            <FadeUp delay={0.1}>
              <span className="badge">{t('about.tag')}</span>
              <h2 id="about-heading" className={`headline-md ${styles.title}`}>
                {t('about.title')} <span className="goldText">{t('about.titleGold')}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className={`body-lg ${styles.para}`}>
                {t('about.p1')}
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <ul className={styles.checkList} aria-label={t('about.tag')}>
                {features.map((item, idx) => (
                  <li key={idx} className={styles.checkItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={styles.checkIcon} aria-hidden="true">
                      <circle cx="12" cy="12" r="10" fill="var(--primary-container)" opacity="0.12"/>
                      <path d="M8 12l3 3 5-5" stroke="var(--primary-container)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

