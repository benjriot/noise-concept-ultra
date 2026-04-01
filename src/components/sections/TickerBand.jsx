import { memo } from 'react'

const ITEMS = ['NOT A LABEL', 'NOT A DISTRIBUTOR', 'THE OS FOR INDEPENDENT MUSIC', 'WE TURN UP', 'KILL THE MIDDLEMAN']

function TickerBand() {
  return (
    <div className="bg-noise-black overflow-hidden" style={{ borderTop: '3px solid #FFFF00', borderBottom: '3px solid #FFFF00' }}>
      <div className="ticker-scroll-fast flex whitespace-nowrap py-5 md:py-7">
        {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((t, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            {t === 'KILL THE MIDDLEMAN'
              ? <span className="font-brexter text-[6vw] md:text-[3vw] lg:text-[2.5vw] uppercase tracking-tight bg-noise-yellow text-noise-black px-4 py-1 skew-x-[-4deg] inline-block">{t}</span>
              : i % 2 === 0
              ? <span className="font-brexter text-[6vw] md:text-[3vw] lg:text-[2.5vw] uppercase tracking-tight" style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,0,0.6)' }}>{t}</span>
              : <span className="font-brexter text-[6vw] md:text-[3vw] lg:text-[2.5vw] uppercase tracking-tight text-noise-yellow">{t}</span>}
            <span className="text-noise-yellow/30 mx-4 md:mx-8 text-[3vw] md:text-[1.5vw] flex-shrink-0">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default memo(TickerBand)
