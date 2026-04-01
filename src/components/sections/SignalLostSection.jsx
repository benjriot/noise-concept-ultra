import { useEffect, useRef, useState, memo } from 'react'
import { SIGNAL_PHASES } from '../../data/constants'

function SignalLostSection() {
  const [idx, setIdx] = useState(0)
  const ref = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !intervalRef.current) {
        intervalRef.current = setInterval(() => setIdx(prev => (prev + 1) % SIGNAL_PHASES.length), 1200)
      }
      if (!e.isIntersecting && intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setIdx(0)
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => { obs.disconnect(); clearInterval(intervalRef.current) }
  }, [])

  const phase = SIGNAL_PHASES[idx]
  return (
    <section ref={ref} id="scroll-hijack" className="relative h-screen flex items-center justify-center overflow-hidden" style={{ background: phase.bg, transition: 'background 0.4s ease' }}>
      <div className="text-center px-6">
        <div className="font-brexter uppercase leading-[0.85] tracking-tighter" style={{
          fontSize: 'clamp(3rem, 14vw, 12rem)',
          color: phase.color,
          textShadow: phase.shadow,
          filter: phase.blur ? 'blur(1px)' : 'none',
          transition: 'color 0.3s, text-shadow 0.3s, filter 0.3s',
        }}>
          {phase.text}
        </div>
        <p className="font-space text-[10px] md:text-xs uppercase tracking-[0.4em] mt-6" style={{ color: phase.bg === '#FFFF00' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,0,0.4)', transition: 'color 0.3s' }}>
          {phase.sub}
        </p>
      </div>
      {phase.blur && [...Array(6)].map((_, i) => (
        <div key={i} className="absolute left-0 right-0 h-[1px] bg-noise-yellow/30" style={{ top: `${15 + i * 14}%` }} />
      ))}
    </section>
  )
}

export default memo(SignalLostSection)
