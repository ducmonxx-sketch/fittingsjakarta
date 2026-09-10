import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { FadeUp } from '../hooks'
import { useLanguage } from '../context/LanguageContext'
import styles from './Contact.module.css'

const WA_LINK = 'https://wa.me/6281808188808'

export default function Contact() {
  const { t } = useLanguage()
  const sweepRef = useRef(null)

  useEffect(() => {
    // Anime.js sweeping glow effect for the Get Directions button
    anime({
      targets: sweepRef.current,
      translateX: ['-150%', '250%'],
      duration: 2500,
      easing: 'easeInOutSine',
      loop: true,
      delay: 1500
    })
  }, [])

  return (
    <section id="contact" className={`section ${styles.contact}`} aria-labelledby="contact-heading">
      <div className="container">
        <div className={styles.inner}>
          <FadeUp>
            <div className={styles.textSide}>
              <span className="badge" style={{ background: 'rgba(173,199,255,0.12)', borderColor: 'rgba(173,199,255,0.25)', color: 'var(--inverse-primary)' }}>
                {t('contact.tag')}
              </span>
              <h2 id="contact-heading" className={`headline-md ${styles.title}`}>
                {t('contact.title')} <span className="goldText">{t('contact.titleGold')}</span>
              </h2>
              <p className={`body-lg ${styles.sub}`}>
                {t('contact.subtitle')}
              </p>

              <div className={styles.contactItems}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <div className={styles.contactLabel}>{t('contact.addressLabel')}</div>
                    <div className={styles.contactVal} itemProp="address">{t('contact.addressValue')}</div>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.0 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                  </div>
                  <div>
                    <div className={styles.contactLabel}>{t('contact.phoneOfficeLabel')}</div>
                    <div className={styles.contactVal} itemProp="telephone" style={{ marginBottom: 4 }}>+62 812-1836-3558 (Admin A)</div>
                    <div className={styles.contactVal} itemProp="telephone">+62 812-8829-6508 (Admin B)</div>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <div className={styles.contactLabel}>{t('contact.hoursLabel')}</div>
                    <div className={styles.contactVal}>{t('contact.hoursValue')}</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className={styles.ctaCard}>
              <div className={styles.waIcon} aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className={`headline-sm ${styles.ctaTitle}`}>{t('contact.formTitle')}</h3>
              <p className={`body-md ${styles.ctaDesc}`}>
                {t('contact.subtitle')}
              </p>
              <div className={styles.waButtons}>
                <a
                  href="https://wa.me/6281218363558"
                  className={`btn ${styles.waBtn}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hubungi Admin A"
                >
                  Hubungi Admin A
                </a>
                <a
                  href="https://wa.me/6281288296508"
                  className={`btn ${styles.waBtn}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hubungi Admin B"
                >
                  Hubungi Admin B
                </a>
              </div>
              <p className={styles.ctaNote}>{t('contact.note')}</p>
            </div>
          </FadeUp>
        </div>

        {/* Google Maps Embed */}
        <FadeUp delay={0.25}>
          <div className={styles.mapContainer}>
            <iframe
              title="Lokasi Fittings Indonesia"
              src="https://maps.google.com/maps?q=PT.+Buana+Logam+Perkasa&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.mapFrame}
            ></iframe>

            <div className={styles.mapOverlayCard}>
              <h3 className={styles.mapOverlayTitle}>PT. Buana Logam Perkasa</h3>
              <p className={styles.mapOverlayDesc}>LTC Glodok, Lantai SB Blok C1 No 15</p>
              <a 
                href="https://maps.google.com/maps?q=PT.+Buana+Logam+Perkasa" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`btn btn-primary ${styles.mapOverlayBtn}`}
              >
                Dapatkan Petunjuk Arah
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginLeft: 6 }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span className={styles.sweep} ref={sweepRef} aria-hidden="true" />
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
