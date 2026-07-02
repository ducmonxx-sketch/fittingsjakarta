import { useState, useEffect, useRef } from 'react'
import anime from 'animejs'

// ─── Intersection Observer Hook ───────────────────────────────────────────────
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          // Once visible, stop observing — animation plays only once
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

// ─── Animate on scroll wrapper ─────────────────────────────────────────────
export function FadeUp({ children, delay = 0, className = '', style = {} }) {
  const [ref, inView] = useInView()
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (inView && ref.current && !hasAnimated.current) {
      hasAnimated.current = true
      anime({
        targets: ref.current,
        translateY: [32, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: delay * 1000,
        easing: 'spring(1, 80, 10, 0)'
      })
    }
  }, [inView, delay])

  return (
    <div ref={ref} className={className} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  )
}

export function FadeIn({ children, delay = 0, className = '', style = {} }) {
  const [ref, inView] = useInView()
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (inView && ref.current && !hasAnimated.current) {
      hasAnimated.current = true
      anime({
        targets: ref.current,
        opacity: [0, 1],
        duration: 800,
        delay: delay * 1000,
        easing: 'easeOutQuad'
      })
    }
  }, [inView, delay])

  return (
    <div ref={ref} className={className} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  )
}

// ─── Counter animation ──────────────────────────────────────────────────────
export function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [ref, inView] = useInView()
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    const obj = { val: 0 }
    anime({
      targets: obj,
      val: target,
      round: 1,
      duration: duration,
      easing: 'easeOutExpo',
      update: () => setCount(obj.val)
    })
  }, [inView, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

// ─── Mobile Menu Hook ──────────────────────────────────────────────────────
export function useMobileMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return [open, setOpen]
}

// ─── Scroll position hook ──────────────────────────────────────────────────
export function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}
