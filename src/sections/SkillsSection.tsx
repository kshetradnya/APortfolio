import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

type Skill = {
  number: string
  name: string
  description: string
  detail: string
}

const SKILLS: Skill[] = [
  {
    number: '01',
    name: 'Data Analysis',
    description:
      'Diving into raw datasets to mine patterns, uncover trends, and surface the insights that actually matter.',
    detail:
      'Pipelines built with Python (Pandas, NumPy). Applied across analytics internships at RPG Group and Worley — statistical models and operational analytics that informed real product and business decisions.',
  },
  {
    number: '02',
    name: 'PowerBI',
    description:
      'Crafting interactive dashboards that turn dense, messy metrics into clear, decision-ready visuals.',
    detail:
      'Built dashboards for marketing campaigns, internal operations, and capstone analyses. Specialty: data storytelling at the executive layer — fewer numbers on the screen, more decisions out of the room.',
  },
  {
    number: '03',
    name: 'JMP & Statistics',
    description:
      'Statistical modeling, regression, and hypothesis testing for rigorous, defensible conclusions.',
    detail:
      'Regression, ANOVA, hypothesis testing, predictive modeling. From coursework at Virginia Tech to live operational analytics at RPG Group — turning gut feelings into testable claims.',
  },
  {
    number: '04',
    name: 'SQL & Data Mining',
    description:
      'Pulling, joining, and transforming data across sources to build the clean pipelines insights depend on.',
    detail:
      'Multi-source ETL pipelines, schema design, data quality validation, downstream integration. The unglamorous plumbing that determines whether anything downstream is trustworthy.',
  },
  {
    number: '05',
    name: 'Data Storytelling',
    description:
      'Translating numbers into narratives — making findings memorable, actionable, and easy to share.',
    detail:
      'Presentations, dashboards, executive-ready visuals. Communication is the last 50% of any analysis — and the part that decides whether the first 50% matters.',
  },
]

const ease = [0.25, 0.1, 0.25, 1] as const

function SkillRow({
  skill,
  index,
  isOpen,
  onToggle,
}: {
  skill: Skill
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease }}
      style={{ borderTop: '1px solid rgba(12, 12, 12, 0.15)' }}
    >
      <motion.button
        type="button"
        onClick={onToggle}
        whileHover={{ x: 12 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="group w-full text-left flex items-start gap-5 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className="text-[#0C0C0C] font-black leading-none shrink-0 transition-all duration-300 ease-out group-hover:scale-[1.1] group-hover:text-[#7621B0]"
          style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
        >
          {skill.number}
        </span>

        <div className="flex-1 flex flex-col gap-3 md:gap-4 pt-1">
          <h3
            className="text-[#0C0C0C] font-medium uppercase leading-tight transition-colors duration-300 group-hover:text-[#7621B0]"
            style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
          >
            {skill.name}
          </h3>
          <p
            className="text-[#0C0C0C]/60 font-light leading-relaxed max-w-2xl"
            style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
          >
            {skill.description}
          </p>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="detail"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease }}
                style={{ overflow: 'hidden' }}
              >
                <motion.p
                  initial={{ y: -8 }}
                  animate={{ y: 0 }}
                  exit={{ y: -8 }}
                  transition={{ duration: 0.45, ease }}
                  className="mt-2 text-[#7621B0] font-light leading-relaxed max-w-2xl border-l-2 border-[#7621B0]/30 pl-4"
                  style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)' }}
                >
                  {skill.detail}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle indicator */}
        <motion.span
          className="shrink-0 mt-1 sm:mt-2 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border border-[#0C0C0C]/20 flex items-center justify-center text-[#0C0C0C] transition-colors duration-300 group-hover:border-[#7621B0] group-hover:text-[#7621B0]"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <Plus size={18} strokeWidth={2.4} />
        </motion.span>
      </motion.button>
    </motion.div>
  )
}

export default function SkillsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="xl:hidden relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0, margin: '60px' }}
        transition={{ duration: 0.7, ease }}
        className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Skills
      </motion.h2>

      <div className="max-w-5xl mx-auto">
        {SKILLS.map((skill, i) => (
          <SkillRow
            key={skill.number}
            skill={skill}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  )
}
