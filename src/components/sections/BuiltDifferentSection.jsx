import { memo } from 'react'
import { FEATURES_GRID } from '../../data/constants'
import StaggerHeading from '../StaggerHeading'

function BuiltDifferentSection() {
  return (
    <section id="built-different" className="relative py-20 md:py-32 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-16 xl:px-20 max-w-[1400px] mx-auto">
        <span className="font-space text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-noise-yellow/60 block mb-6 reveal reveal-up">[BUILT DIFFERENT]</span>
        <StaggerHeading text="NOT A FEATURE LIST. A WEAPON." scramble className="font-brexter text-[8vw] md:text-[4vw] uppercase leading-[0.85] tracking-tight text-noise-white mb-12 md:mb-16" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {FEATURES_GRID.map((f, i) => (
            <div key={f.front} className="group relative bg-noise-surface border border-noise-border p-5 md:p-6 aspect-square flex flex-col justify-center items-center text-center hover:bg-noise-yellow hover:border-noise-yellow transition-all duration-300 reveal reveal-up" style={{ transitionDelay: `${i * 0.04}s` }}>
              <span className="font-brexter text-noise-yellow group-hover:text-noise-black text-sm md:text-base uppercase tracking-tight transition-colors duration-300">{f.front}</span>
              <span className="font-outfit text-noise-grey group-hover:text-noise-black/70 text-[10px] md:text-xs mt-2 leading-relaxed transition-colors duration-300 opacity-0 group-hover:opacity-100">{f.back}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(BuiltDifferentSection)
