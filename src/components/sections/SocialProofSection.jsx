import { memo } from 'react'
import { SOCIAL_PROOF, PROOF_POSITIONS } from '../../data/constants'
import StaggerHeading from '../StaggerHeading'

function SocialProofSection() {
  return (
    <section id="proof" className="relative py-20 md:py-32 overflow-hidden tear-top" style={{ '--tear-color': '#0a0a0a' }}>
      <div className="absolute inset-0"><img src="/images/rave-crowd.jpg" alt="" className="w-full h-full object-cover" style={{ filter: 'grayscale(100%) contrast(1.3) brightness(0.1)' }} /><div className="absolute inset-0 bg-noise-black/80" /></div>
      <div className="relative z-10 px-6 md:px-12 lg:px-16 xl:px-20 max-w-[1400px] mx-auto">
        <span className="font-space text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-noise-yellow/60 block mb-6">[PROOF]</span>
        <StaggerHeading text="DON'T TAKE OUR WORD FOR IT." scramble className="font-brexter text-[8vw] md:text-[4vw] uppercase leading-[0.85] tracking-tight text-noise-white mb-8 md:mb-12" />
        <div className="relative h-[600px] md:h-[700px]">
          {SOCIAL_PROOF.map((item, i) => {
            const pos = PROOF_POSITIONS[i]
            const isLg = item.size === 'lg'
            const isMd = item.size === 'md'
            return (
              <div key={i} className="proof-card bg-noise-surface border border-noise-border p-4 md:p-6 corner-brackets" style={{ top: pos.top, left: pos.left, width: isLg ? '45%' : isMd ? '40%' : '35%', transform: `rotate(${pos.rot}deg)`, zIndex: pos.z }}>
                <blockquote className={`font-brexter uppercase tracking-tight leading-[1.05] ${isLg ? 'text-[4vw] md:text-[2vw] text-noise-yellow' : isMd ? 'text-[3vw] md:text-[1.4vw] text-noise-white' : 'text-[2.5vw] md:text-[1.1vw] text-noise-grey-light'}`}>
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <cite className="block mt-3 font-space text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-noise-grey not-italic">
                  {item.author} &mdash; {item.detail}
                </cite>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default memo(SocialProofSection)
