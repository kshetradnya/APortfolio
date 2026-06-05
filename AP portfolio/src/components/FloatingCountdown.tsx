import { useEffect, useRef, useState } from 'react'

// Counts down to graduation / availability date: May 15 2026
const TARGET = new Date('2026-08-15T00:00:00')
const LABEL = 'Days to graduation'

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(): TimeLeft {
  const now = Date.now()
  const diff = Math.max(0, TARGET.getTime() - now)
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function ScrollDigit({ value }: { value: string }) {
  const prev = useRef(value)
  const [animating, setAnimating] = useState(false)
  const [display, setDisplay] = useState(value)
  const [next, setNext] = useState(value)

  useEffect(() => {
    if (value !== prev.current) {
      setNext(value)
      setAnimating(true)
      const t = setTimeout(() => {
        setDisplay(value)
        setAnimating(false)
        prev.current = value
      }, 320)
      return () => clearTimeout(t)
    }
  }, [value])

  return (
    <span
      style={{
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        height: '1.2em',
        lineHeight: '1.2em',
        verticalAlign: 'bottom',
        width: '0.65em',
      }}
    >
      {/* outgoing */}
      <span
        style={{
          display: 'block',
          position: 'absolute',
          inset: 0,
          transform: animating ? 'translateY(-110%)' : 'translateY(0)',
          opacity: animating ? 0 : 1,
          transition: animating
            ? 'transform 0.32s cubic-bezier(0.16,1,0.3,1), opacity 0.18s ease'
            : 'none',
        }}
      >
        {display}
      </span>
      {/* incoming */}
      {animating && (
        <span
          style={{
            display: 'block',
            position: 'absolute',
            inset: 0,
            transform: 'translateY(0)',
            opacity: 1,
            animation: 'countdown-in 0.32s cubic-bezier(0.16,1,0.3,1) forwards',
          }}
        >
          {next}
        </span>
      )}
    </span>
  )
}

function AnimatedNumber({ value, label }: { value: number; label: string }) {
  const str = label === 'D' ? String(value).padStart(3, '0') : pad(value)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <div
        style={{
          fontFamily: "'Kanit', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(180deg, #646973 0%, #bbccd7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'inline-flex',
        }}
      >
        {str.split('').map((ch, i) => (
          <ScrollDigit key={i} value={ch} />
        ))}
      </div>
      <span
        style={{
          fontSize: '0.55rem',
          fontFamily: "'Kanit', sans-serif",
          fontWeight: 400,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(215,226,234,0.45)',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function FloatingCountdown() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <style>{`
        @keyframes countdown-in {
          from { transform: translateY(110%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes float-bob {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 1000,
          background: 'rgba(12,12,12,0.75)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(215,226,234,0.12)',
          borderRadius: '20px',
          padding: '0.9rem 1.2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.55rem',
          animation: 'float-bob 4s ease-in-out infinite',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(215,226,234,0.06)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden
      >
        <span
          style={{
            fontSize: '0.55rem',
            fontFamily: "'Kanit', sans-serif",
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(215,226,234,0.35)',
            marginBottom: 2,
          }}
        >
          {LABEL}
        </span>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.8rem' }}>
          <AnimatedNumber value={time.days} label="D" />
          <span style={{ color: 'rgba(215,226,234,0.25)', fontSize: '1.4rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.95rem' }}>:</span>
          <AnimatedNumber value={time.hours} label="H" />
          <span style={{ color: 'rgba(215,226,234,0.25)', fontSize: '1.4rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.95rem' }}>:</span>
          <AnimatedNumber value={time.minutes} label="M" />
          <span style={{ color: 'rgba(215,226,234,0.25)', fontSize: '1.4rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.95rem' }}>:</span>
          <AnimatedNumber value={time.seconds} label="S" />
        </div>
      </div>
    </>
  )
}
