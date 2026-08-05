import { useEffect } from 'react'
import './index.css'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import WhyUs from './components/WhyUs'
import About from './components/About'
import OurCompany from './components/OurCompany'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFAB from './components/WhatsAppFAB'
import NotFound from './components/NotFound'

export default function App() {
  const isNotFound = window.location.pathname !== '/' && window.location.pathname !== '/index.html'

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    // Briefly disable smooth scrolling so the jump is instant and doesn't block user scrolling
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth'
    }, 10)
  }, [])

  if (isNotFound) {
    return (
      <LanguageProvider>
        <NotFound />
      </LanguageProvider>
    )
  }

  return (
    <LanguageProvider>
      <Header />
      <main id="main-content">
        <Hero />
        <Products />
        <WhyUs />
        <About />
        {/* <OurCompany /> */}
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
    </LanguageProvider>
  )
}

