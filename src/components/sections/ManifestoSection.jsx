import { memo } from 'react'
import { MANIFESTO } from '../../data/constants'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import LightningBolt from '../LightningBolt'

function ManifestoSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })
  return (
    <section ref={ref} id="manifesto" className="relative py-24 md:py-40 overflow-hidden tear-bottom" style={{ '--tear-color': '#FFFF00' }}>
      <div className="font-brexter-outline absolute top-1/2 left-1/2 text-[60vw] leading-none select-none pointer-events-none whitespace-nowrap" style={{ color: 'rgba(255,255,0,0.03)', transform: 'translate(-50%,-50%) rotate(-12deg)' }}>REVOLT</div>
      <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <span className="font-space text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-noise-yellow/60 block mb-10">[003] Manifesto</span>
        <LightningBolt className="absolute top-16 right-8 md:right-20 w-16 md:w-24 opacity-60" />
        <div className="space-y-1 md:space-y-2">
          {MANIFESTO.map((line, i) => (
            <span key={i} className={`manifesto-line font-brexter uppercase tracking-tighter leading-[0.85] ${isVisible ? 'manifesto-visible' : ''}`} style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)', transitionDelay: `${i * 0.12}s`, color: i >= 3 ? '#FFFF00' : '#FFFFFF', textShadow: i >= 3 ? '0 0 30px rgba(255,255,0,0.3)' : 'none' }}>{line}</span>
          ))}
        </div>
        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start gap-6">
          <div className="w-20 h-[2px] bg-noise-yellow mt-3 flex-shrink-0" />
          <p className="font-outfit text-noise-grey-light text-base md:text-lg leading-relaxed max-w-lg">Every stream you release, every gig you play, every fan you build — Noise makes sure the value flows back to <span className="text-noise-yellow">you</span>. Not shareholders. Not executives. You.</p>
        </div>
      </div>
    </section>
  )
}

export default memo(ManifestoSection)
