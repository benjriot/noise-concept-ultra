import { useEffect, useRef, useState, useCallback } from 'react'
import { KONAMI, SECTIONS } from './data/constants'
import useScrollData from './hooks/useScrollData'

/* ── Global components ── */
import ErrorBoundary from './components/ErrorBoundary'
import CRTBoot from './components/CRTBoot'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import FloatingDebris from './components/FloatingDebris'
import LiveTicker from './components/LiveTicker'
import Navigation from './components/Navigation'

/* ── Sections ── */
import HeroSection from './components/sections/HeroSection'
import GallerySection from './components/sections/GallerySection'
import ProblemSection from './components/sections/ProblemSection'
import TickerBand from './components/sections/TickerBand'
import ManifestoSection from './components/sections/ManifestoSection'
import OldVsNoiseSection from './components/sections/OldVsNoiseSection'
import EcosystemSection from './components/sections/EcosystemSection'
import StatsSection from './components/sections/StatsSection'
import BuiltDifferentSection from './components/sections/BuiltDifferentSection'
import SignalLostSection from './components/sections/SignalLostSection'
import ArtistOSSection from './components/sections/ArtistOSSection'
import YellowBand from './components/sections/YellowBand'
import SocialProofSection from './components/sections/SocialProofSection'

import PricingSection from './components/sections/PricingSection'
import CTASection from './components/sections/CTASection'
import FooterSection from './components/sections/FooterSection'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [ctaInverted, setCtaInverted] = useState(false)
  const [raveMode, setRaveMode] = useState(false)
  const konamiRef = useRef([])

  // Scroll data via refs + CSS custom properties (no re-renders)
  useScrollData()

  // Scroll-triggered .reveal class observer
  useEffect(() => {
    if (!booted) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          // Also handle rgb-split activation
          if (e.target.classList.contains('rgb-split')) e.target.classList.add('rgb-active')
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal, .rgb-split').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [booted])

  // CTA inversion observer
  useEffect(() => {
    if (!booted) return
    const ctaEl = document.getElementById('cta')
    if (!ctaEl) return
    const obs = new IntersectionObserver(([e]) => setCtaInverted(e.isIntersecting), { threshold: 0.4 })
    obs.observe(ctaEl)
    return () => obs.disconnect()
  }, [booted])

  // Konami code easter egg
  useEffect(() => {
    const handleKey = (e) => {
      konamiRef.current.push(e.key)
      if (konamiRef.current.length > KONAMI.length) konamiRef.current.shift()
      if (konamiRef.current.join(',') === KONAMI.join(',')) {
        setRaveMode(true)
        setTimeout(() => setRaveMode(false), 3000)
        konamiRef.current = []
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleBootComplete = useCallback(() => setBooted(true), [])

  return (
    <div className={`bg-noise-black text-noise-white min-h-screen overflow-x-hidden relative ${raveMode ? 'rave-mode' : ''}`}>
      {!booted && <CRTBoot onComplete={handleBootComplete} />}
      <CustomCursor />
      <ScrollProgress />

      <ErrorBoundary sectionName="navigation">
        <Navigation />
      </ErrorBoundary>

      <ErrorBoundary sectionName="hero">
        <HeroSection booted={booted} />
      </ErrorBoundary>

      <ErrorBoundary sectionName="gallery">
        <GallerySection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="problem">
        <ProblemSection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="ticker-band">
        <TickerBand />
      </ErrorBoundary>

      <ErrorBoundary sectionName="manifesto">
        <ManifestoSection />
      </ErrorBoundary>

      <div className="glitch-border h-0 relative" />

      <ErrorBoundary sectionName="old-vs-noise">
        <OldVsNoiseSection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="ecosystem">
        <EcosystemSection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="stats">
        <StatsSection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="built-different">
        <BuiltDifferentSection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="signal-lost">
        <SignalLostSection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="artistos">
        <ArtistOSSection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="yellow-band">
        <YellowBand />
      </ErrorBoundary>

      <ErrorBoundary sectionName="social-proof">
        <SocialProofSection />
      </ErrorBoundary>

<ErrorBoundary sectionName="pricing">
        <PricingSection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="cta">
        <CTASection inverted={ctaInverted} />
      </ErrorBoundary>

      <ErrorBoundary sectionName="footer">
        <FooterSection />
      </ErrorBoundary>

      <FloatingDebris />
      <LiveTicker />
    </div>
  )
}
