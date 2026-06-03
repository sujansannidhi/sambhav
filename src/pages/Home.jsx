import { Link, useNavigate } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import JaliDivider from '../components/JaliDivider/JaliDivider'
import { IMG_CLASSROOM_HERO, IMG_WATER, IMG_HEALTH } from '../images'
import './Home.css'

const PROGRAMS = [
  {
    tag: 'Active',
    title: 'Project Vidya — Education',
    body: 'School supplies delivered directly to students in under-resourced government schools across India. Every kit documented. Every rupee receipted.',
    to: '/project-vidya',
    active: true,
    img: IMG_CLASSROOM_HERO,
    imgAlt: 'Children learning in a classroom',
  },
  {
    tag: 'Coming soon',
    title: 'Project Jal — Clean Water',
    body: 'Safe drinking water for communities without reliable access. Launching next.',
    to: null,
    active: false,
    img: IMG_WATER,
    imgAlt: 'Clean water',
  },
  {
    tag: 'Coming soon',
    title: 'Project Swasth — Health',
    body: 'Basic medical supplies and preventative care for underserved families.',
    to: null,
    active: false,
    img: IMG_HEALTH,
    imgAlt: 'Healthcare',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Go in person',
    body: 'Every purchase happens on the ground. No middle companies, no shipping from abroad.',
  },
  {
    num: '02',
    title: 'Buy wholesale, locally',
    body: 'Local wholesale markets bring costs down 3–4× versus retail. Your money goes further.',
  },
  {
    num: '03',
    title: 'Deliver with a trusted partner',
    body: 'A verified on-the-ground partner brings supplies directly to the school.',
  },
  {
    num: '04',
    title: 'Document every rupee',
    body: 'Receipts, photos, and a letter from the school. Every time. No exceptions.',
  },
]

const STATS = [
  { number: '100+', label: 'Students supplied' },
  { number: '3',    label: 'Schools reached' },
  { number: '100%', label: 'Goes to the field' },
  { number: '$0',   label: 'Overhead' },
]

export default function Home() {
  const navigate = useNavigate()
  const handleDonate = () => {
    navigate('/project-vidya#donate')
    setTimeout(() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' }), 150)
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="home-hero texture-overlay" aria-label="Hero">
        <div className="home-hero__diya-glow" aria-hidden="true" />
        <div className="home-hero__jali" aria-hidden="true" />
        <div className="container home-hero__content">
          <p className="eyebrow eyebrow--light home-hero__eyebrow reveal">
            Making opportunity possible
          </p>
          <div className="home-hero__title-wrap">
            <span className="home-hero__devanagari reveal reveal-delay-1">संभव</span>
            <h1 className="home-hero__h1 reveal reveal-delay-1">Sambhav</h1>
          </div>
          <p className="home-hero__sub reveal reveal-delay-2">
            Opportunity shouldn't depend on where you're born. Sambhav removes the
            small barriers that stop people from thriving — starting with the basics.
          </p>
          <div className="home-hero__ctas reveal reveal-delay-3">
            <button className="btn btn--primary" onClick={handleDonate}>
              Support Project Vidya
            </button>
            <Link to="/about" className="btn btn--outline">
              Our Story
            </Link>
          </div>
        </div>
        <div className="home-hero__scroll-cue" aria-hidden="true">
          <span>Scroll</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </div>
      </section>

      {/* ── THE IDEA ─────────────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container grid-2 home-idea">
          <ScrollReveal>
            <h2 className="home-idea__heading">
              We start where the gap is smallest — and the impact is largest.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p className="home-idea__body">
              A missing notebook ends a child's schooling as surely as a closed door.
              We find those gaps and fill them — directly, transparently, in person.
              No overhead, no waste: every dollar you give buys supplies that reach
              a student's hands.
            </p>
            <Link to="/about" className="btn btn--ghost" style={{ marginTop: '1.25rem' }}>
              How we work →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <JaliDivider />

      {/* ── PROGRAMS ─────────────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">Programs</p>
            <h2 style={{ marginBottom: '2.5rem', maxWidth: '32ch' }}>
              One focused mission at a time.
            </h2>
          </ScrollReveal>
          <div className="grid-3">
            {PROGRAMS.map((p, i) => (
              <ScrollReveal key={p.title} delay={i + 1}>
                <div className={`card home-program-card${!p.active ? ' home-program-card--muted' : ''}`}>
                  <img
                    className="card__img"
                    src={p.img}
                    alt={p.imgAlt}
                    loading="lazy"
                    style={!p.active ? { filter: 'saturate(0.4) opacity(0.7)' } : {}}
                  />
                  <div className="card__body">
                    <p className="card__tag" style={!p.active ? { color: 'var(--ink-soft)', opacity: 0.55 } : {}}>
                      {p.tag}
                    </p>
                    <h3 className="card__title">{p.title}</h3>
                    <p className="card__text">{p.body}</p>
                    {p.active ? (
                      <Link to={p.to} className="btn btn--ghost">
                        Explore →
                      </Link>
                    ) : (
                      <span className="home-program-card__soon">Launching soon</span>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <JaliDivider />

      {/* ── HOW WE WORK ─────────────────────────────────────── */}
      <section className="section section--paper">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">How we work</p>
            <h2 style={{ marginBottom: '3rem', maxWidth: '30ch' }}>
              In-person. Wholesale. Documented.
            </h2>
          </ScrollReveal>
          <div className="grid-4">
            {STEPS.map((s, i) => (
              <ScrollReveal key={s.num} delay={i + 1}>
                <div className="home-step">
                  <span className="home-step__num">{s.num}</span>
                  <h3 className="home-step__title">{s.title}</h3>
                  <p className="home-step__body">{s.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <JaliDivider />

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <div className="grid-4">
            {STATS.map((s, i) => (
              <ScrollReveal key={s.label} delay={i + 1}>
                <div className="stat-block">
                  <div className="stat-block__number">{s.number}</div>
                  <div className="stat-block__label">{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────── */}
      <section className="home-cta-band">
        <div className="container home-cta-band__inner">
          <ScrollReveal>
            <h2 className="home-cta-band__heading">
              Help a student take the first step.
            </h2>
            <p className="home-cta-band__sub">
              $5 equips one child for an entire school year.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <button className="btn btn--primary home-cta-band__btn" onClick={handleDonate}>
              Donate to Project Vidya
            </button>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
