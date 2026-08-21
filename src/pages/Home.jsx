import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import JaliDivider from '../components/JaliDivider/JaliDivider'
import { Suspense, lazy } from 'react'
import HeroCarousel from '../components/HeroCarousel/HeroCarousel'
import SectionBoundary from '../components/SectionBoundary/SectionBoundary'
import PromoVideo from '../components/PromoVideo/PromoVideo'
import ImpactCounters from '../components/ImpactCounters/ImpactCounters'
import DonateSection from '../components/DonateSection/DonateSection'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './Home.css'

/* LearningHero pulls in three.js and gsap, roughly 600 KB of the bundle, for one
 * section that is three full viewports below the fold. Splitting it out keeps
 * that cost off the critical path. The placeholder reserves the same 300vh the
 * real section occupies, so nothing shifts when it swaps in. */
const LearningHero = lazy(() => import('../components/LearningHero/LearningHero'))

/* The three barriers Sambhav works on.
 *
 * Access, resources and instruction. Only the resources column describes work
 * that is actually running: Learning Kits. The other two say what the barrier is
 * without claiming a programme that does not exist yet, which keeps this honest
 * against the organisation's own record. */
const BARRIERS = [
  {
    title: 'Access',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M3 21h18" />
        <path d="M5 21V8l7-5 7 5v13" />
        <path d="M10 21v-6h4v6" />
      </svg>
    ),
    problem:
      'Whether a child reaches a classroom at all depends on where they were born, what their family can afford, and how far the walk is.',
    answer:
      'We work through government schools that are already there, rather than building anything parallel to them.',
  },
  {
    title: 'Resources',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    problem:
      'A student can be enrolled and present and still have nothing to write in. The state kit arrives, then runs out partway through the year.',
    answer:
      'Learning Kits. Teachers say what each grade is short of, we buy it at local wholesale prices and hand it over in person.',
  },
  {
    title: 'Instruction',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M12 3 2 8l10 5 10-5-10-5Z" />
        <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
      </svg>
    ),
    problem:
      'Materials are the floor, not the ceiling. Exam preparation and one-to-one help are what carry a student through the years that decide their path.',
    answer:
      'Volunteer teaching and exam preparation are the direction we are building toward, and are not running yet.',
  },
]

/* Ways to get involved. The homepage's job is to route people to an action. */
const PATHS = [
  {
    eyebrow: 'Students',
    title: 'Start a chapter',
    body: 'Lead a Sambhav chapter at your school and run a supply drive that reaches real students.',
    cta: 'Start a Chapter',
    to: '/start',
  },
  {
    eyebrow: 'Supporters',
    title: 'Fund a supply run',
    body: 'Every dollar buys school supplies wholesale and in person. Bought, delivered, and documented.',
    cta: 'Donate',
    to: '/donate',
  },
  {
    eyebrow: 'Schools & orgs',
    title: 'Partner with us',
    body: 'Connect a school or organization in India and help us reach more students.',
    cta: 'Explore partnerships',
    to: '/partnerships',
  },
]

export default function Home() {
  useDocumentTitle(
    'Sambhav',
    'Sambhav is a student-led initiative delivering school supplies to under-resourced schools in India. Start a chapter and join the work.'
  )

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero" aria-label="Hero">
        <HeroCarousel />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__glow" aria-hidden="true" />

        <div className="hero__title-stage">
          <h1 className="hero__h1">Sambhav</h1>
        </div>

        <div className="container hero__content">
          {/* The eyebrow and standfirst were removed at the client's request.
              The wordmark and the two actions carry the hero on their own. */}
          <div className="hero__ctas">
            <Link to="/start" className="btn btn--primary">
              Start a Chapter
            </Link>
            <Link to="/donate" className="btn btn--outline">
              Donate
            </Link>
          </div>
        </div>

        <button
          className="hero__scroll-cue"
          aria-label="Scroll down"
          onClick={() => scrollTo('mission')}
        >
          <span>Scroll</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </button>
      </section>

      {/* ── PROMOTIONAL FILM ─────────────────────────────── */}
      <PromoVideo />

      {/* ── IMPACT COUNTERS ──────────────────────────────── */}
      <ImpactCounters />

      {/* ── THE BARRIERS ─────────────────────────────────── */}
      <section id="mission" className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">What stands in the way</p>
            <h2 className="mission__heading">Three barriers, not one.</h2>
            <p className="mission__intro">
              A student who wants to learn can still be stopped by things that have
              nothing to do with them. These are the three we work on, and Learning
              Kits is where we started.
            </p>
          </ScrollReveal>

          <div className="grid-3 barriers">
            {BARRIERS.map((b, i) => (
              <ScrollReveal key={b.title} delay={i + 1}>
                <div className="barrier">
                  <span className="barrier__icon" aria-hidden="true">{b.icon}</span>
                  <h3 className="barrier__title">{b.title}</h3>
                  <p className="barrier__problem">{b.problem}</p>
                  <p className="barrier__answer">
                    <span className="barrier__answer-label">What we do</span>
                    {b.answer}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARN / EMPOWER / TRANSFORM ───────────────────── */}
      {/* Height is inline, not via .lh-outer: that class lives in
          LearningHero.css, which now ships inside the lazy chunk and is not
          present while the fallback is on screen.
          The boundary matters: LearningHero drives WebGL, and a failed context
          used to throw during its effect and blank the whole page. */}
      <SectionBoundary
        name="LearningHero"
        fallback={<div style={{ height: '40vh', background: 'var(--indigo-2)' }} aria-hidden="true" />}
      >
        <Suspense
          fallback={<div style={{ height: '300vh', background: 'var(--indigo-2)' }} aria-hidden="true" />}
        >
          <LearningHero />
        </Suspense>
      </SectionBoundary>

      <JaliDivider />

      {/* ── GET INVOLVED ──────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">Get involved</p>
            <h2 className="mission__heading">Find your way in.</h2>
          </ScrollReveal>
          <div className="grid-3" style={{ marginTop: '2.5rem' }}>
            {PATHS.map((p, i) => (
              <ScrollReveal key={p.title} delay={i + 1}>
                <div className="card">
                  <div className="card__body">
                    <p className="eyebrow">{p.eyebrow}</p>
                    <h3 className="card__title">{p.title}</h3>
                    <p className="card__text">{p.body}</p>
                    <Link to={p.to} className="btn btn--outline-dark" style={{ marginTop: '1.25rem', display: 'inline-flex' }}>
                      {p.cta} →
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GIVING ────────────────────────────────────────── */}
      <DonateSection />

      {/* ── CLOSING CTA ───────────────────────────────────── */}
      <section className="section section--indigo">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2 style={{ color: 'var(--cream)', marginBottom: '1rem' }}>
              Ready to make it possible?
            </h2>
            <p style={{ color: 'rgba(251,246,238,0.65)', marginBottom: '2rem', maxWidth: '46ch', marginInline: 'auto' }}>
              Start a chapter at your school and turn a supply drive into real
              impact for students who need it.
            </p>
            <Link to="/start" className="btn btn--primary">Start a Chapter</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
