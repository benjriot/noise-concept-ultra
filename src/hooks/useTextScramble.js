import { useEffect, useRef, useState } from 'react'
import { GLITCH_CHARS } from '../data/constants'

export default function useTextScramble(text, isVisible, duration = 800) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!isVisible) { setDisplay(text); return }
    const chars = text.split('')
    const resolved = new Array(chars.length).fill(false)
    const startTime = performance.now()

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      const result = chars.map((char, i) => {
        if (char === ' ') return ' '
        const charProgress = (progress * chars.length - i) / 3
        if (charProgress > 1 || resolved[i]) { resolved[i] = true; return char }
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
      }).join('')

      setDisplay(result)
      if (progress < 1) frameRef.current = requestAnimationFrame(animate)
      else setDisplay(text)
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [isVisible, text, duration])

  return display
}
