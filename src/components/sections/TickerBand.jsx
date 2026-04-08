import { memo, useRef, useEffect, useState } from 'react'

const SLOGANS = ['NOT A LABEL', 'NOT A DISTRIBUTOR', 'THE OS FOR INDEPENDENT MUSIC', 'WE TURN UP', 'KILL THE MIDDLEMAN']

const LOGOS = [
  { name: 'Hospitality', src: '/brand/partners/hospitality.webp' },
  { name: 'Pioneer DJ', src: '/brand/partners/pioneer-dj.svg' },
  { name: 'AlphaTheta', src: '/brand/partners/alphatheta.webp' },
  { name: 'Ministry of Sound', src: '/brand/partners/ministry-of-sound.webp', highlight: true },
  { name: 'Forbidden Forest', src: '/brand/partners/forbidden-forest.webp' },
  { name: 'Jubel', src: '/brand/partners/jubel.webp' },
]

function TickerItem({ text, pos, highlight }) {
  if (text === highlight) {
    return <span className="font-brexter text-[6vw] md:text-[3vw] lg:text-[2.5vw] uppercase tracking-tight bg-noise-yellow text-noise-black px-4 py-1 skew-x-[-4deg] inline-block">{text}</span>
  }
  if (pos % 2 === 0) {
    return <span className="font-brexter text-[6vw] md:text-[3vw] lg:text-[2.5vw] uppercase tracking-tight" style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,0,0.6)' }}>{text}</span>
  }
  return <span className="font-brexter text-[6vw] md:text-[3vw] lg:text-[2.5vw] uppercase tracking-tight text-noise-yellow">{text}</span>
}

function TickerSet({ items }) {
  return (
    <>
      {items.map((t, i) => (
        <span key={i} className="flex items-center flex-shrink-0">
          <TickerItem text={t} pos={i} highlight="KILL THE MIDDLEMAN" />
          <span className="text-noise-yellow/30 mx-4 md:mx-8 text-[3vw] md:text-[1.5vw] flex-shrink-0">/</span>
        </span>
      ))}
    </>
  )
}

function LogoItem({ logo, pos }) {
  // Tinted logo via mask-image (forces any colour logo to be solid yellow)
  const maskStyle = {
    WebkitMaskImage: `url(${logo.src})`,
    maskImage: `url(${logo.src})`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
  }

  const sizeClass = 'h-[9vw] md:h-[4.5vw] lg:h-[3.5vw] w-[22vw] md:w-[11vw] lg:w-[9vw]'

  if (logo.highlight) {
    // Yellow background block with black logo (inverted tint)
    return (
      <span className="bg-noise-yellow px-5 py-2 skew-x-[-4deg] inline-flex items-center justify-center" aria-label={logo.name}>
        <span
          className="block h-[6vw] md:h-[3vw] lg:h-[2.4vw] w-[18vw] md:w-[9vw] lg:w-[7vw]"
          style={{ ...maskStyle, backgroundColor: '#000' }}
        />
      </span>
    )
  }

  if (pos % 2 === 0) {
    // Outline style: yellow logo with reduced opacity (matches outline text style)
    return (
      <span
        className={`block ${sizeClass}`}
        style={{ ...maskStyle, backgroundColor: 'rgba(255,255,0,0.55)' }}
        aria-label={logo.name}
      />
    )
  }

  // Filled yellow style
  return (
    <span
      className={`block ${sizeClass}`}
      style={{ ...maskStyle, backgroundColor: '#FFFF00' }}
      aria-label={logo.name}
    />
  )
}

function LogoSet() {
  return (
    <>
      {LOGOS.map((logo, i) => (
        <span key={i} className="flex items-center flex-shrink-0">
          <LogoItem logo={logo} pos={i} />
          <span className="text-noise-yellow/30 mx-4 md:mx-8 text-[3vw] md:text-[1.5vw] flex-shrink-0">/</span>
        </span>
      ))}
    </>
  )
}

function TickerRow({ renderSet, reverse, borderTop, borderBottom }) {
  const groupRef = useRef(null)
  const [setWidth, setSetWidth] = useState(0)

  useEffect(() => {
    if (!groupRef.current) return
    const measure = () => setSetWidth(groupRef.current.offsetWidth)
    document.fonts.ready.then(() => {
      measure()
      setTimeout(measure, 500)
      setTimeout(measure, 1500)
    })
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const borderStyle = {}
  if (borderTop) borderStyle.borderTop = '3px solid #FFFF00'
  if (borderBottom) borderStyle.borderBottom = '3px solid #FFFF00'

  return (
    <div className="bg-noise-black overflow-hidden" style={borderStyle}>
      <div
        className="flex whitespace-nowrap py-5 md:py-7"
        style={setWidth ? {
          animation: `${reverse ? 'tickerExactReverse' : 'tickerExact'} 12s linear infinite`,
          '--ticker-set-width': `-${setWidth}px`,
        } : undefined}
      >
        <div ref={groupRef} className="flex flex-shrink-0">{renderSet()}</div>
        <div className="flex flex-shrink-0">{renderSet()}</div>
        <div className="flex flex-shrink-0">{renderSet()}</div>
        <div className="flex flex-shrink-0">{renderSet()}</div>
      </div>
    </div>
  )
}

function TickerBand() {
  return (
    <>
      <TickerRow renderSet={() => <TickerSet items={SLOGANS} />} borderTop borderBottom />
      <TickerRow renderSet={() => <LogoSet />} reverse borderBottom />
    </>
  )
}

export default memo(TickerBand)
