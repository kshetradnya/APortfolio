import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const NAME = 'Anrunya'

export default function Loader() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 100
    const stepTime = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current++
      setCount(current)
      if (current >= steps) clearInterval(timer)
    }, stepTime)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
      style={{ backgroundColor: '#0C0C0C' }}
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
    >
      <div className="overflow-hidden px-4">
        <h1
          className="font-black uppercase leading-none tracking-tight flex"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          {NAME.split('').map((letter, i) => (
            <span
              key={i}
              className="hero-heading loader-letter"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col items-center gap-3"
      >
        <span
          className="hero-heading font-black tabular-nums"
          style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
        >
          {String(count).padStart(2, '0')}%
        </span>

        {/* Progress bar */}
        <div className="w-40 sm:w-56 h-[2px] bg-[#D7E2EA]/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${count}%`,
              background: 'linear-gradient(90deg, #B600A8, #7621B0)',
            }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
