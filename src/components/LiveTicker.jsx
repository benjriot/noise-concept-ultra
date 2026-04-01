import { memo } from 'react'
import { LIVE_TICKER_ITEMS } from '../data/constants'

function LiveTicker() {
  return (
    <div className="fixed right-0 top-20 bottom-0 w-48 lg:w-56 z-40 pointer-events-none hidden xl:block overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
      <div className="live-ticker-track">
        {[...LIVE_TICKER_ITEMS, ...LIVE_TICKER_ITEMS].map((item, i) => (
          <div key={i} className="px-3 py-3 border-b border-noise-border/20">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-noise-lime flex-shrink-0 mt-1.5 animate-pulse" />
              <span className="font-space text-[8px] text-noise-grey/40 leading-relaxed uppercase tracking-wider">{item}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(LiveTicker)
