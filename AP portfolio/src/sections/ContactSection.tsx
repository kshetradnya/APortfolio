import { Github, Linkedin, Mail, Database, BarChart3, BrainCircuit } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import Folder from '../components/Folder'
import CardSwapRaw, { Card as CardRaw } from '../components/CardSwap'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CardSwap = CardSwapRaw as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Card = CardRaw as any

const EMAIL = 'anrunya@gmail.com'

const folderPapers = [
  <a
    key="github"
    href="https://github.com/AandK1412"
    target="_blank"
    rel="noopener noreferrer"
    onClick={e => e.stopPropagation()}
    aria-label="GitHub"
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#0C0C0C', textDecoration: 'none' }}
  >
    <Github size={22} strokeWidth={2} />
  </a>,
  <a
    key="linkedin"
    href="https://www.linkedin.com/in/anrunyapatole"
    target="_blank"
    rel="noopener noreferrer"
    onClick={e => e.stopPropagation()}
    aria-label="LinkedIn"
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#0C0C0C', textDecoration: 'none' }}
  >
    <Linkedin size={22} strokeWidth={2} />
  </a>,
  <a
    key="email"
    href={`mailto:${EMAIL}`}
    onClick={e => e.stopPropagation()}
    aria-label="Email"
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#0C0C0C', textDecoration: 'none' }}
  >
    <Mail size={22} strokeWidth={2} />
  </a>,
]

// Card content data
const CARDS = [
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=85&auto=format&fit=crop',
    icon: <BarChart3 size={16} strokeWidth={1.5} className="text-[#B600A8]" />,
    tag: 'Analytics',
    title: 'Turning raw data into real decisions',
    sub: 'Python · PowerBI · SQL',
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=85&auto=format&fit=crop',
    icon: <BrainCircuit size={16} strokeWidth={1.5} className="text-[#7621B0]" />,
    tag: 'Machine Learning',
    title: '88.2% accuracy on subscriber churn',
    sub: 'Green Chef · MSBA Capstone',
  },
  {
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=85&auto=format&fit=crop',
    icon: <Database size={16} strokeWidth={1.5} className="text-[#BE4C00]" />,
    tag: 'Open to Work',
    title: 'Available for roles & collaborations',
    sub: `anrunya@gmail.com`,
  },
]

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-10 md:px-16 py-28 sm:py-36 md:py-44"
      style={{ minHeight: 'max(100vh, 800px)' }}
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center lg:items-end gap-16 lg:gap-0">

        {/* Left: text + socials */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:flex-1">
          <FadeIn
            as="h2"
            delay={0}
            y={30}
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 10vw, 130px)' }}
          >
            Let&apos;s talk
          </FadeIn>

          <FadeIn delay={0.12} y={20} className="mt-6 sm:mt-8 max-w-sm">
            <p
              className="text-[#D7E2EA]/70 font-light leading-relaxed"
              style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}
            >
              Got a dataset worth exploring, an idea to validate, or just want to
              chat football and mangas? I&apos;d love to hear from you.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} y={20} className="mt-16 sm:mt-20 lg:w-full lg:flex lg:justify-center">
            <div className="flex flex-col items-center gap-3">
              <span
                className="font-light uppercase tracking-[0.25em] text-xs"
                style={{
                  background: 'linear-gradient(90deg, #B600A8, #7621B0, #BE4C00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Socials
              </span>
              <div style={{ marginTop: 96, display: 'flex', justifyContent: 'center' }}>
                <Folder
                  color="#9EABB5"
                  backColor="#111116"
                  size={2}
                  items={folderPapers as any}
                />
              </div>
              <span className="text-[#D7E2EA]/55 text-[0.6rem] uppercase tracking-widest mt-1">
                Click to open
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Right: CardSwap — needs a relative positioned container with explicit size */}
        <div
          className="hidden lg:block relative shrink-0"
          style={{ width: 520, height: 650 }}
        >
          <CardSwap
            width={460}
            height={500}
            cardDistance={48}
            verticalDistance={60}
            delay={4200}
            pauseOnHover
            skewAmount={5}
            easing="elastic"
          >
            {(CARDS as any[]).map((c, i) => (
              <Card
                key={i}
                style={{
                  background: '#0D0015',
                  border: '1px solid rgba(215,226,234,0.1)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Image */}
                <div style={{ flex: '0 0 55%', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={c.image}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #0D0015)' }} />
                </div>

                {/* Text area */}
                <div style={{ flex: 1, padding: '14px 18px 18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {c.icon}
                    <span style={{ color: 'rgba(215,226,234,0.4)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.18em', fontFamily: 'Kanit, sans-serif' }}>
                      {c.tag}
                    </span>
                  </div>
                  <p style={{ color: '#D7E2EA', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.35, fontFamily: 'Kanit, sans-serif', margin: 0 }}>
                    {c.title}
                  </p>
                  <span style={{ color: 'rgba(215,226,234,0.4)', fontSize: '0.72rem', fontFamily: 'Kanit, sans-serif' }}>
                    {c.sub}
                  </span>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>

      </div>
    </section>
  )
}
