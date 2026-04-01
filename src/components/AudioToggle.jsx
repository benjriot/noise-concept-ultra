import { useEffect, useRef, useState, memo } from 'react'
import { SECTIONS } from '../data/constants'

const audioCtxRef = { current: null }
function getAudioCtx() {
  if (!audioCtxRef.current) {
    try {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    } catch (e) { return null }
  }
  if (audioCtxRef.current?.state === 'suspended') audioCtxRef.current.resume()
  return audioCtxRef.current
}

function playClickSound() {
  try {
    const ctx = getAudioCtx()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = 800 + Math.random() * 400
    gain.gain.value = 0.03
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.06)
  } catch(e) {}
}

function playWhoosh() {
  try {
    const ctx = getAudioCtx()
    if (!ctx) return
    const bufferSize = ctx.sampleRate * 0.15
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
    const source = ctx.createBufferSource()
    source.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 400
    filter.Q.value = 0.5
    const gain = ctx.createGain()
    gain.gain.value = 0.04
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    source.start()
  } catch(e) {}
}

function AudioToggle() {
  const [muted, setMuted] = useState(true)
  const oscRef = useRef(null)
  const gainRef = useRef(null)

  useEffect(() => {
    const handleHover = (e) => {
      if (muted) return
      if (e.target.closest('a, button, [role="button"]')) playClickSound()
    }
    document.addEventListener('mouseover', handleHover)
    return () => document.removeEventListener('mouseover', handleHover)
  }, [muted])

  useEffect(() => {
    if (muted) return
    const sectionIds = SECTIONS.map(s => s.id)
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) playWhoosh() })
    }, { threshold: 0.1 })
    // Delay observer setup to ensure sections are mounted
    const t = setTimeout(() => {
      sectionIds.forEach(id => {
        const el = document.getElementById(id)
        if (el) obs.observe(el)
      })
    }, 100)
    return () => { clearTimeout(t); obs.disconnect() }
  }, [muted])

  // Cleanup oscillators on unmount
  useEffect(() => {
    return () => {
      try { oscRef.current?.stop() } catch(e) {}
      oscRef.current = null
      gainRef.current = null
    }
  }, [])

  const toggle = () => {
    const ctx = getAudioCtx()
    if (!ctx) return
    if (muted) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 40
      gain.gain.value = 0
      gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.5)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      oscRef.current = osc
      gainRef.current = gain
    } else {
      if (gainRef.current) gainRef.current.gain.linearRampToValueAtTime(0, getAudioCtx().currentTime + 0.3)
      setTimeout(() => { try { oscRef.current?.stop() } catch(e) {} }, 400)
    }
    setMuted(!muted)
  }

  return (
    <button onClick={toggle} className="audio-toggle" aria-label={muted ? 'Unmute' : 'Mute'}>
      <div className={`audio-bars ${muted ? 'audio-muted' : ''}`}>
        {[...Array(5)].map((_, i) => <div key={i} className="audio-bar" />)}
      </div>
    </button>
  )
}

export default memo(AudioToggle)
