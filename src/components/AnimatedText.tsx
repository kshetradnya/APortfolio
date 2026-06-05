import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type AnimatedTextProps = {
  text: string
  className?: string
  style?: React.CSSProperties
}

function Char({
  char,
  range,
  progress,
}: {
  char: string
  range: [number, number]
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0 }}>{char}</span>
      <motion.span
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          opacity,
        }}
      >
        {char}
      </motion.span>
    </span>
  )
}

export default function AnimatedText({
  text,
  className,
  style,
}: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const words = text.split(' ')
  const totalChars = words.reduce((sum, w) => sum + w.length, 0)
  let charIndex = 0

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => (
        <span key={wi}>
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {[...word].map((c, ci) => {
              const start = charIndex / totalChars
              const end = (charIndex + 1) / totalChars
              charIndex++
              return (
                <Char
                  key={ci}
                  char={c}
                  range={[start, end]}
                  progress={scrollYProgress}
                />
              )
            })}
          </span>
          {wi < words.length - 1 && ' '}
        </span>
      ))}
    </p>
  )
}
