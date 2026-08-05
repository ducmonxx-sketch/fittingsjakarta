import { useLanguage } from '../context/LanguageContext'
import styles from './Footer.module.css'

const WA_LINK = 'https://wa.me/6281218363558'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className={styles.footer} role="contentinfo" itemScope itemType="https://schema.org/WPFooter">
      <div className="container">
        <div className={styles.grid}>
          {/* Brand col */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <circle cx="14" cy="14" r="13" stroke="rgba(173,199,255,0.6)" strokeWidth="1.5"/>
                <path d="M8 14h12M14 8v12" stroke="rgba(173,199,255,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="14" cy="14" r="3" fill="rgba(173,199,255,0.9)"/>
              </svg>
              <span>FITTINGS JAKARTA</span>
            </div>
            <p className={styles.tagline}>
              {t('footer.aboutDesc')}
            </p>
            <div className={styles.waLinks}>
              <a
                href="https://wa.me/6281218363558"
                className={styles.waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat Admin A"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat Admin A
              </a>
              <a
                href="https://wa.me/6281288296508"
                className={styles.waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat Admin B"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat Admin B
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className={styles.colTitle}>{t('footer.productsTitle')}</h4>
            <ul className={styles.linkList}>
              <li><a href="#products" className={styles.link}>Buttweld Fittings</a></li>
              <li><a href="#products" className={styles.link}>Forged Fittings</a></li>
              <li><a href="#products" className={styles.link}>More Fittings</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={styles.colTitle}>{t('nav.aboutUs')}</h4>
            <ul className={styles.linkList}>
              <li><a href="#why-us" className={styles.link}>{t('nav.whyUs')}</a></li>
              <li><a href="#about-us" className={styles.link}>{t('nav.aboutUs')}</a></li>
              <li><a href="#contact" className={styles.link}>{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={styles.colTitle}>{t('nav.contact')}</h4>
            <ul className={styles.contactList}>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {t('contact.addressValue')}
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.0 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span>+62 812-1836-3558 (Admin A)</span>
                  <span>+62 812-8829-6508 (Admin B)</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {YEAR} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

