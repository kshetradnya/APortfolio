import {
  type LucideIcon,
  GraduationCap,
  Briefcase,
  Code2,
  Sparkles,
  TrendingUp,
  BookOpen,
} from 'lucide-react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import FadeIn from '../components/FadeIn'

type Milestone = {
  date: string
  title: string
  place: string
  description: string
  Icon: LucideIcon
}

const MILESTONES: Milestone[] = [
  {
    date: '2021 — 2024',
    title: 'B.Tech, CSE & Data Science',
    place: 'NMIMS · Mumbai',
    description:
      'First steps into data science. Won the 2021 dashboard competition analyzing 200K+ climate change records across multiple datasets.',
    Icon: BookOpen,
  },
  {
    date: 'Summer 2023',
    title: 'Data & Analytics Intern',
    place: 'Worley',
    description:
      'Built an OCR-based extraction system for architectural drawings at a billion-dollar engineering firm — 70% efficiency gain, 50% drop in manual data entry.',
    Icon: Briefcase,
  },
  {
    date: '2023 — 2024',
    title: 'ML & ETL Projects',
    place: 'Independent / Coursework',
    description:
      'Shipped a facial recognition attendance system in Python and a sales campaign ETL pipeline with Python + SAS Viya, surfacing conversion insights.',
    Icon: Code2,
  },
  {
    date: '2024 — 2025',
    title: 'B.S. Business Information Technology',
    place: 'Virginia Tech · Magna Cum Laude',
    description:
      'Stepped into managing a team of 20+ as Student Assistant Manager at VT Dining Services — optimizing workflows and using sales data to drive staffing decisions.',
    Icon: GraduationCap,
  },
  {
    date: 'Summer 2025',
    title: 'Analytics Intern',
    place: 'RPG Group',
    description:
      'Designed and implemented the data pipeline architecture powering application analytics at a billion-dollar firm, building reporting frameworks that informed product decisions.',
    Icon: TrendingUp,
  },
  {
    date: '2025 — 2026',
    title: 'M.Sc. Global Business Analytics',
    place: 'Virginia Tech · Magna Cum Laude',
    description:
      'Currently pursuing — turning complex datasets into strategic insights that drive smarter decisions.',
    Icon: Sparkles,
  },
]

const SIDEBAR_SKILLS = [
  { number: '01', name: 'Data Analysis', description: 'Mining patterns and trends from raw datasets to surface insights that matter.', detail: 'Pipelines with Python (Pandas, NumPy). Applied at RPG Group and Worley — statistical models and operational analytics informing real product decisions.' },
  { number: '02', name: 'PowerBI', description: 'Interactive dashboards turning dense metrics into clear, decision-ready visuals.', detail: 'Built for marketing campaigns, internal ops, and capstone analyses. Specialty: data storytelling at the executive layer.' },
  { number: '03', name: 'JMP & Statistics', description: 'Statistical modeling and hypothesis testing for rigorous, defensible conclusions.', detail: 'Regression, ANOVA, hypothesis testing, predictive modeling — from Virginia Tech coursework to live operational analytics at RPG Group.' },
  { number: '04', name: 'SQL & Data Mining', description: 'Pulling and transforming data across sources to build clean pipelines.', detail: 'Multi-source ETL, schema design, data quality validation. The plumbing that determines whether anything downstream is trustworthy.' },
  { number: '05', name: 'Data Storytelling', description: 'Translating numbers into narratives — memorable, actionable, shareable.', detail: 'Presentations, dashboards, executive-ready visuals. Communication is the last 50% of any analysis.' },
]

const ease = [0.16, 1, 0.3, 1] as const

