import { useEffect, useRef, useCallback } from 'react'

/**
 * Scroll tracking via refs + CSS custom properties.
 * Never calls setState — avoids re-render cascade.
 * Components read scroll data from CSS vars or the returned refs.
 */
export default function useScrollData() {
  const scrollYRef = useRef(0)
  const velocityRef = useRef(0)
  const lastScrollRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const rafRef = useRef(null)
  const dirtyRef = useRef(false)

  useEffect(() => {
    const root = document.documentElement

    const flush = () => {
      if (dirtyRef.current) {
        dirtyRef.current = false
        const now = performance.now()
        const dt = now - lastTimeRef.current
        const y = window.scrollY
        const dy = Math.abs(y - lastScrollRef.current)
        const vel = dt > 0 ? Math.min(dy / dt * 16, 50) : 0

        lastScrollRef.current = y
        lastTimeRef.current = now
        scrollYRef.current = y
        velocityRef.current = vel

        root.style.setProperty('--scroll-y', String(y))
        root.style.setProperty('--scroll-vel', String(vel))
      }
      rafRef.current = requestAnimationFrame(flush)
    }

    rafRef.current = requestAnimationFrame(flush)

    const markDirty = () => { dirtyRef.current = true }
    window.addEventListener('scroll', markDirty, { passive: true })

    return () => {
      window.removeEventListener('scroll', markDirty)
      cancelAnimationFrame(rafRef.current)
      root.style.removeProperty('--scroll-y')
      root.style.removeProperty('--scroll-vel')
    }
  }, [])

  const getScrollY = useCallback(() => scrollYRef.current, [])
  const getVelocity = useCallback(() => velocityRef.current, [])

  return { scrollYRef, velocityRef, getScrollY, getVelocity }
}
