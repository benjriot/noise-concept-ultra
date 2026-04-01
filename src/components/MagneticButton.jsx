import { useRef, useCallback, memo } from 'react'

function MagneticButton({ children, className = '', href = '#', ...props }) {
  const ref = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (!ref.current || !window.matchMedia('(hover: hover)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const dist = Math.sqrt(x * x + y * y)
    const maxDist = 100
    if (dist < maxDist) {
      const pull = (1 - dist / maxDist) * 15
      ref.current.style.transform = `translate(${x * pull / maxDist}px, ${y * pull / maxDist}px)`
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }, [])

  return (
    <a ref={ref} href={href} className={`magnetic-btn inline-block ${className}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} {...props}>
      {children}
    </a>
  )
}

export default memo(MagneticButton)
