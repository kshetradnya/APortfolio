import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const FlowingMenu = lazy(() => import('./FlowingMenu'))

const NAV_ITEMS = [
  {
    link: '#about',
    text: 'About',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80&auto=format&fit=crop',
  },
  {
    link: '#projects',
    text: 'Projects',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop',
  },
  {
    link: '#timeline',
    text: 'Journey',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80&auto=format&fit=crop',
  },
  {
    link: '#extras',
    text: 'Extras',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80&auto=format&fit=crop',
  },
  {
    link: '#contact',
    text: "Let's Talk",
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&auto=format&fit=crop',
  },
]

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col items-center justify-center gap-[5px] w-5 h-5">
      <motion.span
        className="block h-[1.5px] w-5 bg-white origin-center rounded-full"
        animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="block h-[1.5px] w-5 bg-white rounded-full"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-[1.5px] w-5 bg-white origin-center rounded-full"
        animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  )
}

export default function NavMenu() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleMenuClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'A' || target.closest('a')) {
      setTimeout(() => setOpen(false), 120)
    }
  }

  return (
    <>
      {/* Full-screen FlowingMenu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-overlay"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 3.5rem) calc(100% - 3.5rem))' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 3.5rem) calc(100% - 3.5rem))' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 3.5rem) calc(100% - 3.5rem))' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50"
            onClick={handleMenuClick}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <Suspense fallback={null}>
              <FlowingMenu
                items={NAV_ITEMS as any}
                bgColor="#0C0C0C"
                textColor="#D7E2EA"
                marqueeBgColor="#B600A8"
                marqueeTextColor="#ffffff"
                borderColor="rgba(215,226,234,0.12)"
                speed={12}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Circular hamburger button — appears after scrolling past hero */}
      <AnimatePresence>
        {visible && (
          <motion.button
            key="nav-btn"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setOpen(o => !o)}
            className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: open
                ? 'linear-gradient(135deg, #7621B0, #B600A8)'
                : 'linear-gradient(135deg, #B600A8, #7621B0)',
              boxShadow: '0 4px 24px rgba(182, 0, 168, 0.45)',
            }}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
          >
            <HamburgerIcon open={open} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
