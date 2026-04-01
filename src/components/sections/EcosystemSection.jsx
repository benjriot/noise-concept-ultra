import { memo } from 'react'
import { ECOSYSTEM } from '../../data/constants'

function EcosystemSection() {
  return (
    <section id="ecosystem" className="relative overflow-hidden tear-top" style={{ '--tear-color': '#0a0a0a' }}>
      <div className="px-6 md:px-12 lg:px-16 xl:px-20 pt-16 md:pt-24 pb-6 md:pb-10">
        <span className="font-space text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-noise-yellow/60">[ECOSYSTEM]</span>
      </div>
      <div className="hidden md:flex h-[550px] lg:h-[650px]">
        {ECOSYSTEM.map((item, i) => (
          <div key={item.num} className="eco-panel relative overflow-hidden group" style={{ flex: '0.8', transition: 'flex 0.6s cubic-bezier(0.4,0,0.2,1)', cursor: 'pointer', borderRight: i < ECOSYSTEM.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
            onMouseEnter={e => e.currentTarget.style.flex = '4'}
            onMouseLeave={e => e.currentTarget.style.flex = '0.8'}>
            {item.img && <><img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'grayscale(70%) contrast(1.2) brightness(0.35)' }} /><div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, ${item.color}22 50%, rgba(0,0,0,0.7) 100%)` }} /></>}
            <div className="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 group-hover:opacity-0"><span className="font-brexter text-xl lg:text-2xl uppercase tracking-tight writing-vertical whitespace-nowrap select-none" style={{ color: item.color }}>{item.title}</span></div>
            <span className="absolute top-4 left-4 font-space text-[10px] uppercase tracking-wider" style={{ color: `${item.color}88` }}>{item.num}</span>
            <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10 opacity-0 transition-opacity duration-400 group-hover:opacity-100" style={{ transitionDelay: '0.2s' }}>
              <div className="max-w-md">
                <span className="font-space text-[10px] uppercase tracking-[0.25em] block mb-3" style={{ color: item.color }}>{item.num} — {item.title}</span>
                <h3 className="font-brexter text-noise-white text-3xl lg:text-4xl uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="font-outfit text-noise-grey-light text-sm lg:text-base leading-relaxed mb-6">{item.desc}</p>
                <span className="font-space text-[10px] uppercase tracking-[0.2em] border-b pb-1 transition-colors duration-300" style={{ color: item.color, borderColor: `${item.color}40` }}>Explore &#8594;</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="md:hidden flex flex-col gap-0">
        {ECOSYSTEM.map((item) => (
          <div key={item.num} className="relative h-64 overflow-hidden">
            {item.img && <><img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'grayscale(60%) contrast(1.2) brightness(0.3)' }} /><div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, ${item.color}22 100%)` }} /></>}
            <div className="relative z-10 flex flex-col justify-end h-full p-6">
              <span className="font-space text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: item.color }}>{item.num}</span>
              <h3 className="font-brexter text-noise-white text-2xl uppercase tracking-tight mb-2">{item.title}</h3>
              <p className="font-outfit text-noise-grey-light text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default memo(EcosystemSection)
