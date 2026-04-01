import { memo } from 'react'
import { GALLERY_IMAGES } from '../../data/constants'

function GallerySection() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-noise-black py-0">
      <div className="absolute top-0 left-0 right-0 h-16 md:h-24 bg-noise-yellow origin-top-left" style={{ transform: 'skewY(-2deg)', transformOrigin: 'top left' }} />
      <div className="relative z-10 mt-8 md:mt-12 overflow-x-auto">
        <div className="flex gap-1" style={{ width: 'max-content' }}>
          {GALLERY_IMAGES.map((src, i) => (
            <img key={i} src={src} alt="" className="h-[220px] md:h-[300px] w-auto object-cover corner-brackets" style={{ filter: 'grayscale(100%) contrast(1.4) brightness(0.7)' }} loading="lazy" />
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 py-4 text-noise-yellow/20">
        <span className="font-brexter text-2xl">&raquo;&raquo;&raquo;</span>
        <span className="font-brexter text-2xl">&rsaquo;</span>
        <span className="font-brexter text-2xl">&raquo;&raquo;&raquo;</span>
        <span className="font-brexter text-2xl">&rsaquo;</span>
      </div>
    </section>
  )
}

export default memo(GallerySection)
