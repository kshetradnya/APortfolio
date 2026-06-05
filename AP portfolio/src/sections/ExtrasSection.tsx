import { useCallback, useRef } from 'react'
import FadeIn from '../components/FadeIn'
import CircularGallery from '../components/CircularGallery'

const GALLERY_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80&auto=format&fit=crop',
    text: 'Football',
  },
  {
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80&auto=format&fit=crop',
    text: 'Gaming',
  },
  {
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80&auto=format&fit=crop',
    text: 'Manga',
  },
  {
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&auto=format&fit=crop',
    text: 'People',
  },
  {
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80&auto=format&fit=crop',
    text: 'Weekend Leagues',
  },
  {
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80&auto=format&fit=crop',
    text: 'Co-op Nights',
  },
  {
    image: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=800&q=80&auto=format&fit=crop',
    text: 'Anime & Art',
  },
  {
    image: 'https://images.unsplash.com/photo-1495592822108-9e6261896da8?w=800&q=80&auto=format&fit=crop',
    text: 'Coffee Chats',
  },
]

export default function ExtrasSection() {
  const nextSectionRef = useRef<HTMLElement | null>(null)

  const handleLoopComplete = useCallback(() => {
    // Scroll to the next section (Timeline) after one full gallery loop
    const timeline = document.getElementById('timeline')
    if (timeline) {
      timeline.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section
      id="extras"
      ref={nextSectionRef as React.RefObject<HTMLElement>}
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-0 py-20 sm:py-24 md:py-32 overflow-hidden"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-10 sm:mb-14 md:mb-20 px-5 sm:px-8 md:px-10"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Extras
      </FadeIn>

      <div style={{ height: '520px', position: 'relative', width: '100%' }}>
        <CircularGallery
          items={GALLERY_ITEMS}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
          scrollSpeed={3}
          fontUrl={undefined}
          onLoopComplete={handleLoopComplete}
        />
      </div>

      <p className="text-center text-[#D7E2EA]/30 text-xs uppercase tracking-widest mt-6 px-5">
        Scroll the gallery · one full loop continues to the next section
      </p>
    </section>
  )
}
