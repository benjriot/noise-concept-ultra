import { useEffect, useRef, memo } from 'react'
import NoiseLogo from './NoiseLogo'
import MagneticButton from './MagneticButton'

const COLOR_STOPS = [
  [0, '#FFFF00'],
  [200, '#FFFFFF'],
  [600, '#E5FF00'],
  [1200, '#FF66E1'],
  [2000, '#66FFFF'],
  [3000, '#B266FF'],
  [4000, '#FE7A2B'],
  [5000, '#FFFF00'],
]

function getLogoColor(y) {
  for (let i = COLOR_STOPS.length - 1; i >= 0; i--) {
    if (y >= COLOR_STOPS[i][0]) return COLOR_STOPS[i][1]
  }
  return '#FFFF00'
}

function Navigation() {
  const logoRef = useRef(null)

  useEffect(() => {
    let raf
    const update = () => {
      const y = parseFloat(document.documentElement.style.getPropertyValue('--scroll-y')) || 0
      const vel = parseFloat(document.documentElement.style.getPropertyValue('--scroll-vel')) || 0
      const logo = logoRef.current
      if (logo) {
        logo.style.fill = getLogoColor(y)
        if (vel > 10) {
          logo.style.filter = `drop-shadow(${vel * 0.2}px 0 0 rgba(255,102,225,0.5)) drop-shadow(-${vel * 0.2}px 0 0 rgba(102,255,255,0.5))`
        } else {
          logo.style.filter = 'none'
        }
        logo.style.transform = `scaleX(${1 + Math.sin(y * 0.003) * 0.03}) scaleY(${1 + Math.cos(y * 0.004) * 0.02}) skewX(${Math.sin(y * 0.002) * 0.5}deg)`
      }
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 md:py-5 mix-blend-difference">
      <a href="#" className="select-none block">
        <NoiseLogo ref={logoRef} className="h-8 md:h-10 w-auto" />
      </a>
      <div className="flex items-center gap-5">
        <button className="flex flex-col gap-[5px] group cursor-pointer" aria-label="Menu">
          <span className="block w-7 h-[2px] bg-noise-white group-hover:bg-noise-yellow transition-colors duration-200" />
          <span className="block w-5 h-[2px] bg-noise-white group-hover:bg-noise-yellow transition-colors duration-200 ml-auto" />
          <span className="block w-7 h-[2px] bg-noise-white group-hover:bg-noise-yellow transition-colors duration-200" />
        </button>
        <MagneticButton href="#pricing" className="hidden sm:inline-block font-brexter text-xs md:text-sm uppercase tracking-wider bg-noise-yellow text-noise-black px-5 py-2 hover:bg-white transition-colors duration-200">Join Free</MagneticButton>
      </div>
    </nav>
  )
}

export default memo(Navigation)
