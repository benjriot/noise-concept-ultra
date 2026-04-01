import { memo } from 'react'
import MagneticButton from '../MagneticButton'

function CTASection({ inverted }) {
  return (
    <section id="cta" className={`relative overflow-hidden transition-all duration-700 ${inverted ? 'inversion-cta inverted' : 'bg-noise-yellow'}`}>
      {!inverted && <div className="absolute inset-0"><img src="/images/truck-festival.jpg" alt="" className="w-full h-full object-cover opacity-20" style={{ filter: 'grayscale(100%) contrast(1.5)' }} /></div>}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 xl:px-20 max-w-[1400px] mx-auto py-24 md:py-40 text-center">
        <h2 className={`font-brexter text-[7vw] md:text-[4vw] lg:text-[3.5vw] uppercase leading-[0.9] tracking-tight max-w-5xl mx-auto transition-colors duration-700 text-noise-black`}>
          {inverted ? 'YOUR MOVE.' : 'MAKING INDEPENDENCE THE MOST POWERFUL DEAL IN MUSIC.'}
        </h2>
        {inverted && <p className="font-outfit text-noise-grey mt-4 text-lg">The industry won't change itself. We did.</p>}
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
          <MagneticButton className={`font-brexter text-base md:text-lg uppercase tracking-wider px-12 py-4 transition-all duration-500 static-burst ${inverted ? 'bg-noise-yellow text-noise-black hover:bg-noise-lime' : 'bg-noise-black text-noise-yellow hover:bg-noise-surface'}`}>Join The Movement</MagneticButton>
          <span className="font-outfit text-sm uppercase tracking-[0.25em] text-noise-black/50">We Turn Up.</span>
        </div>
      </div>
    </section>
  )
}

export default memo(CTASection)
