import { memo } from 'react'
import { TOOL_PILLS } from '../../data/constants'

function ProblemSection() {
  return (
    <section id="problem" className="relative bg-noise-yellow overflow-hidden diagonal-line tear-bottom" style={{ '--tear-color': '#000' }}>
      <div className="px-6 md:px-12 lg:px-16 xl:px-20 py-20 md:py-32 max-w-[1400px] mx-auto text-center">
        <span className="font-space text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-noise-black/40 block mb-8 reveal reveal-up">[001] The Problem</span>
        <h2 className="font-brexter text-noise-black text-[10vw] md:text-[5.5vw] uppercase leading-[0.88] tracking-tight mb-12 md:mb-16 reveal reveal-glitch rgb-split" data-text="12+ APPS.
JUST TO FUNCTION.">12+ APPS.<br />JUST TO FUNCTION.</h2>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16 max-w-4xl mx-auto reveal reveal-up">
          {TOOL_PILLS.map((pill, i) => (
            <span key={pill} className="pill-jitter inline-block bg-noise-black text-noise-white text-xs md:text-sm font-outfit px-4 py-2 md:px-5 md:py-2.5 select-none transition-all duration-200" style={{ '--pill-rot': `${(i % 5) * 2 - 4}deg`, '--pill-delay': `${i * 0.08}s` }}>{pill}</span>
          ))}
        </div>
        <p className="font-outfit text-noise-black text-lg md:text-xl max-w-xl mx-auto leading-relaxed text-center reveal reveal-up">Independence should be an advantage.<br />Right now, it&rsquo;s a full-time admin job.</p>
      </div>
    </section>
  )
}

export default memo(ProblemSection)
