import { memo } from 'react'
import NoiseLogo from '../NoiseLogo'

function FooterSection() {
  return (
    <footer className="bg-noise-black border-t border-noise-border py-12 md:py-16">
      <div className="px-6 md:px-12 lg:px-16 xl:px-20 max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <a href="#" className="select-none block"><NoiseLogo className="h-8 w-auto" color="#FFFF00" /></a>
        <div className="flex flex-wrap gap-6 md:gap-8">
          {['Artists', 'Events', 'Studio', 'Academy', 'About'].map((l) => <a key={l} href="#" className="font-outfit text-noise-grey text-sm hover:text-noise-yellow transition-colors duration-200 uppercase tracking-wider">{l}</a>)}
        </div>
        <div className="flex gap-3">
          {['IG', 'TW', 'TK', 'YT'].map((s) => <a key={s} href="#" className="font-brexter text-noise-grey text-[10px] hover:text-noise-yellow transition-colors duration-200 w-8 h-8 border border-noise-border hover:border-noise-yellow flex items-center justify-center">{s}</a>)}
        </div>
      </div>
      <div className="px-6 md:px-12 lg:px-16 xl:px-20 max-w-[1400px] mx-auto mt-10 pt-6 border-t border-noise-border flex flex-col sm:flex-row justify-between gap-4">
        <span className="font-outfit text-noise-grey/40 text-xs">&copy; 2026 Noise Music Ltd. All rights reserved.</span>
        <span className="font-space text-noise-grey/20 text-[9px] uppercase tracking-[0.3em]">Built for artists, not algorithms. /// ULTRA MODE</span>
        <div className="flex gap-6">
          <a href="#" className="font-outfit text-noise-grey/40 text-xs hover:text-noise-grey transition-colors duration-200">Privacy</a>
          <a href="#" className="font-outfit text-noise-grey/40 text-xs hover:text-noise-grey transition-colors duration-200">Terms</a>
        </div>
      </div>
    </footer>
  )
}

export default memo(FooterSection)
