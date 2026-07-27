import { FadeUp, FadeIn, AnimatedCounter } from '../hooks'
import { useLanguage } from '../context/LanguageContext'
import styles from './About.module.css'

export default function About() {
  const { t } = useLanguage()

  const features = [
    t('about.feat1'),
    t('about.feat2'),
    t('about.feat3'),
    t('about.p2'),
  ]

  return (
    <section id="about-us" className={`section ${styles.about}`} aria-labelledby="about-heading">
      <div className="container">
        <div className={styles.layout}>
          {/* Left: image */}
          <FadeIn delay={0}>
            <div className={styles.imgSide}>
              <div className={styles.imgFrame}>
                <img
                  src="/about-store.webp"
                  alt="PT. Buana Logam Perkasa Storefront"
                  className={styles.img}
                  loading="lazy"
                  decoding="async"
                  itemProp="image"
                />
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

