import { useEffect } from 'react'
import './index.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import WhyUs from './components/WhyUs'
import About from './components/About'
import OurCompany from './components/OurCompany'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFAB from './components/WhatsAppFAB'

export default function App() {
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

  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Products />
        <WhyUs />
        <About />
        {/* <OurCompany /> */}
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
