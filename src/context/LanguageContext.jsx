import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext()

const STORAGE_KEY = 'jakarta_fittings_lang'

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'id' || saved === 'en') return saved
    } catch (e) {
      // localStorage fallback
    }
    return 'id'
  })

  const setLang = (newLang) => {
    if (newLang !== 'id' && newLang !== 'en') return
    setLangState(newLang)
    try {
      localStorage.setItem(STORAGE_KEY, newLang)
    } catch (e) {
      // ignore
    }
  }

  // Helper function to resolve nested keys like "hero.title1"
  const t = (path) => {
    const keys = path.split('.')
    let current = translations[lang]
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key]
      } else {
        // Fallback to Indonesian if key missing in current language
        let fallback = translations.id
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk]
          } else {
            return path // Return key path if missing altogether
          }
        }
        return fallback
      }
    }
    return current
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
