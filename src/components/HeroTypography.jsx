import styles from './HeroTypography.module.css'

export default function HeroTypography() {
  return (
    <div className={styles.typographyContainer} aria-hidden="true">
      <div className={styles.wordBlock} style={{ '--delay': '0s' }}>
        <span className={styles.wordOutline}>STAINLESS STEEL</span>
      </div>
      <div className={styles.wordBlock} style={{ '--delay': '0.1s' }}>
        <span className={styles.wordFilled}>FITTINGS</span>
      </div>
      <div className={styles.wordBlock} style={{ '--delay': '0.2s' }}>
        <span className={styles.wordOutline}>CARBON STEEL</span>
      </div>
      <div className={styles.wordBlock} style={{ '--delay': '0.3s' }}>
        <span className={styles.wordFilled}>FITTINGS</span>
      </div>
      <div className={styles.accentLine} />
    </div>
  )
}
