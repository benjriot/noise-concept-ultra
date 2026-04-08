import { useEffect, useState, memo } from 'react'

/**
 * Persistent floating CTA that surfaces ArtistOS as the primary conversion action.
 * Hides while the hero or cta section is in view to avoid clutter/duplication.
 */
function FloatingArtistOSCTA() {
  const [visible, setVisible] = useState(false)
  const [heroInView, setHeroInView] = useState(true)
  const [ctaInView, setCtaInView] = useState(false)

  // Initial delay so it doesn't fight the CRT boot
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(t)
  }, [])

  // Watch hero + cta visibility
  useEffect(() => {
    const hero = document.getElementById('hero')
    const cta = document.getElementById('cta')
    const observers = []

    if (hero) {
      const o = new IntersectionObserver(([e]) => setHeroInView(e.isIntersecting), { threshold: 0.3 })
      o.observe(hero)
      observers.push(o)
    }
    if (cta) {
      const o = new IntersectionObserver(([e]) => setCtaInView(e.isIntersecting), { threshold: 0.3 })
      o.observe(cta)
      observers.push(o)
    }
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const shouldShow = visible && !heroInView && !ctaInView

  const handleClick = (e) => {
    e.preventDefault()
    const target = document.getElementById('artistos')
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <a
      href="#artistos"
      onClick={handleClick}
      aria-label="Launch ArtistOS"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 group flex items-center gap-2.5 bg-artistos-green text-noise-black font-brexter uppercase tracking-wider text-xs sm:text-sm px-4 py-3 sm:px-5 sm:py-3.5 shadow-[0_0_40px_rgba(173,255,47,0.4)] hover:shadow-[0_0_60px_rgba(173,255,47,0.6)] transition-all duration-500"
      style={{
        opacity: shouldShow ? 1 : 0,
        transform: shouldShow ? 'translateY(0)' : 'translateY(16px)',
        pointerEvents: shouldShow ? 'auto' : 'none',
      }}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-noise-black/60 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-noise-black" />
      </span>
      <span className="whitespace-nowrap">&#9654; LAUNCH ARTISTOS</span>
      <span className="hidden sm:inline text-noise-black/60 text-[10px] font-outfit normal-case tracking-normal ml-1">Free. Forever.</span>
    </a>
  )
}

export default memo(FloatingArtistOSCTA)
