import { memo, useRef, useEffect, useState } from 'react'

const LOGOS = [
  { name: 'Hospitality', src: '/brand/partners/hospitality.webp' },
  { name: 'Pioneer DJ', src: '/brand/partners/pioneer-dj.svg' },
  { name: 'AlphaTheta', src: '/brand/partners/alphatheta.webp' },
  { name: 'Ministry of Sound', src: '/brand/partners/ministry-of-sound.webp', highlight: true },
  { name: 'Forbidden Forest', src: '/brand/partners/forbidden-forest.webp' },
  { name: 'Jubel', src: '/brand/partners/jubel.webp' },
]

function LogoItem({ logo, pos }) {
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
    return (
      <span
        className={`block ${sizeClass}`}
        style={{ ...maskStyle, backgroundColor: 'rgba(255,255,0,0.55)' }}
        aria-label={logo.name}
      />
    )
  }

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

// Hidden preload images — force browser to fetch and lay out the masks so
// measurement reflects final rendered width.
function LogoPreload() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {LOGOS.map((l) => <img key={l.src} src={l.src} alt="" />)}
    </div>
  )
}

function LogoTicker() {
  const groupRef = useRef(null)
  const [setWidth, setSetWidth] = useState(0)

  useEffect(() => {
    if (!groupRef.current) return
    const measure = () => {
      if (!groupRef.current) return
      const w = groupRef.current.offsetWidth
      if (w > 0) setSetWidth(w)
    }

    // Initial measurement once fonts are loaded
    document.fonts.ready.then(() => {
      measure()
      setTimeout(measure, 300)
      setTimeout(measure, 1000)
      setTimeout(measure, 2500)
    })

    // Remeasure whenever the group's size changes (handles image loads)
    const ro = new ResizeObserver(() => measure())
    ro.observe(groupRef.current)

    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <div className="bg-noise-black overflow-hidden relative" style={{ borderTop: '3px solid #FFFF00', borderBottom: '3px solid #FFFF00' }}>
      <LogoPreload />
      <div
        className="flex whitespace-nowrap py-5 md:py-7"
        style={setWidth ? {
          animation: `tickerExactReverse 14s linear infinite`,
          '--ticker-set-width': `-${setWidth}px`,
        } : undefined}
      >
        <div ref={groupRef} className="flex flex-shrink-0"><LogoSet /></div>
        <div className="flex flex-shrink-0"><LogoSet /></div>
        <div className="flex flex-shrink-0"><LogoSet /></div>
        <div className="flex flex-shrink-0"><LogoSet /></div>
      </div>
    </div>
  )
}

export default memo(LogoTicker)
