import { useEffect, useState, memo } from 'react'
import { SLIDES } from '../../data/constants'
import StaggerHeading from '../StaggerHeading'

function ArtistOSSection() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  useEffect(() => {
    if (isPaused) return
    const t = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [isPaused])
  const goTo = (i) => { setActive(i); setIsPaused(true) }
  return (
    <section id="artistos" className="relative py-20 md:py-32 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-16 xl:px-20 max-w-[1400px] mx-auto">
        <div className="text-center mb-12 md:mb-16 reveal reveal-up">
          <span className="font-space text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-noise-yellow/60 block mb-6">[ARTISTOS]</span>
          <StaggerHeading text="ONE PLATFORM. YOUR ENTIRE CAREER." scramble className="font-brexter text-[9vw] md:text-[5vw] lg:text-[3.5vw] uppercase leading-[0.85] tracking-tight text-noise-white" />
          <p className="font-outfit text-noise-grey text-sm md:text-base mt-4 max-w-lg mx-auto">18 features. One login. Zero friction.</p>
        </div>
        <div className="relative max-w-5xl mx-auto reveal reveal-up">
          <div className="bg-noise-surface border border-noise-border rounded-lg overflow-hidden shadow-2xl shadow-noise-yellow/5">
            <div className="flex items-center justify-between px-4 py-3 border-b border-noise-border bg-noise-surface-2">
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" /></div>
              <div className="flex-1 mx-4 max-w-md"><div className="bg-noise-black/50 rounded-md px-3 py-1.5 flex items-center gap-2"><span className="text-noise-grey/40 text-[10px]">&#128274;</span><span className="font-mono text-noise-grey text-[11px] tracking-wider">noisemusic.io/ArtistOS/{SLIDES[active].id}</span></div></div>
              <div className="hidden md:flex items-center gap-1">{SLIDES.map((s, i) => <button key={s.id} onClick={() => goTo(i)} className={`font-outfit text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-md transition-all duration-300 cursor-pointer ${i === active ? 'bg-noise-yellow text-noise-black font-semibold' : 'text-noise-grey hover:text-noise-white'}`}>{s.label}</button>)}</div>
            </div>
            <div className="relative aspect-[16/10] bg-noise-black overflow-hidden">
              {SLIDES.map((s, i) => <img key={s.id} src={s.img} alt={`ArtistOS ${s.label}`} className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700" style={{ opacity: i === active ? 1 : 0, transform: i === active ? 'scale(1)' : 'scale(1.02)' }} />)}
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-outfit text-noise-grey text-sm md:text-base italic">{SLIDES[active].caption}</p>
            <div className="flex items-center gap-3">
              <button onClick={() => { setActive((a) => (a - 1 + SLIDES.length) % SLIDES.length); setIsPaused(true) }} className="w-9 h-9 border border-noise-border rounded-full flex items-center justify-center text-noise-grey hover:text-noise-yellow hover:border-noise-yellow transition-colors cursor-pointer">&#8592;</button>
              <div className="flex items-center gap-2">{SLIDES.map((_, i) => <button key={i} onClick={() => goTo(i)} className="cursor-pointer"><div className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-noise-yellow' : 'w-2.5 bg-noise-grey/30'}`} /></button>)}</div>
              <button onClick={() => setIsPaused(!isPaused)} className="w-9 h-9 border border-noise-border rounded-full flex items-center justify-center text-noise-grey hover:text-noise-yellow hover:border-noise-yellow transition-colors cursor-pointer">{isPaused ? '\u25B6' : '\u23F8'}</button>
              <button onClick={() => { setActive((a) => (a + 1) % SLIDES.length); setIsPaused(true) }} className="w-9 h-9 border border-noise-border rounded-full flex items-center justify-center text-noise-grey hover:text-noise-yellow hover:border-noise-yellow transition-colors cursor-pointer">&#8594;</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(ArtistOSSection)
