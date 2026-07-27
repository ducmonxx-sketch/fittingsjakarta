import { useState } from 'react'
import { FadeUp } from '../hooks'
import { useLanguage } from '../context/LanguageContext'
import styles from './FAQ.module.css'

function FAQItem({ q, a, isOpen, onToggle, index }) {
  return (
    <div className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
      <button
        className={styles.question}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span>{q}</span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className={styles.answerWrap}
        style={{ maxHeight: isOpen ? '300px' : '0' }}
      >
        <p className={`body-md ${styles.answer}`}>{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(null)
  const toggle = (i) => setOpen(prev => prev === i ? null : i)

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
  ]

  return (
    <section className={`section ${styles.faq}`} aria-labelledby="faq-heading">
      <div className="container">
        <FadeUp>
          <div className={styles.header}>
            <span className="badge">{t('faq.tag')}</span>
            <h2 id="faq-heading" className={`headline-md ${styles.title}`}>
              {t('faq.title')} <span className="goldText">{t('faq.titleGold')}</span>
            </h2>
            <p className={`body-lg ${styles.sub}`}>
              {t('faq.subtitle')}
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className={styles.list} role="list">
            {faqs.map((f, i) => (
              <FAQItem
                key={i}
                index={i}
                q={f.q}
                a={f.a}
                isOpen={open === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

