import { memo } from 'react'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

function OldVsNoiseSection() {
  const { ref, isVisible: consumed } = useIntersectionObserver({ threshold: 0.4 })
  return (
    <section ref={ref} id="old-vs-noise" className="relative h-[80vh] md:h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[#0e0e0e] flex items-center justify-center transition-all duration-[1.5s] ease-in-out" style={{ clipPath: consumed ? 'inset(0 100% 0 0)' : 'inset(0 0 0 0)' }}>
        <div className="text-center px-6 md:px-8 w-full max-w-5xl" style={{ filter: 'grayscale(100%)' }}>
          <span className="font-space text-[10px] uppercase tracking-[0.35em] text-[#333] block mb-6">[THE OLD WAY]</span>
          <h3 className="font-outfit text-[#333] text-[12vw] md:text-[8vw] font-thin leading-[0.85] tracking-tight mb-8" style={{ WebkitTextStroke: '1px #333' }}>BROKEN<br/>BY DESIGN.</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['80% royalty cuts', 'No transparency', 'Corporate gatekeepers', '12+ separate tools', 'Hidden fees', 'Zero support'].map(t => (
              <span key={t} className="font-outfit text-[#444] text-xs border border-[#222] px-4 py-2">{t}</span>
            ))}
          </div>
          <p className="font-outfit text-[#444] text-sm max-w-md mx-auto">The music industry was designed to extract value from artists. Every deal, every platform, every middleman — built to take.</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-noise-yellow flex items-center justify-center overflow-hidden">
        <div className="font-brexter-outline absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[40vw] leading-none text-noise-black/[0.04] whitespace-nowrap" style={{ transform: 'rotate(-8deg)' }}>NOISE</span>
        </div>
        <div className="text-center px-6 md:px-8 w-full max-w-5xl relative z-10">
          <span className="font-space text-[10px] uppercase tracking-[0.35em] text-noise-black/30 block mb-4">[THE NOISE WAY]</span>
          <h3 className="font-brexter text-noise-black text-[14vw] md:text-[10vw] uppercase leading-[0.82] tracking-tighter mb-6">WE TURN<br/>UP.</h3>
          <p className="font-outfit text-noise-black/60 text-base md:text-lg max-w-lg mx-auto mb-8">100% royalties. Full transparency. One platform. Zero middlemen. Built by artists, for artists.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['100% ROYALTIES', 'FULL TRANSPARENCY', 'ARTIST-FIRST', 'ONE PLATFORM'].map(t => (
              <span key={t} className="font-brexter text-noise-yellow text-xs bg-noise-black px-5 py-2.5 uppercase tracking-wider">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(OldVsNoiseSection)
