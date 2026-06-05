import FadeIn from '../components/FadeIn'
import Magnet from '../components/Magnet'
import ContactButton from '../components/ContactButton'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Extras', href: '#extras' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function HeroSection() {
  return (
    <section
      className="h-screen flex flex-col"
      style={{ overflowX: 'clip', position: 'relative' }}
    >
      {/* Navbar */}
      <FadeIn as="nav" delay={0} y={-20} className="relative z-20">
        <ul className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      {/* Heading */}
      <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5 px-6 md:px-10">
        <FadeIn
          as="h1"
          delay={0.15}
          y={40}
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full"
          style={{ fontSize: 'clamp(2.25rem, 10.5vw, 200px)' }}
        >
          Hi, i&apos;m anrunya
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="mt-auto flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light italic uppercase tracking-wide leading-snug max-w-[180px] sm:max-w-[240px] md:max-w-[280px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            &ldquo;there is no prize to perfection, only an end to pursuit&rdquo;
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Portrait */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={260}
            strength={2}
            activeTransition="transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
            inactiveTransition="transform 1.3s cubic-bezier(0.16, 1, 0.3, 1)"
          >
            <img
              src="https://cdn.phototourl.com/free/2026-06-01-5620a4fa-9640-4b5f-ad14-eeda2f228da8.png"
              alt="Anrunya portrait"
              className="w-full h-auto select-none pointer-events-none"
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  )
}
