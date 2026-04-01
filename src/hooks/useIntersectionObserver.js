import { useEffect, useRef, useState } from 'react'

export default function useIntersectionObserver({ threshold = 0.3, rootMargin, once = true } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        if (once) obs.unobserve(el)
      } else if (!once) {
        setIsVisible(false)
      }
    }, { threshold, rootMargin })

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}
