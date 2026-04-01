import { useEffect, useRef, useState, memo } from 'react'
import { GLITCH_CHARS } from '../data/constants'

function TypewriterLine({ text, delay = 0, speed = 40, isYellow = false, onDone }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  const innerTimeouts = useRef([])

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let idx = 0
    const interval = setInterval(() => {
      if (idx >= text.length) {
        clearInterval(interval)
        setDisplayed(text)
        setDone(true)
        onDoneRef.current?.()
        return
      }
      if (Math.random() < 0.3 && idx > 0) {
        const glitchChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        setDisplayed(text.slice(0, idx) + glitchChar)
        const t = setTimeout(() => {
          setDisplayed(text.slice(0, idx + 1))
        }, speed / 2)
        innerTimeouts.current.push(t)
      } else {
        setDisplayed(text.slice(0, idx + 1))
      }
      idx++
    }, speed)
    return () => {
      clearInterval(interval)
      innerTimeouts.current.forEach(clearTimeout)
      innerTimeouts.current = []
    }
  }, [started, text, speed])

  return (
    <span className={`hero-glitch block ${isYellow ? 'text-noise-yellow glow-yellow-intense' : 'text-noise-white'}`}>
      {displayed}
      {started && !done && <span className="typewriter-cursor">&nbsp;</span>}
    </span>
  )
}

export default memo(TypewriterLine)
