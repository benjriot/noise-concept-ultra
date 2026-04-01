import { memo } from 'react'
import { TIMELINE_EVENTS } from '../../data/constants'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

function TimelineNode({ evt, index }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.5 })
  return (
    <div ref={ref} className={`timeline-node relative pl-12 md:pl-20 pb-12 md:pb-16 ${isVisible ? 'timeline-visible' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
      <div className={`absolute left-2.5 md:left-6.5 top-1 w-4 h-4 rounded-full border-2 transition-all duration-500 ${isVisible ? 'bg-noise-yellow border-noise-yellow shadow-[0_0_15px_rgba(255,255,0,0.5)]' : 'bg-noise-black border-noise-border'}`} />
      <span className="font-brexter text-noise-yellow text-xl md:text-2xl uppercase tracking-tight block">{evt.year}</span>
      <span className="font-brexter text-noise-white text-base md:text-lg uppercase tracking-tight block mt-1">{evt.title}</span>
      <p className="font-outfit text-noise-grey text-sm mt-2">{evt.desc}</p>
    </div>
  )
}

function TimelineSection() {
  return (
    <section id="timeline" className="relative py-20 md:py-32 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20 max-w-[1000px] mx-auto">
        <span className="font-space text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-noise-yellow/60 block mb-16">[THE REVOLUTION]</span>
        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-noise-border" />
          {TIMELINE_EVENTS.map((evt, i) => (
            <TimelineNode key={evt.year} evt={evt} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(TimelineSection)
