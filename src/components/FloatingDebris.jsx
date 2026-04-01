import { memo } from 'react'
import { DEBRIS_ITEMS } from '../data/constants'

function FloatingDebris() {
  return <>{DEBRIS_ITEMS.slice(0, 6).map((item, i) => <div key={i} className="debris" style={{ left: `${10 + (i * 15) % 80}%`, animationDelay: `${i * 3}s`, animationDuration: `${20 + (i % 3) * 5}s` }}>{item}</div>)}</>
}

export default memo(FloatingDebris)
