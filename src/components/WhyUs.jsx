import { FadeUp, FadeIn } from '../hooks'
import styles from './WhyUs.module.css'

const REASONS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: 'Siap B2B & B2C',
    desc: 'Solusi pengadaan fleksibel untuk perusahaan besar, kontraktor, maupun pembelian satuan dengan harga kompetitif.',
    accent: 'var(--primary-container)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Respon Cepat',
    desc: 'Komunikasi langsung dan segera via WhatsApp sehingga proyek Anda tidak tertunda menunggu konfirmasi.',
    accent: 'var(--gold-accent)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    title: 'Kualitas Terverifikasi',
    desc: 'Seluruh produk melewati kontrol kualitas ketat, memenuhi standar internasional ASME, ANSI, dan ISO.',
    accent: 'var(--inverse-primary)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/>
      </svg>
    ),
    title: 'Konsultasi Ahli',
    desc: 'Tim kami memberikan saran teknis yang tepat untuk memastikan Anda mendapat spesifikasi yang sesuai sistem Anda.',
    accent: 'var(--primary-dark)',
  },
]

const INDUSTRIES = [
  {
    name: 'Minyak & Gas',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18"/><path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2"/><path d="M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
      </svg>
    ),
  },
  {
    name: 'Konstruksi',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="6" width="20" height="8" rx="1"/><path d="M17 14v8"/><path d="M7 14v8"/><path d="M17 3v3"/><path d="M7 3v3"/><path d="M2 22h20"/>
      </svg>
    ),
  },
  {
    name: 'Manufaktur',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
  },
  {
    name: 'Kimia & Petrokimia',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2v7.527a2 2 0 01-.211.896L4.72 20.55a1 1 0 00.9 1.45h12.76a1 1 0 00.9-1.45l-5.069-10.127A2 2 0 0114 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16.5h10"/>
      </svg>
    ),
  },
  {
    name: 'Pembangkit Listrik',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    name: 'Pengolahan Air',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22a7 7 0 007-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 007 7z"/>
      </svg>
    ),
  },
  {
    name: 'Perkapalan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0021 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 00-2-2H7a2 2 0 00-2 2v6"/><path d="M12 10V4.5"/><path d="M12 4.5L8 2"/>
      </svg>
    ),
  },
  {
    name: 'Pertambangan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 10l-2 1m0 0l-2-1m2 1v2.5"/><path d="M20 4l-2 1.5L12 2 6 5.5 4 4v8l2-1.5L12 14l6-3.5L20 12z"/><path d="M6 5.5v8"/><path d="M18 5.5v8"/><path d="M12 14v8"/><path d="M12 22l-6-3.5"/><path d="M12 22l6-3.5"/>
      </svg>
    ),
  },
  {
    name: 'Perkebunan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
  },
  {
    name: 'Industri Makanan & Minuman',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
      </svg>
    ),
  },
  {
    name: 'Farmasi',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M12 8v8"/><path d="M8 12h8"/>
      </svg>
    ),
  },
  {
    name: 'Maintainence',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
]

export default function WhyUs() {
  return (
    <>
      {/* Why Choose Us */}
      <section id="why-us" className={`section ${styles.whyUs}`} aria-labelledby="why-us-heading">
        <div className="container">
          <FadeUp>
            <div className={styles.sectionHeader}>
              <span className="badge">Keunggulan Kami</span>
              <h2 id="why-us-heading" className={`headline-md ${styles.title}`}>
                Mengapa Memilih Fittings Jakarta?
              </h2>
              <p className={`body-lg ${styles.subtitle}`}>
                Dipercaya oleh ratusan klien B2B dan kontraktor di seluruh Indonesia
                dengan pengalaman lebih dari satu dekade di industri perpipaan.
              </p>
            </div>
          </FadeUp>

          <div className={styles.grid}>
            {REASONS.map((r, i) => (
              <FadeUp key={r.title} delay={0.2 + (i * 0.1)}>
                <div className={styles.card}>
                  <div className={styles.iconWrap} aria-hidden="true">
                    {r.icon}
                  </div>
                  <h3 className={`headline-sm ${styles.cardTitle}`}>{r.title}</h3>
                  <p className={`body-md ${styles.cardDesc}`}>{r.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className={`section ${styles.industries}`} aria-labelledby="industries-heading">
        <div className="container">
          <FadeUp>
            <div className={styles.sectionHeader}>
              <span className={`badge ${styles.industriesBadge}`}>Industri Yang Kami Layani</span>
              <h2 id="industries-heading" className={`headline-md ${styles.industriesTitle}`}>
                Solusi Perpipaan untuk Berbagai Industri
              </h2>
              <p className={`body-lg ${styles.industriesSub}`}>
                Melayani kebutuhan perpipaan di berbagai sektor industri dengan standar kualitas tertinggi.
              </p>
            </div>
          </FadeUp>
          <FadeIn delay={0.1}>
            <div className={styles.tagsGrid} role="list" aria-label="Industri yang dilayani">
              {INDUSTRIES.map((ind) => (
                <div key={ind.name} className={styles.industryCard} role="listitem">
                  <span className={styles.industryIcon}>{ind.icon}</span>
                  <span className={styles.industryName}>{ind.name}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
