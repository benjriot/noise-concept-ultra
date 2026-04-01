import { memo } from 'react'

function LightningBolt({ className = '' }) {
  return (
    <svg className={`lightning-bolt ${className}`} viewBox="0 0 80 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 0L20 120H45L10 300L70 150H40L80 0H50Z" fill="#FFFF00" />
      <path d="M50 0L20 120H45L10 300L70 150H40L80 0H50Z" fill="url(#lgGlow)" opacity="0.6" />
      <defs>
        <linearGradient id="lgGlow" x1="40" y1="0" x2="40" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFF00" />
          <stop offset="0.5" stopColor="#E5FF00" />
          <stop offset="1" stopColor="#FFFF00" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default memo(LightningBolt)
