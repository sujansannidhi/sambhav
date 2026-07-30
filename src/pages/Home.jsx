import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import JaliDivider from '../components/JaliDivider/JaliDivider'
import { Suspense, lazy } from 'react'
import HeroCarousel from '../components/HeroCarousel/HeroCarousel'
import SectionBoundary from '../components/SectionBoundary/SectionBoundary'
import PromoVideo from '../components/PromoVideo/PromoVideo'
import ImpactCounters from '../components/ImpactCounters/ImpactCounters'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './Home.css'

/* LearningHero pulls in three.js and gsap, roughly 600 KB of the bundle, for one
 * section that is three full viewports below the fold. Splitting it out keeps
 * that cost off the critical path. The placeholder reserves the same 300vh the
 * real section occupies, so nothing shifts when it swaps in. */
const LearningHero = lazy(() => import('../components/LearningHero/LearningHero'))

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
          <p className="eyebrow eyebrow--light">Making opportunity possible</p>
          <p className="hero__sub">
            Opportunity shouldn't depend on where you're born. Sambhav removes
            the small barriers that stop people from thriving, starting with
            the basics every child deserves.
          </p>
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

      {/* ── MISSION TEASER ───────────────────────────────── */}
      <section id="mission" className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">What we aim to achieve</p>
            <h2 className="mission__heading">We find the gaps. We fill them.</h2>
            <p className="mission__intro">
              Millions of young people face barriers that have nothing to do with
              their intelligence or determination. Sambhav, a word that roughly
              translates to "possible", exists to close that gap, starting with
              school supplies for students who need them most.
            </p>
          </ScrollReveal>

          <div className="grid-3 mission__pillars">
            <ScrollReveal delay={1}>
              <div className="pillar">
                <span className="pillar__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </span>
                <h3 className="pillar__title">Education</h3>
                <p className="pillar__body">
                  School supplies, notebooks, and learning materials delivered directly
                  to students in under-resourced government schools.
                </p>
                <span className="pillar__label pillar__label--active">Active</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <div className="pillar pillar--blank">
                <span className="pillar__blank-dot" />
                <span className="pillar__blank-dot" />
                <span className="pillar__blank-dot" />
                <span className="pillar__label">More coming</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <div className="pillar pillar--blank">
                <span className="pillar__blank-dot" />
                <span className="pillar__blank-dot" />
                <span className="pillar__blank-dot" />
                <span className="pillar__label">More coming</span>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <Link to="/mission" className="btn btn--outline-dark" style={{ marginTop: '2.5rem', display: 'inline-flex' }}>
              Read our mission →
            </Link>
          </ScrollReveal>
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
