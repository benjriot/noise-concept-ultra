import { memo } from 'react'
import { STATS } from '../../data/constants'
import SlotMachineStat from '../SlotMachineStat'

function StatsSection() {
  return (
    <section id="stats" className="bg-noise-yellow tear-top tear-bottom" style={{ '--tear-color': '#000' }}>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => <div key={s.label} className={i < STATS.length - 1 ? 'border-r border-noise-black/10' : ''}><SlotMachineStat num={s.num} prefix={s.prefix} suffix={s.suffix} label={s.label} /></div>)}
      </div>
    </section>
  )
}

export default memo(StatsSection)
