import { useEffect, useRef, useState, memo } from 'react'

function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const move = (e) => {
      if (dotRef.current) { dotRef.current.style.left = `${e.clientX - 4}px`; dotRef.current.style.top = `${e.clientY - 4}px` }
      if (ringRef.current) { ringRef.current.style.left = `${e.clientX - 20}px`; ringRef.current.style.top = `${e.clientY - 20}px` }
    }
    const over = (e) => { if (e.target.closest('a, button, [role="button"], .magnetic-btn, .eco-panel, input')) setHovering(true) }
    const out = () => setHovering(false)
    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseover', over); document.removeEventListener('mouseout', out) }
  }, [])

  if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) return null
  return (<>
    <div ref={dotRef} className={`custom-cursor-dot ${hovering ? 'cursor-hover' : ''}`} />
    <div ref={ringRef} className="cursor-ring" style={{ opacity: hovering ? 0 : 1 }} />
  </>)
}

export default memo(CustomCursor)
