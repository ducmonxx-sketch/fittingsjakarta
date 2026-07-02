import { FadeUp, FadeIn, AnimatedCounter } from '../hooks'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about-us" className={`section ${styles.about}`} aria-labelledby="about-heading">
      <div className="container">
        <div className={styles.layout}>
          {/* Left: image */}
          <FadeIn delay={0}>
            <div className={styles.imgSide}>
              <div className={styles.imgFrame}>
                <img
                  src="/hero-bg.png"
                  alt="Gudang industri Fittings Jakarta menyimpan pipa dan fitting baja berkualitas tinggi"
                  className={styles.img}
                  loading="lazy"
                  decoding="async"
                  itemProp="image"
                />
                <div className={styles.imgOverlay} />
              </div>
              {/* Floating stat card */}
              <div className={styles.statCard} aria-label="Statistik perusahaan">
                <div className={styles.statRow}>
                  <span className={styles.statNum}><AnimatedCounter target={10} suffix="+" /></span>
                  <span className={styles.statLabel}>Tahun Pengalaman</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.statRow}>
                  <span className={styles.statNum}><AnimatedCounter target={500} suffix="+" /></span>
                  <span className={styles.statLabel}>Klien Terpercaya</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: text */}
          <div className={styles.textSide}>
            <FadeUp delay={0.1}>
              <span className="badge">Tentang Kami</span>
              <h2 id="about-heading" className={`headline-md ${styles.title}`}>
                Mitra Terpercaya untuk Kebutuhan Perpipaan Industri
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className={`body-lg ${styles.para}`}>
                PT. Buana Logam Perkasa hadir dengan misi utama melayani kebutuhan material industri migas,
                kimia, dan general hardware. Kini, kami telah berkembang menjadi stockist terpercaya untuk
                valve, fitting, pipa, dan tubing berkualitas tinggi.
              </p>
              <p className={`body-md ${styles.para}`} style={{ color: 'var(--text-muted)' }}>
                Berlokasi strategis di kawasan perdagangan baja Lindeteves Trade Center, Glodok — Jakarta Barat,
                kami siap menjadi pusat penyedia one-stop solution dengan harga kompetitif. Dengan keahlian
                dalam spesifikasi teknis produk, distribusi, dan logistik, kami membantu klien menghemat biaya
                tanpa mengorbankan kualitas.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <ul className={styles.checkList} aria-label="Keunggulan perusahaan">
                {[
                  'Stockist valve, fitting, pipa, dan tubing lengkap',
                  'Harga kompetitif dengan layanan one-stop solution',
                  'Produk memenuhi standar ASME, ANSI, dan ISO internasional',
                  'Tim teknis berpengalaman siap konsultasi',
                ].map((item) => (
                  <li key={item} className={styles.checkItem}>
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
