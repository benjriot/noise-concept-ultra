import { useState, memo } from 'react'
import { COMPETITORS, PRICING } from '../../data/constants'
import StaggerHeading from '../StaggerHeading'
import MagneticButton from '../MagneticButton'

function PricingSection() {
  const [dragValue, setDragValue] = useState(0)
  const noiseProgress = dragValue / 100

  return (
    <section id="pricing" className="relative py-20 md:py-32 tear-top" style={{ '--tear-color': '#000' }}>
      <div className="px-8 md:px-14 lg:px-20 xl:px-28 max-w-[1200px] mx-auto">
        <span className="font-space text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-noise-yellow/60 block text-center mb-6 reveal reveal-up">[PRICING]</span>
        <div className="mb-16 md:mb-20 reveal reveal-up">
          <h3 className="font-brexter text-noise-grey text-[5vw] md:text-[2.5vw] uppercase leading-[0.9] tracking-tight text-center mb-8">DRAG TO SEE THE DIFFERENCE:</h3>
          <div className="max-w-2xl mx-auto mb-10 px-4">
            <div className="flex justify-between mb-3">
              <span className="font-space text-[9px] uppercase tracking-widest text-noise-grey/40">The old way</span>
              <span className="font-space text-[9px] uppercase tracking-widest text-noise-yellow">The Noise way</span>
            </div>
            <input type="range" min="0" max="100" value={dragValue} onChange={(e) => setDragValue(Number(e.target.value))} className="w-full h-2 appearance-none bg-noise-border rounded-none outline-none cursor-pointer" style={{ background: `linear-gradient(to right, #333 ${100 - dragValue}%, #FFFF00 ${100 - dragValue}%)` }} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10 transition-all duration-300" style={{ opacity: 1 - noiseProgress * 0.8, transform: `scale(${1 - noiseProgress * 0.05})`, filter: noiseProgress > 0.5 ? `blur(${(noiseProgress - 0.5) * 6}px)` : 'none' }}>
            {COMPETITORS.map((comp) => (
              <div key={comp.name} className="text-center p-4 border border-noise-border/50 bg-noise-surface/50 relative overflow-hidden">
                <span className="font-outfit text-noise-grey text-xs uppercase tracking-wider block mb-2">{comp.name}</span>
                <span className="font-brexter text-2xl md:text-3xl text-noise-white">{comp.price}</span>
                <span className="font-space text-[8px] text-noise-grey/50 uppercase tracking-wider block mt-1">{comp.note}</span>
                {noiseProgress > 0.3 && <div className="absolute inset-0 bg-noise-red/20" style={{ opacity: (noiseProgress - 0.3) * 1.4 }} />}
                {noiseProgress > 0.5 && <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-noise-red" style={{ transform: 'rotate(-5deg)', opacity: (noiseProgress - 0.5) * 2 }} />}
              </div>
            ))}
          </div>
          <div className="transition-all duration-300" style={{ opacity: noiseProgress, transform: `translateY(${(1 - noiseProgress) * 30}px)` }}>
            {noiseProgress > 0.2 && (
              <>
                <StaggerHeading text="NOISE GIVES YOU MORE. FOR LESS." scramble className="font-brexter text-[9vw] md:text-[5vw] uppercase leading-[0.85] tracking-tight text-noise-yellow text-center glow-yellow mb-4" />
                <p className="font-outfit text-noise-grey text-center text-sm md:text-base max-w-lg mx-auto">Distribution, analytics, marketing, coaching, splits, smart links, AI tools — all in one. Starting at free.</p>
              </>
            )}
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          {PRICING.map((tier, i) => (
            <div key={tier.name} className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-5 md:py-6 border-b reveal reveal-up ${tier.highlight ? 'bg-noise-yellow/8 px-6 md:px-8 border-noise-yellow/30' : 'border-noise-border px-6 md:px-8'}`} style={{ transitionDelay: `${i * 0.07}s` }}>
              <span className={`font-brexter text-lg md:text-xl uppercase tracking-tight w-28 md:w-32 flex-shrink-0 ${tier.highlight ? 'text-noise-yellow' : 'text-noise-white'}`}>{tier.name}</span>
              <span className="font-brexter text-2xl md:text-3xl text-noise-white w-40 md:w-52 flex-shrink-0">{tier.price}</span>
              <span className="font-outfit text-noise-grey text-sm md:text-base flex-1">{tier.desc}</span>
              {tier.highlight && <span className="font-outfit text-noise-yellow text-[10px] md:text-xs uppercase tracking-wider border border-noise-yellow/40 px-3 py-1 mt-2 sm:mt-0 w-fit flex-shrink-0">Most Popular</span>}
            </div>
          ))}
        </div>
        <div className="text-center mt-10 reveal reveal-up">
          <p className="font-outfit text-noise-grey text-sm md:text-base mb-8 max-w-xl mx-auto">100% royalties on every plan. Your music stays live forever.</p>
          <MagneticButton className="font-brexter text-base md:text-lg uppercase tracking-wider bg-noise-yellow text-noise-black px-12 py-4 hover:bg-white transition-colors duration-200 static-burst">Get Started Free</MagneticButton>
        </div>
      </div>
    </section>
  )
}

export default memo(PricingSection)
