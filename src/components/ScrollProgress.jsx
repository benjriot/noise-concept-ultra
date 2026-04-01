import { useEffect, useState, memo } from 'react'
import { SECTIONS } from '../data/constants'

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [label, setLabel] = useState('')
  useEffect(() => {
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) { setLabel(SECTIONS[i].label); break }
      }
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (<>
    <div className="scroll-progress" style={{ width: `${progress}%` }} />
    {label && <div className="scroll-section-label">{label}</div>}
  </>)
}

export default memo(ScrollProgress)
