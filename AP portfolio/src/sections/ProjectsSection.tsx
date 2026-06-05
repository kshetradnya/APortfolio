import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { X } from 'lucide-react'

type Kpi = { label: string; value: string }

type Project = {
  number: string
  category: string
  name: string
  tagline: string
  description: string
  bullets: string[]
  kpis: Kpi[]
  skills: string[]
  images: string[]
}

const PROJECTS: Project[] = [
  {
    number: '01',
    category: 'AI & Machine Learning',
    name: 'Green Chef Life Moments',
    tagline: 'AI-powered subscriber retention for life-disruption cancellations',
    description:
      'MSBA Capstone project developing an AI-powered classification system to identify subscribers canceling due to life events — relocation, new babies, health issues. Built a comprehensive economic model demonstrating significant business value with a 639% ROI.',
    bullets: [
      '21.86% of cancellations attributed to life disruptions',
      '88.2% AI classification accuracy',
      '$1.3M three-year net present value',
      '639% return on investment',
      '3.6-month payback period',
    ],
    kpis: [
      { label: 'Accuracy', value: '88.2%' },
      { label: 'NPV (3yr)', value: '$1.3M' },
      { label: 'ROI', value: '639%' },
      { label: 'Payback', value: '3.6 mo' },
      { label: 'Life Event Churn', value: '21.86%' },
    ],
    skills: ['Python', 'Machine Learning', 'NLP', 'Economic Modeling', 'Classification', 'Data Analysis'],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    number: '02',
    category: 'Data Visualization',
    name: 'Climate Change Dashboard',
    tagline: '2021 competition-winning dashboard on 30-year environmental trends',
    description:
      'Award-winning interactive dashboard analyzing 30-year climate trends across 200,000+ data points. Created layered, interactive visualizations that communicate complex environmental patterns to diverse audiences — earning first place in the 2021 Dashboard Competition.',
    bullets: [
      '200,000+ climate records analyzed across multiple datasets',
      '30-year longitudinal trend analysis',
      'Interactive multi-layer dashboard design',
      '1st place — 2021 Dashboard Competition',
    ],
    kpis: [
      { label: 'Records', value: '200K+' },
      { label: 'Trend Span', value: '30 yrs' },
      { label: 'Award', value: '1st Place' },
    ],
    skills: ['Tableau', 'Python', 'Data Visualization', 'Statistical Analysis', 'Environmental Data'],
    images: [
      'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    number: '03',
    category: 'Computer Vision',
    name: 'Facial Recognition Attendance',
    tagline: 'Real-time ML pipeline replacing manual attendance tracking',
    description:
      'Machine learning-based automated attendance system using facial recognition technology. Performs real-time detection and tracking with high accuracy across varied lighting conditions, replacing manual logging with a fully automated pipeline.',
    bullets: [
      'Real-time facial detection and recognition pipeline',
      'Automated attendance logging with audit trail',
      'High accuracy in varied lighting conditions',
      'Significant reduction in manual tracking overhead',
    ],
    kpis: [
      { label: 'Speed', value: 'Real-time' },
      { label: 'Automation', value: '100%' },
      { label: 'Manual Entry', value: '↓ ~80%' },
    ],
    skills: ['Python', 'OpenCV', 'Deep Learning', 'Face Recognition', 'Automation'],
    images: [
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    number: '04',
    category: 'Analytics & ETL',
    name: 'Sales Campaign Analysis',
    tagline: 'ETL pipeline + statistical models to measure and optimize campaign ROI',
    description:
      'Designed and implemented a comprehensive ETL pipeline to analyze sales campaign effectiveness across multiple channels. Built statistical models and interactive dashboards in Python + SAS Viya to measure ROI and deliver actionable insights to stakeholders.',
    bullets: [
      'Processed multi-channel campaign data end-to-end',
      'Built Python + SAS Viya automated reporting framework',
      'Delivered actionable ROI insights to stakeholders',
      'Surfaced key conversion insights from sales patterns',
    ],
    kpis: [
      { label: 'Pipeline', value: 'Automated' },
      { label: 'Channels', value: 'Multi' },
      { label: 'Tool', value: 'SAS Viya' },
    ],
    skills: ['Python', 'SAS Viya', 'ETL', 'SQL', 'Statistical Modeling', 'Dashboard Design'],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
    ],
  },
]

const cardRadius = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'

function KpiBox({ kpi }: { kpi: Kpi }) {
  return (
    <div
      className="flex flex-col gap-1 p-3 sm:p-4 rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(182,0,168,0.07) 0%, rgba(118,33,176,0.12) 100%)',
        border: '1px solid rgba(182,0,168,0.22)',
      }}
    >
      <span
        className="font-black leading-none break-words hyphens-auto"
        style={{
          fontSize: 'clamp(0.95rem, 1.6vw, 1.35rem)',
          background: 'linear-gradient(135deg, #B600A8, #7621B0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          overflowWrap: 'anywhere',
        }}
      >
        {kpi.value}
      </span>
      <span className="text-[#D7E2EA]/40 text-[0.6rem] uppercase tracking-wider font-light break-words leading-tight">
        {kpi.label}
      </span>
    </div>
  )
}

