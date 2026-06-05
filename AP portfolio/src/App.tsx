import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import HeroSection from './sections/HeroSection'
import KpiSection from './sections/KpiSection'
import AboutSection from './sections/AboutSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'
import TimelineSection from './sections/TimelineSection'
import ExtrasSection from './sections/ExtrasSection'
import ContactSection from './sections/ContactSection'
import Loader from './components/Loader'
import ClickSpark from './components/ClickSpark'
import NavMenu from './components/NavMenu'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 2200)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <NavMenu />
      <ClickSpark
        sparkColor="#B600A8"
        sparkSize={12}
        sparkRadius={22}
        sparkCount={10}
        duration={500}
        extraScale={1.2}
      >
        <main style={{ background: '#0C0C0C', overflowX: 'clip' }}>
          <HeroSection />
          <KpiSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <TimelineSection />
          <ExtrasSection />
          <ContactSection />
        </main>
      </ClickSpark>
    </>
  )
}
