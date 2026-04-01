import { memo, useRef, useEffect, useState } from 'react'

const ITEMS = ['NOT A LABEL', 'NOT A DISTRIBUTOR', 'THE OS FOR INDEPENDENT MUSIC', 'WE TURN UP', 'KILL THE MIDDLEMAN']

function TickerItem({ text, pos }) {
  if (text === 'KILL THE MIDDLEMAN') {
    return <span className="font-brexter text-[6vw] md:text-[3vw] lg:text-[2.5vw] uppercase tracking-tight bg-noise-yellow text-noise-black px-4 py-1 skew-x-[-4deg] inline-block">{text}</span>
  }
  if (pos % 2 === 0) {
    return <span className="font-brexter text-[6vw] md:text-[3vw] lg:text-[2.5vw] uppercase tracking-tight" style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,0,0.6)' }}>{text}</span>
  }
  return <span className="font-brexter text-[6vw] md:text-[3vw] lg:text-[2.5vw] uppercase tracking-tight text-noise-yellow">{text}</span>
}

function TickerSet() {
  return (
    <>
      {ITEMS.map((t, i) => (
        <span key={i} className="flex items-center flex-shrink-0">
          <TickerItem text={t} pos={i} />
          <span className="text-noise-yellow/30 mx-4 md:mx-8 text-[3vw] md:text-[1.5vw] flex-shrink-0">/</span>
        </span>
      ))}
    </>
  )
}

function TickerBand() {
  const groupRef = useRef(null)
  const [setWidth, setSetWidth] = useState(0)

  useEffect(() => {
    if (!groupRef.current) return
    const measure = () => setSetWidth(groupRef.current.offsetWidth)
    // Wait for fonts to load before measuring
    document.fonts.ready.then(() => {
      measure()
      // Re-measure after a short delay as a safety net
      setTimeout(measure, 500)
    })
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <div className="bg-noise-black overflow-hidden" style={{ borderTop: '3px solid #FFFF00', borderBottom: '3px solid #FFFF00' }}>
      <div
        className="flex whitespace-nowrap py-5 md:py-7"
        style={setWidth ? {
          animation: `tickerExact 12s linear infinite`,
          '--ticker-set-width': `-${setWidth}px`,
        } : undefined}
      >
        <div ref={groupRef} className="flex flex-shrink-0"><TickerSet /></div>
        <div className="flex flex-shrink-0"><TickerSet /></div>
        <div className="flex flex-shrink-0"><TickerSet /></div>
        <div className="flex flex-shrink-0"><TickerSet /></div>
      </div>
    </div>
  )
}

export default memo(TickerBand)