function ProjectCard({
  project,
  index,
  totalCards,
  progress,
  onOpen,
}: {
  project: Project
  index: number
  totalCards: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  onOpen: () => void
}) {
  const targetScale = 1 - (totalCards - 1 - index) * 0.025
  const scale = useTransform(progress, [index / totalCards, 1], [1, targetScale])

  return (
    <div
      className="h-[85vh] flex items-start justify-center sticky"
      style={{ top: `${index * 28}px` }}
    >
      <motion.button
        type="button"
        onClick={onOpen}
        style={{ scale, backgroundColor: '#0C0C0C' }}
        className={`group w-full border-2 border-[#D7E2EA] ${cardRadius} p-4 sm:p-6 md:p-8 origin-top text-left cursor-pointer transition-colors duration-300 hover:border-[#B600A8]`}
        whileHover={{
          y: -4,
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        }}
        aria-label={`Open ${project.name}`}
      >
        {/* Top row */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-start gap-4 sm:gap-6 md:gap-8">
            <span
              className="text-[#D7E2EA] font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-[#D7E2EA]/50 font-light uppercase tracking-widest text-xs sm:text-sm">
                {project.category}
              </span>
              <span className="text-[#D7E2EA] font-medium uppercase text-lg sm:text-2xl md:text-3xl leading-tight">
                {project.name}
              </span>
              <span className="text-[#D7E2EA]/35 font-light text-xs sm:text-sm mt-0.5 max-w-xs">
                {project.tagline}
              </span>
            </div>
          </div>
          {/* KPI preview chips */}
          <div className="flex items-center gap-2 flex-wrap mt-1">
            {project.kpis.slice(0, 2).map(kpi => (
              <span
                key={kpi.label}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  background: 'rgba(182,0,168,0.10)',
                  border: '1px solid rgba(182,0,168,0.25)',
                  color: '#B600A8',
                }}
              >
                {kpi.value}
              </span>
            ))}
          </div>
        </div>

        {/* Image grid */}
        <div className="flex gap-3 sm:gap-4 md:gap-5">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 w-[40%]">
            <img
              src={project.images[0]}
              alt=""
              loading="lazy"
              className={`w-full object-cover ${cardRadius}`}
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.images[1]}
              alt=""
              loading="lazy"
              className={`w-full object-cover ${cardRadius}`}
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          <div className="w-[60%]">
            <img
              src={project.images[2]}
              alt=""
              loading="lazy"
              className={`w-full h-full object-cover ${cardRadius}`}
            />
          </div>
        </div>
        <div className="mt-4 sm:mt-5 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[#D7E2EA]/45 text-[0.65rem] uppercase tracking-widest">Click to expand</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[#D7E2EA]/45">
            <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.button>
    </div>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start sm:items-center justify-center p-4 sm:p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
    >
      <motion.div
        className="relative bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[32px] sm:rounded-[44px] md:rounded-[56px] w-full max-w-5xl p-5 sm:p-8 md:p-10 my-4"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors duration-200 flex items-center justify-center"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-8 mb-6 sm:mb-8 pr-12 sm:pr-16">
          <span
            className="hero-heading font-black leading-none"
            style={{ fontSize: 'clamp(4rem, 10vw, 140px)' }}
          >
            {project.number}
          </span>
          <div className="flex flex-col gap-2">
            <span className="text-[#D7E2EA]/60 font-light uppercase tracking-widest text-xs sm:text-sm">
              {project.category}
            </span>
            <h3
              className="text-[#D7E2EA] font-medium uppercase leading-tight"
              style={{ fontSize: 'clamp(1.3rem, 3vw, 2.4rem)' }}
            >
              {project.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-[#D7E2EA]/70 font-light leading-relaxed max-w-3xl mb-6 sm:mb-8"
          style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}
        >
          {project.description}
        </p>

        {/* Findings + KPIs */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Bullets */}
          <div className="flex-1">
            <h4 className="text-[#D7E2EA]/55 text-[0.62rem] uppercase tracking-widest mb-3 font-light">
              Key findings
            </h4>
            <ul className="space-y-2.5">
              {project.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm sm:text-base text-[#D7E2EA]/75 font-light leading-relaxed"
                >
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 bg-[#B600A8]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* KPI grid */}
          <div className="md:w-56 lg:w-64 shrink-0">
            <h4 className="text-[#D7E2EA]/55 text-[0.62rem] uppercase tracking-widest mb-3 font-light">
              Metrics
            </h4>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {project.kpis.map(kpi => (
                <KpiBox key={kpi.label} kpi={kpi} />
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          {project.skills.map(skill => (
            <span
              key={skill}
              className="text-xs px-3 py-1.5 rounded-full font-light text-[#D7E2EA]/65"
              style={{
                background: 'rgba(215,226,234,0.07)',
                border: '1px solid rgba(215,226,234,0.12)',
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {project.images.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.15 + i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="w-full aspect-square object-cover rounded-[24px] sm:rounded-[32px]"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const openProject = openIndex !== null ? PROJECTS[openIndex] : null

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-6 sm:mb-8"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </h2>

      {/* Persistent click-to-expand hint */}
      <p className="text-center mb-12 sm:mb-16 md:mb-22 flex items-center justify-center gap-2">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#D7E2EA]/40 shrink-0">
          <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1"/>
        </svg>
        <span className="text-[#D7E2EA]/40 text-[0.7rem] uppercase tracking-[0.22em] font-light">
          Click any card to expand
        </span>
      </p>

      <div ref={containerRef} className="max-w-6xl mx-auto">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            totalCards={PROJECTS.length}
            progress={scrollYProgress}
            onOpen={() => setOpenIndex(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectModal
            key={openProject.number}
            project={openProject}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
