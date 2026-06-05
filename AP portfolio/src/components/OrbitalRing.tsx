import { useState } from 'react'

const ORBIT_IMAGES = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80&auto=format&fit=crop',
]

export default function OrbitalRing() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const isAnyHovered = hoveredIdx !== null
  const count = ORBIT_IMAGES.length

  return (
    /* width/height: 100% fills the absolute wrapper div in ContactSection */
    <div
      className="orbit-ring"
      style={
        {
          width: '100%',
          height: '100%',
          ['--orbit-radius' as string]: 'min(62vh, 60vw, 650px)',
          animationPlayState: isAnyHovered ? 'paused' : 'running',
        } as React.CSSProperties
      }
      aria-hidden
    >
      {ORBIT_IMAGES.map((src, i) => {
        const angle = (i / count) * 360
        const itemHovered = hoveredIdx === i
        return (
          <div
            key={i}
            className="absolute"
            style={{
              /* Images radiate from the exact center of this full-section div */
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(-1 * var(--orbit-radius))) rotate(${-angle}deg)`,
            }}
          >
            <div
              className="orbit-counter"
              style={{ animationPlayState: isAnyHovered ? 'paused' : 'running' }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Inner div handles hover-scale independently of counter-rotate animation */}
              <div
                className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D7E2EA]/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)] cursor-pointer"
                style={{
                  transform: itemHovered ? 'scale(1.55)' : 'scale(1)',
                  transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
