import { Calendar, MapPin } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import GlassSurface from '../components/GlassSurface'

type Experience = {
  type: string
  role: string
  org: string
  period: string
  location: string
  accentColor: string
  achievements: string[]
}

const EXPERIENCES: Experience[] = [
  {
    type: 'Work',
    role: 'Student Assistant Manager',
    org: 'Virginia Tech Dining Services',
    period: 'Aug 2024 – May 2026',
    location: 'Blacksburg, VA',
    accentColor: '#B600A8',
    achievements: [
      'Managed team of 20+ employees across multiple dining facilities',
      'Analyzed operational data to identify and reduce service bottlenecks',
      'Implemented process improvements based on data-driven insights',
      'Coordinated scheduling and resource allocation for peak service periods',
    ],
  },
  {
    type: 'Leadership',
    role: 'Sub-head, Artist & Guest Management',
    org: 'IETE-SF MPSTME',
    period: '2022 – 2023',
    location: 'Mumbai, India',
    accentColor: '#7621B0',
    achievements: [
      'Led cross-functional teams for event execution',
      'Managed guest logistics and artist coordination',
      'Organized large-scale technical and cultural events',
    ],
  },
  {
    type: 'Volunteer',
    role: 'Volunteer Teacher',
    org: 'Spark A Change',
    period: '2022 – 2023',
    location: 'Mumbai, India',
    accentColor: '#BE4C00',
    achievements: [
      'Worked with underprivileged children to build conceptual understanding',
      'Used plain language and follow-up questions over rote memorization',
      'Created patient, accessible learning experiences',
    ],
  },
]

function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <div className="relative rounded-[28px]" style={{ border: `1px solid ${exp.accentColor}28` }}>
      {/* GlassSurface fills the card via absolute positioning */}
      <div className="absolute inset-0 rounded-[28px] overflow-hidden" aria-hidden>
        <GlassSurface
          style={{ width: '100%', height: '100%' }}
          borderRadius={28}
          backgroundOpacity={0.07}
          distortionScale={-100}
          brightness={25}
        />
      </div>

      {/* Content determines card height */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8">
        {/* Left: meta */}
        <div className="sm:w-52 md:w-56 shrink-0">
          <span
            className="inline-block text-[0.6rem] uppercase tracking-[0.2em] font-medium px-3 py-1 rounded-full mb-4"
            style={{
              background: `${exp.accentColor}18`,
              color: exp.accentColor,
              border: `1px solid ${exp.accentColor}35`,
            }}
          >
            {exp.type}
          </span>
          <h3
            className="text-[#D7E2EA] font-semibold leading-tight mb-1.5"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
          >
            {exp.role}
          </h3>
          <p className="text-[#D7E2EA]/65 text-sm font-medium mb-4">{exp.org}</p>
          <div className="flex flex-col gap-1.5">
            <span className="text-[#D7E2EA]/35 text-xs flex items-center gap-1.5">
              <Calendar size={10} strokeWidth={1.5} />
              {exp.period}
            </span>
            <span className="text-[#D7E2EA]/35 text-xs flex items-center gap-1.5">
              <MapPin size={10} strokeWidth={1.5} />
              {exp.location}
            </span>
          </div>
        </div>

        {/* Vertical divider */}
        <div
          className="hidden sm:block w-px shrink-0 self-stretch"
          style={{
            background: `linear-gradient(to bottom, transparent, ${exp.accentColor}35, transparent)`,
          }}
        />

        {/* Right: achievements */}
        <ul className="flex-1 flex flex-col gap-2.5 justify-center">
          {exp.achievements.map((a, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-[#D7E2EA]/70 font-light leading-relaxed"
            >
              <span
                className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: exp.accentColor }}
              />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function ExperiencesSection() {
  return (
    <section
      id="experience"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ colorScheme: 'dark' }}
    >
      {/* Decorative blobs — give GlassSurface something to refract */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-32 w-[520px] h-[520px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(182,0,168,0.13) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-32 w-[460px] h-[460px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(190,76,0,0.10) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(118,33,176,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-14 sm:mb-18 md:mb-24"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Experience
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* Featured: Student Asst Manager — full width */}
        <div className="md:col-span-2">
          <FadeIn delay={0.08} y={24}>
            <ExperienceCard exp={EXPERIENCES[0]} />
          </FadeIn>
        </div>

        {/* Secondary: IETE + Spark side by side */}
        {EXPERIENCES.slice(1).map((exp, i) => (
          <FadeIn key={exp.org} delay={0.14 + i * 0.06} y={20}>
            <ExperienceCard exp={exp} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
