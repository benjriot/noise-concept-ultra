import { memo } from 'react'

const ITEMS = ['INDEPENDENCE IS POWER', 'YOUR MUSIC YOUR MONEY', 'ZERO MIDDLEMEN', 'WE TURN UP']

function YellowBand() {
  return (
    <div className="bg-noise-yellow overflow-hidden">
      <div className="ticker-scroll-fast flex whitespace-nowrap py-4">
        {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((t, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span className="font-brexter text-[6vw] md:text-[3vw] lg:text-[2.5vw] uppercase tracking-tight text-noise-black">{t}</span>
            <span className="text-noise-black/30 mx-4 md:mx-8 text-[3vw] md:text-[1.5vw] flex-shrink-0">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default memo(YellowBand)
