import { useState, useEffect, useRef } from 'react'
import anime from 'animejs'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

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
// CSS transition driven (compositor-only opacity/transform) rather than a
// per-frame JS animation — several of these firing at once while the user
// scrolls was the main source of scroll jank.
export function FadeUp({ children, delay = 0, className = '', style = {} }) {
  const [ref, inView] = useInView()
  const shown = inView || prefersReducedMotion

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(28px)',
        transition: prefersReducedMotion
          ? 'none'
          : `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: shown ? 'auto' : 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function FadeIn({ children, delay = 0, className = '', style = {} }) {
  const [ref, inView] = useInView()
  const shown = inView || prefersReducedMotion

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transition: prefersReducedMotion ? 'none' : `opacity 0.7s ease ${delay}s`,
        willChange: shown ? 'auto' : 'opacity',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── Counter animation ──────────────────────────────────────────────────────
export function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [ref, inView] = useInView()
  const spanRef = useRef(null)
  const hasAnimated = useRef(false)

  const setRefs = (node) => {
    ref.current = node
    spanRef.current = node
  }

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    if (prefersReducedMotion) {
      if (spanRef.current) spanRef.current.textContent = `${target}${suffix}`
      return
    }

    // Write straight to the DOM node each frame — no per-frame React re-render.
    const obj = { val: 0 }
    anime({
      targets: obj,
      val: target,
      round: 1,
      duration,
      easing: 'easeOutExpo',
      update: () => {
        if (spanRef.current) spanRef.current.textContent = `${obj.val}${suffix}`
      },
    })
  }, [inView, target, duration, suffix])

  return <span ref={setRefs}>0{suffix}</span>
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
