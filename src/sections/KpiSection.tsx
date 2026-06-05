import { useRef } from 'react'
import {
  type LucideIcon,
  CalendarClock,
  Briefcase,
  Zap,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

type Kpi = {
  value: string
  label: string
  description: string
  Icon: LucideIcon
}

const KPIS: Kpi[] = [
  {
    value: '3+',
    label: 'Years in data',
    description: 'Specialized in data-driven insight',
    Icon: CalendarClock,
  },
  {
    value: '6+',
    label: 'Projects shipped',
    description: 'End-to-end analytics solutions',
    Icon: Briefcase,
  },
  {
    value: '70%',
    label: 'Efficiency gain',
    description: 'Worley OCR optimization',
    Icon: Zap,
  },
  {
    value: '639%',
    label: 'Modeled ROI',
    description: 'Green Chef capstone',
    Icon: TrendingUp,
  },
]

function KpiPanel({
  kpi,
  index,
  total,
}: {
  kpi: Kpi
  index: number
  total: number
}) {
  return (
    <div className="shrink-0 w-screen h-screen flex items-end justify-start px-6 sm:px-12 md:px-20 pb-16 sm:pb-20 md:pb-24 relative">
      {/* Counter pill top-right */}
      <div className="absolute top-8 right-6 sm:right-12 md:right-20 flex items-center gap-2 text-[#D7E2EA]/35 font-light tracking-widest text-xs sm:text-sm uppercase">
        <span>0{index + 1}</span>
        <span className="opacity-40">/</span>
        <span>0{total}</span>
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-6 sm:gap-8">
        {/* Big number — full width, can be as large as it wants */}
        <div className="flex flex-col gap-3 sm:gap-5">
          <kpi.Icon size={24} className="text-[#D7E2EA]/35" strokeWidth={1.4} />
          <span
            className="hero-heading font-black leading-none tracking-tight"
            style={{ fontSize: 'clamp(6rem, 22vw, 26rem)' }}
          >
            {kpi.value}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#D7E2EA]/10" />

        {/* Label + description — sits cleanly below the number */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-10">
          <div className="flex flex-col gap-2 max-w-lg">
            <span
              className="text-[#D7E2EA] font-medium uppercase tracking-widest"
              style={{ fontSize: 'clamp(1rem, 2.2vw, 1.6rem)' }}
            >
              {kpi.label}
            </span>
            <span
              className="text-[#D7E2EA]/55 font-light leading-relaxed"
              style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)' }}
            >
              {kpi.description}
            </span>
          </div>
          {index < total - 1 && (
            <div className="flex items-center gap-2 text-[#D7E2EA]/30 font-light tracking-widest text-xs uppercase shrink-0">
              <span>Keep scrolling</span>
              <ArrowRight size={13} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function KpiSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const totalShift = ((KPIS.length - 1) / KPIS.length) * 100
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${totalShift}%`],
  )

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0C0C0C]"
      style={{ height: `${KPIS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        <motion.div
          className="flex h-full"
          style={{ x, width: `${KPIS.length * 100}vw` }}
        >
          {KPIS.map((kpi, i) => (
            <KpiPanel
              key={kpi.value}
              kpi={kpi}
              index={i}
              total={KPIS.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
