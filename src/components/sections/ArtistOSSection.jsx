import { useEffect, useState, memo } from 'react'
import { SLIDES, FEATURES_GRID } from '../../data/constants'
import MagneticButton from '../MagneticButton'

// Filter out the 2 offline items — they belong to EcosystemSection
const ARTISTOS_FEATURES = FEATURES_GRID.filter(
  (f) => f.front !== 'LIVE EVENTS' && f.front !== 'STUDIO ACCESS'
)

// Consequence-framed benefit ladder — what the artist actually GETS
const BENEFIT_LADDER = [
  { num: '01', title: '100% royalties. Forever.', desc: 'Every penny from every stream, every download, every sync — paid weekly. No middleman cut. No retroactive contracts.' },
  { num: '02', title: 'Replace 16 tools with one login.', desc: 'Distribution, smart links, analytics, marketing, finance, fan CRM, AI coaching — all in one place. Reclaim 20+ hours a week.' },
  { num: '03', title: 'Your personal A&R, on tap.', desc: 'NoiseIQ tells you what to release, when, where, and to whom. Built on data from 50+ artists already winning.' },
  { num: '04', title: 'Built-in finance ledger.', desc: 'Auto-split with collaborators. Track every income stream. Export ready-for-accountant reports. No spreadsheets, no arguments.' },
  { num: '05', title: 'You own everything.', desc: 'Your masters. Your data. Your fans. Your career. Cancel anytime — your music stays live forever.' },
]

