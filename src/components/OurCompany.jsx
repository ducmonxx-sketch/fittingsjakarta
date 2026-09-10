import { FadeUp, FadeIn } from '../hooks'
import styles from './OurCompany.module.css'

const COMPANIES = [
  {
    name: 'Jakarta Valve',
    url: 'https://jakartavalve.com',
    logoPlaceholder: 'JV',
  },
  {
    name: 'Fittings Indonesia',
    url: 'https://fittingsindonesia.com',
    logoPlaceholder: 'FJ',
  },
]

export default function OurCompany() {
  return (
    <section id="our-company" className={`section ${styles.ourCompany}`} aria-labelledby="our-company-heading">
      <div className="container">
        <FadeUp>
          <div className={styles.header}>
            <span className="badge">Perusahaan Kami</span>
            <h2 id="our-company-heading" className={`headline-md ${styles.title}`}>
              Bagian dari Grup Industri Terpercaya
            </h2>
            <p className={`body-lg ${styles.sub}`}>
              Kami merupakan bagian dari jaringan perusahaan yang bergerak di bidang penyediaan kebutuhan perpipaan
              dan valve industri di Indonesia.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className={styles.logoRow}>
            {COMPANIES.map((company) => (
              <a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.logoLink}
                aria-label={`Kunjungi website ${company.name}`}
              >
                {/* Logo placeholder — will be replaced with actual logo image */}
                <div className={styles.logoCircle}>
                  <span className={styles.logoInitials}>{company.logoPlaceholder}</span>
                </div>
                <span className={styles.logoName}>{company.name}</span>
              </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
