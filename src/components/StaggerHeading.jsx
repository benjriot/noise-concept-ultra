import { memo } from 'react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import useTextScramble from '../hooks/useTextScramble'

function StaggerHeading({ text, className = '', as: Tag = 'h2', scramble = false }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 })
  const scrambledText = useTextScramble(text, scramble && isVisible, 1000)
  const words = (scramble ? scrambledText : text).split(' ')
  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className={`stagger-word ${isVisible ? 'stagger-visible' : ''}`} style={{ transitionDelay: `${i * 0.08}s` }}>
          {w}{i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}

export default memo(StaggerHeading)