function CompactSkillsPanel({ narrow }: { narrow: boolean }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <div className="bg-white rounded-[28px] overflow-hidden shadow-xl">
      <div className="p-6 sm:p-7">
        <h3
          className="text-[#0C0C0C] font-black uppercase tracking-tight mb-6"
          style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)' }}
        >
          Skills
        </h3>
        {SIDEBAR_SKILLS.map((skill, i) => {
          const isOpen = openIdx === i
          return (
            <div
              key={skill.number}
              className="border-t border-[#0C0C0C]/8 cursor-pointer group"
              onClick={() => setOpenIdx(isOpen ? null : i)}
            >
              <div className="flex items-start gap-4 py-4 sm:py-5">
                {/* Number */}
                <span
                  className="font-black shrink-0 leading-none mt-0.5 transition-colors duration-300"
                  style={{
                    fontSize: '1.4rem',
                    color: isOpen ? '#B600A8' : 'rgba(12,12,12,0.22)',
                  }}
                >
                  {skill.number}
                </span>

                <div className="flex-1 min-w-0">
                  <span
                    className="text-[#0C0C0C] font-semibold uppercase block leading-tight transition-colors duration-300 group-hover:text-[#7621B0]"
                    style={{ fontSize: '0.95rem', letterSpacing: '0.04em' }}
                  >
                    {skill.name}
                  </span>
                  {!narrow && (
                    <p className="text-[#0C0C0C]/50 text-sm leading-relaxed mt-1">
                      {skill.description}
                    </p>
                  )}
                  <AnimatePresence initial={false}>
                    {!narrow && isOpen && (
                      <motion.p
                        key="detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-[#7621B0] text-sm leading-relaxed mt-2 border-l-2 border-[#7621B0]/40 pl-3 overflow-hidden"
                      >
                        {skill.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {!narrow && (
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="shrink-0 text-[#0C0C0C]/25 text-xl leading-none mt-0.5 group-hover:text-[#7621B0] transition-colors duration-300"
                  >
                    +
                  </motion.span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TimelineItem({ item, index }: { item: Milestone; index: number }) {
  const isLast = index === MILESTONES.length - 1

  return (
    <motion.div
      className="relative flex gap-5 sm:gap-7"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '40px' }}
      transition={{ duration: 0.65, delay: index * 0.06, ease }}
    >
      {/* Left: dot + continuing line */}
      <div className="flex flex-col items-center shrink-0" style={{ paddingTop: '3px' }}>
        <motion.div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full z-10 flex items-center justify-center shrink-0"
          style={{
            background: 'linear-gradient(135deg, #B600A8 0%, #7621B0 100%)',
            boxShadow: '0 0 0 3px #0C0C0C, 0 0 20px rgba(182,0,168,0.35)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.06 + 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <item.Icon size={15} className="text-white" strokeWidth={2} />
        </motion.div>
        {!isLast && (
          <div
            className="w-px flex-1 mt-2"
            style={{ background: 'linear-gradient(to bottom, rgba(182,0,168,0.3), rgba(118,33,176,0.15), transparent)', minHeight: '2rem' }}
          />
        )}
      </div>

      {/* Right: card */}
      <div className={`flex-1 min-w-0 ${isLast ? 'pb-0' : 'pb-8 sm:pb-10'}`}>
        <motion.div
          className="rounded-2xl sm:rounded-3xl border p-4 sm:p-6"
          style={{
            background: 'rgba(215,226,234,0.03)',
            borderColor: 'rgba(215,226,234,0.08)',
          }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: '30px' }}
          transition={{ duration: 0.55, delay: index * 0.06 + 0.18, ease }}
          whileHover={{
            borderColor: 'rgba(182,0,168,0.25)',
            background: 'rgba(182,0,168,0.04)',
            transition: { duration: 0.25 },
          }}
        >
          <span className="text-[#D7E2EA]/35 text-[0.7rem] sm:text-xs uppercase tracking-[0.2em] font-light">
            {item.date}
          </span>
          <h3
            className="text-[#D7E2EA] font-semibold leading-tight mt-1.5"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          >
            {item.title}
          </h3>
          <span
            className="mt-1 block font-light text-sm"
            style={{
              background: 'linear-gradient(90deg, #B600A8, #7621B0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {item.place}
          </span>
          <p className="text-[#D7E2EA]/55 text-sm sm:text-[0.95rem] leading-relaxed mt-2.5 font-light">
            {item.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.1'],
  })
  const railHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="timeline"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-24"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Timeline
      </FadeIn>

      <div className="flex flex-col xl:flex-row gap-10 xl:gap-12 items-start max-w-6xl mx-auto">

        {/* Timeline — left column */}
        <div ref={containerRef} className="relative flex-1 min-w-0">
          {/* Animated rail — absolutely behind the dots */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{ left: '18px', background: 'rgba(215,226,234,0.07)' }}
            aria-hidden
          />
          <motion.div
            className="absolute top-0 w-px"
            style={{
              left: '18px',
              height: railHeight,
              background: 'linear-gradient(to bottom, #B600A8, #7621B0 60%, rgba(190,76,0,0.4), transparent)',
              boxShadow: '0 0 12px rgba(182,0,168,0.3)',
            }}
            aria-hidden
          />

          <div className="relative">
            {MILESTONES.map((item, i) => (
              <TimelineItem key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Skills sidebar — right column, xl+ */}
        <div className="hidden xl:block xl:w-[400px] xl:shrink-0 xl:sticky xl:top-24 xl:self-start">
          <CompactSkillsPanel narrow={false} />
        </div>
      </div>
    </section>
  )
}
