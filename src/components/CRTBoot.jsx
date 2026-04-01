import { useEffect, useRef, useState } from 'react'
import { BOOT_LINES } from '../data/constants'

export default function CRTBoot({ onComplete }) {
  const [phase, setPhase] = useState('black')
  const [lines, setLines] = useState([])
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const timeouts = []
    timeouts.push(setTimeout(() => setPhase('flash'), 300))
    timeouts.push(setTimeout(() => setPhase('squeeze'), 450))
    timeouts.push(setTimeout(() => setPhase('terminal'), 1100))
    BOOT_LINES.forEach((line) => {
      timeouts.push(setTimeout(() => setLines(prev => [...prev, line]), (line.delay * 1000) + 1100))
    })
    timeouts.push(setTimeout(() => {
      setPhase('done')
      timeouts.push(setTimeout(() => onCompleteRef.current?.(), 800))
    }, 5200))
    return () => timeouts.forEach(clearTimeout)
  }, [])

  if (phase === 'done') {
    return <div className="crt-overlay boot-overlay-done" />
  }

  return (
    <div className={`crt-overlay ${phase === 'flash' ? 'crt-phase-flash' : ''} ${phase === 'squeeze' ? 'crt-phase-squeeze' : ''}`}>
      {(phase === 'terminal' || phase === 'phosphor') && (
        <>
          <div className="crt-phosphor" />
          <div className="crt-scanlines" />
          <div className="crt-flicker absolute inset-0 flex flex-col justify-center px-6 md:px-12 z-10">
            <div className="max-w-2xl">
              {lines.map((line, i) => (
                <div key={i} className="boot-line font-space text-[10px] md:text-[13px] leading-relaxed tracking-wider" style={{ animationDelay: `${i * 0.04}s` }}>
                  <span className="text-noise-yellow">{line.text}</span>
                  {line.result && (
                    <span className={`ml-3 ${line.result.includes('TERMINATED') || line.result.includes('ULTRA') ? 'text-noise-yellow font-bold' : 'text-noise-grey'}`}>
                      {line.result}
                    </span>
                  )}
                </div>
              ))}
              {lines.length > 0 && <span className="cursor-blink text-noise-yellow font-space text-[13px]">&#9608;</span>}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