function ArtistOSSection() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  useEffect(() => {
    if (isPaused) return
    const t = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [isPaused])
  const goTo = (i) => { setActive(i); setIsPaused(true) }

  return (
    <section id="artistos" className="relative py-24 md:py-40 overflow-hidden bg-noise-black">
      <div className="relative px-6 md:px-12 lg:px-16 xl:px-20 max-w-[1500px] mx-auto">

        {/* HEADER — clear hierarchy: logo (hero) → tagline → subcopy → transition beat */}
        <div className="text-center mb-20 md:mb-28 reveal reveal-up">
          {/* Eyebrow */}
          <span className="font-space text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-artistos-green/70 block mb-8">[001 — THE WEAPON]</span>

          {/* PRIMARY — logo (the hero) */}
          <div
            role="img"
            aria-label="ArtistOS"
            className="block mx-auto mb-8 md:mb-10 w-full max-w-[820px]"
            style={{
              aspectRatio: '2186 / 492',
              backgroundColor: '#ADFF2F',
              WebkitMaskImage: 'url(/brand/artistos/horizontal-green.png)',
              maskImage: 'url(/brand/artistos/horizontal-green.png)',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              filter: 'drop-shadow(0 0 80px rgba(173,255,47,0.28))',
            }}
          />

          {/* SECONDARY — tagline, capped so it never wraps ugly */}
          <h3 className="font-brexter text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.95] tracking-tight text-noise-white max-w-[820px] mx-auto mb-5">
            Everything an artist needs<br className="hidden sm:block" /> to stay <span className="text-artistos-green">independent.</span>
          </h3>

          {/* TERTIARY — subcopy */}
          <p className="font-outfit text-noise-grey-light text-sm md:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
            One platform. Replaces 16 apps. Reclaims 20+ hours a week. Keeps 100% of your money. <span className="text-artistos-green font-semibold">Forever.</span>
          </p>

          {/* TRANSITION BEAT — small, elegant, not a competing hero */}
          <div className="mt-12 md:mt-16 flex items-center justify-center gap-5">
            <div className="h-px w-10 md:w-16 bg-artistos-green/40" />
            <p className="font-brexter text-artistos-green text-sm md:text-base lg:text-lg uppercase tracking-[0.15em]">
              Kill the middleman. Keep <span className="italic">your</span> money.
            </p>
            <div className="h-px w-10 md:w-16 bg-artistos-green/40" />
          </div>
        </div>

        {/* DASHBOARD CAROUSEL — green frame */}
        <div className="relative max-w-6xl mx-auto reveal reveal-up mb-20 md:mb-28">
          <div className="absolute -inset-8 md:-inset-16 bg-artistos-green/10 blur-3xl pointer-events-none" />

          <div className="relative bg-noise-surface border-2 border-artistos-green/40 rounded-lg overflow-hidden shadow-[0_0_120px_rgba(173,255,47,0.18)]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-artistos-green/25 bg-noise-surface-2">
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" /></div>
              <div className="flex-1 mx-4 max-w-md"><div className="bg-noise-black/50 rounded-md px-3 py-1.5 flex items-center gap-2"><span className="text-noise-grey/40 text-[10px]">&#128274;</span><span className="font-mono text-noise-grey text-[11px] tracking-wider">noisemusic.io/ArtistOS/{SLIDES[active].id}</span></div></div>
              <div className="hidden md:flex items-center gap-1">{SLIDES.map((s, i) => <button key={s.id} onClick={() => goTo(i)} className={`font-outfit text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-md transition-all duration-300 cursor-pointer ${i === active ? 'bg-artistos-green text-noise-black font-semibold' : 'text-noise-grey hover:text-noise-white'}`}>{s.label}</button>)}</div>
            </div>
            <div className="relative aspect-[16/10] bg-noise-black overflow-hidden">
              {SLIDES.map((s, i) => <img key={s.id} src={s.img} alt={`ArtistOS ${s.label}`} className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700" style={{ opacity: i === active ? 1 : 0, transform: i === active ? 'scale(1)' : 'scale(1.02)' }} />)}
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-outfit text-noise-grey text-sm md:text-base italic">{SLIDES[active].caption}</p>
            <div className="flex items-center gap-3">
              <button onClick={() => { setActive((a) => (a - 1 + SLIDES.length) % SLIDES.length); setIsPaused(true) }} className="w-9 h-9 border border-noise-border rounded-full flex items-center justify-center text-noise-grey hover:text-artistos-green hover:border-artistos-green transition-colors cursor-pointer">&#8592;</button>
              <div className="flex items-center gap-2">{SLIDES.map((_, i) => <button key={i} onClick={() => goTo(i)} className="cursor-pointer"><div className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-artistos-green' : 'w-2.5 bg-noise-grey/30'}`} /></button>)}</div>
              <button onClick={() => setIsPaused(!isPaused)} className="w-9 h-9 border border-noise-border rounded-full flex items-center justify-center text-noise-grey hover:text-artistos-green hover:border-artistos-green transition-colors cursor-pointer">{isPaused ? '\u25B6' : '\u23F8'}</button>
              <button onClick={() => { setActive((a) => (a + 1) % SLIDES.length); setIsPaused(true) }} className="w-9 h-9 border border-noise-border rounded-full flex items-center justify-center text-noise-grey hover:text-artistos-green hover:border-artistos-green transition-colors cursor-pointer">&#8594;</button>
            </div>
          </div>
        </div>

        {/* BENEFIT LADDER — consequence framing, what the artist actually gets */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-12 reveal reveal-up">
            <p className="font-space text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-artistos-green/70 mb-4">[ WHAT YOU ACTUALLY GET ]</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-artistos-green/20 max-w-6xl mx-auto">
            {BENEFIT_LADDER.map((b, i) => (
              <div
                key={b.num}
                className="bg-noise-black p-7 md:p-9 reveal reveal-up hover:bg-noise-surface transition-colors duration-500"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <span className="font-space text-[10px] uppercase tracking-[0.3em] text-artistos-green/70 block mb-4">[{b.num}]</span>
                <h4 className="font-brexter text-artistos-green text-2xl md:text-3xl uppercase leading-tight tracking-tight mb-4">{b.title}</h4>
                <p className="font-outfit text-noise-grey-light text-sm md:text-base leading-relaxed">{b.desc}</p>
              </div>
            ))}
            {/* CTA cell that fills the 6th grid slot */}
            <div className="bg-artistos-green p-7 md:p-9 flex flex-col justify-center items-start reveal reveal-up" style={{ transitionDelay: '0.3s' }}>
              <span className="font-space text-[10px] uppercase tracking-[0.3em] text-noise-black/50 block mb-4">[ START ]</span>
              <h4 className="font-brexter text-noise-black text-2xl md:text-3xl uppercase leading-tight tracking-tight mb-4">Take it for free.</h4>
              <p className="font-outfit text-noise-black/70 text-sm md:text-base leading-relaxed mb-6">No card. No catch. No ransom. Cancel any time and your music stays live.</p>
              <MagneticButton href="#pricing" className="font-brexter text-xs md:text-sm uppercase tracking-wider bg-noise-black text-artistos-green px-6 py-3 hover:bg-noise-white hover:text-noise-black transition-colors duration-200 inline-flex items-center gap-2 self-start">
                Open ArtistOS &rarr;
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* FEATURE CALLOUT ROW — visual rhythm tie-back to slogan ticker */}
        <div className="max-w-5xl mx-auto reveal reveal-up">
          <p className="font-space text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-noise-grey/60 text-center mb-6">[ + 10 BUILT-IN FEATURES ]</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 md:gap-x-5">
            {ARTISTOS_FEATURES.map((f, i) => (
              <span key={f.front} className="flex items-center flex-shrink-0">
                {i % 2 === 0 ? (
                  <span
                    className="font-brexter text-base md:text-xl lg:text-2xl uppercase tracking-tight"
                    style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(173,255,47,0.65)' }}
                  >
                    {f.front}
                  </span>
                ) : (
                  <span className="font-brexter text-base md:text-xl lg:text-2xl uppercase tracking-tight text-artistos-green">
                    {f.front}
                  </span>
                )}
                {i < ARTISTOS_FEATURES.length - 1 && (
                  <span className="text-artistos-green/30 mx-3 md:mx-4 text-sm md:text-base flex-shrink-0">/</span>
                )}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default memo(ArtistOSSection)
