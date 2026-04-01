import { useEffect, useRef, useState, memo } from 'react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

function SlotMachineStat({ num, prefix, suffix, label }) {
  const [digits, setDigits] = useState([])
  const { ref, isVisible: started } = useIntersectionObserver({ threshold: 0.5 })
  const lockedRef = useRef([])
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!started || hasStarted.current) return
    hasStarted.current = true
    const target = String(num)
    const timeouts = []

    const spinInterval = setInterval(() => {
      setDigits(
        target.split('').map((d, i) =>
          lockedRef.current.includes(i) ? d : String(Math.floor(Math.random() * 10))
        )
      )
    }, 50)

    target.split('').forEach((_, i) => {
      timeouts.push(setTimeout(() => {
        lockedRef.current = [...lockedRef.current, i]
      }, 600 + i * 200))
    })

    timeouts.push(setTimeout(() => {
      clearInterval(spinInterval)
      setDigits(target.split(''))
    }, 600 + target.length * 200 + 100))

    return () => {
      clearInterval(spinInterval)
      timeouts.forEach(clearTimeout)
    }
  }, [started, num])

  const displayDigits = hasStarted.current ? digits : String(num).split('').map(() => '0')

  return (
    <div ref={ref} className="px-4 md:px-8 lg:px-12 py-10 md:py-16 text-center">
      <span className="font-brexter text-noise-black text-[10vw] md:text-[4vw] lg:text-[3.2vw] leading-none block whitespace-nowrap">
        {prefix || ''}{displayDigits.join('')}{suffix || ''}
      </span>
      <span className="font-space text-noise-black/50 text-[9px] md:text-[10px] uppercase tracking-[0.3em] mt-3 block">{label}</span>
    </div>
  )
}

export default memo(SlotMachineStat)
