import { useState, useEffect, useRef, memo } from 'react'
import TypewriterLine from '../TypewriterLine'
import LightningBolt from '../LightningBolt'
import MagneticButton from '../MagneticButton'

function HeroSection({ booted }) {
  const [heroLinesReady, setHeroLinesReady] = useState(0)
  const sectionRef = useRef(null)

  // Read scroll from CSS custom properties for parallax (no state = no re-renders)
  useEffect(() => {
    if (!booted) return
    let raf
    const update = () => {
      const scrollY = parseFloat(document.documentElement.style.getPropertyValue('--scroll-y')) || 0
      const vel = parseFloat(document.documentElement.style.getPropertyValue('--scroll-vel')) || 0
      const section = sectionRef.current
      if (section) {
        // Background parallax
        const bg = section.querySelector('[data-hero-bg]')
        if (bg) bg.style.transform = `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.3}px)`
        // Watermark parallax
        const wm = section.querySelector('[data-hero-watermark]')
        if (wm) wm.style.transform = `translate(-50%,-50%) rotate(-8deg) translateY(${scrollY * 0.15}px)`
        // Foreground parallax
        const fg = section.querySelector('[data-hero-fg]')
        if (fg) fg.style.transform = `translateY(${scrollY * -0.1}px)`
      }
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [booted])

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen flex flex-col justify-between overflow-hidden">
      <div data-hero-bg className="absolute inset-0">
        <img src="/images/hero-crowd.jpg" alt="" className="w-full h-full object-cover" style={{ filter: 'grayscale(100%) contrast(1.6) brightness(0.2)' }} />
        <div className="absolute inset-0 bg-noise-black/50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #000 0%, transparent 40%, rgba(0,0,0,0.4) 100%)' }} />
      </div>
      <div data-hero-watermark className="font-brexter-outline absolute top-1/2 left-1/2 text-[50vw] md:text-[35vw] leading-none select-none pointer-events-none whitespace-nowrap" style={{ color: 'rgba(255,255,0,0.06)' }}>NOISE</div>
      <LightningBolt className="absolute left-4 md:left-12 top-[10%] w-12 md:w-20 opacity-40 z-20" />
      <div className="hidden lg:flex absolute right-6 xl:right-10 top-1/2 -translate-y-1/2 z-20 items-center"><span className="font-space text-[9px] uppercase tracking-[0.5em] writing-vertical text-noise-grey/20 select-none">B Corp Certified &bull; Social Enterprise &bull; 100% Artist-First</span></div>
      <div className="hidden md:flex absolute left-6 xl:left-10 bottom-24 z-20 flex-col items-center gap-3"><div className="w-[1px] h-12 bg-noise-yellow/30 scroll-pulse" /><span className="font-space text-[8px] uppercase tracking-[0.4em] text-noise-grey/30 writing-vertical">Scroll</span></div>
      <div data-hero-fg className="relative z-10 flex-1 flex flex-col justify-center px-4 md:px-6 lg:px-8">
        <h1 className="font-brexter uppercase leading-[0.82] tracking-tighter" style={{ fontSize: 'min(14.5vw, 16.5vh)' }}>
          {booted && ['MAKING', 'INDEPENDENCE', 'THE MOST', 'POWERFUL'].map((w, i) => (
            <TypewriterLine key={w} text={w} delay={i * 400} speed={35} onDone={i === 3 ? () => setHeroLinesReady(4) : undefined} />
          ))}
          {heroLinesReady >= 4 && <TypewriterLine text="DEAL IN MUSIC." delay={0} speed={30} isYellow />}
        </h1>
      </div>
      <div className="relative z-10 px-5 md:px-8 lg:px-10 xl:px-12 pb-6 md:pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
        <p className="font-space text-noise-grey-light text-[10px] md:text-xs leading-relaxed max-w-sm uppercase tracking-wider">The music industry was built to extract from artists. Noise is built to amplify them.</p>
        <div className="flex flex-row gap-3 flex-shrink-0">
          <MagneticButton href="#pricing" className="font-brexter text-xs md:text-sm uppercase tracking-wider bg-noise-yellow text-noise-black px-6 md:px-8 py-2.5 md:py-3 hover:bg-white transition-colors duration-200 text-center whitespace-nowrap static-burst">Get Started Free</MagneticButton>
          <MagneticButton href="#ecosystem" className="font-brexter text-xs md:text-sm uppercase tracking-wider bg-noise-black text-noise-white px-6 md:px-8 py-2.5 md:py-3 hover:text-noise-yellow transition-colors duration-200 text-center whitespace-nowrap border border-noise-border">See How</MagneticButton>
        </div>
      </div>
    </section>
  )
}

export default memo(HeroSection)
