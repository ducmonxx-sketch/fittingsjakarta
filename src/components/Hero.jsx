import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { AnimatedCounter } from '../hooks'
import { useLanguage } from '../context/LanguageContext'
import LiquidWordmark from './LiquidWordmark'
import styles from './Hero.module.css'

const WA_LINK = 'https://wa.me/6281218363558'

export default function Hero() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)

  const trustStats = [
    { value: 10,  suffix: '+', label: t('hero.stat1Label') },
    { value: 500, suffix: '+', label: t('hero.stat2Label') },
    { value: 4,   suffix: '',  label: t('hero.stat3Label') },
  ]

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.hero-stagger-item').forEach((el) => {
        el.style.opacity = '1'
      })
      return
    }

    // Fixed-duration easeOutQuint instead of spring(): spring easing computes an
    // open-ended duration and tends to run long and stutter on load.
    anime({
      targets: '.hero-stagger-item',
      translateY: [32, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutQuint',
      delay: anime.stagger(120, { start: 150 }),
    })
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className={styles.hero}
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      {/* ── Glow Orb ── */}
      <div className={styles.glowOrbs} aria-hidden="true">
        <div className={styles.glowOrb} />
      </div>

      <div className={`container ${styles.stage}`}>

        {/* ── Top Rail — badge + technical standards ── */}
        <div className={`hero-stagger-item ${styles.topRail}`} style={{ opacity: 0 }}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            {t('hero.badge')}
          </div>
          <span className={styles.specNote} aria-hidden="true">
            ANSI B16.9 <i>/</i> ASTM A234 <i>/</i> A403
          </span>
        </div>

        {/* ── Type Stage — monumental wordmark ── */}
        <div className={`hero-stagger-item ${styles.typeStage}`} style={{ opacity: 0 }}>
          <LiquidWordmark />
        </div>

        {/* ── Lower Rail — content docked into the negative space ── */}
        <div className={styles.lowerRail}>
          <div className={`hero-stagger-item ${styles.content}`} style={{ opacity: 0 }}>
            <h1 id="hero-heading" className={styles.heading} itemProp="headline">
              {t('hero.title1')}{' '}
              <span className={styles.headingAccent}>{t('hero.title2')}</span>{' '}
              {t('hero.title3')}
            </h1>

            <p className={styles.sub} itemProp="description">
              {t('hero.subtitle')}
            </p>

            <div className={styles.ctas}>
              <a
                href={WA_LINK}
                className={`btn btn-primary ${styles.ctaPrimary}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('common.whatsappBtn')}
                id="hero-cta-whatsapp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t('hero.btnConsultation')}
              </a>
              <a
                href="#products"
                className={`btn btn-outline ${styles.ctaSecondary}`}
                id="hero-cta-products"
              >
                {t('hero.btnCatalog')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Stats rail — hairline-divided, docked right */}
          <div className={`hero-stagger-item ${styles.stats}`} style={{ opacity: 0 }} role="list" aria-label={t('hero.trustNotice')}>
            {trustStats.map(({ value, suffix, label }) => (
              <div key={label} className={styles.stat} role="listitem">
                <span className={styles.statValue}>
                  <AnimatedCounter target={value} suffix={suffix} duration={1800} />
                </span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
