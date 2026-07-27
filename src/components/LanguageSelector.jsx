import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import styles from './LanguageSelector.module.css'

const LANGUAGES = [
  { code: 'id', label: 'ID', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
]

export default function LanguageSelector({ variant = 'desktop' }) {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0]

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (code) => {
    setLang(code)
    setOpen(false)
  }

  if (variant === 'mobile') {
    return (
      <div className={styles.mobileContainer}>
        <span className={styles.mobileLabel}>Bahasa / Language:</span>
        <div className={styles.mobileToggleGroup}>
          {LANGUAGES.map(({ code, label, flag }) => (
            <button
              key={code}
              type="button"
              className={`${styles.mobileBtn} ${lang === code ? styles.mobileBtnActive : ''}`}
              onClick={() => setLang(code)}
            >
              <span className={styles.flag}>{flag}</span>
              <span className={styles.codeText}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerActive : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Pilih Bahasa / Select Language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className={styles.flag}>{currentLang.flag}</span>
        <span className={styles.codeText}>{currentLang.label}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul className={styles.dropdown} role="listbox" aria-label="Language options">
          {LANGUAGES.map(({ code, name, flag }) => (
            <li key={code} role="option" aria-selected={lang === code}>
              <button
                type="button"
                className={`${styles.option} ${lang === code ? styles.optionSelected : ''}`}
                onClick={() => handleSelect(code)}
              >
                <span className={styles.flag}>{flag}</span>
                <span className={styles.optionName}>{name}</span>
                {lang === code && (
                  <svg className={styles.checkIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
