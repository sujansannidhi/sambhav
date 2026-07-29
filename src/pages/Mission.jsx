import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import JaliDivider from '../components/JaliDivider/JaliDivider'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './Home.css'

const STEPS = [
  { n: '01', t: 'Go in person', b: 'A team member visits the wholesale shop in person. No remote purchasing, no third-party fulfilment.' },
  { n: '02', t: 'Buy wholesale, locally', b: 'A local wholesale shop that specialises in school supplies brought the cost to about $3.50 a kit on the June 2026 run.' },
  { n: '03', t: 'Deliver directly', b: 'Supplies go to government schools through a verified on-the-ground partner, not a distribution chain.' },
  { n: '04', t: 'Document everything', b: 'Receipts, photos, and a signed letter from the school. Every campaign, every time.' },
]

export default function Mission() {
  useDocumentTitle(
    'Mission | Sambhav',
    'Sambhav finds the small barriers that stop students from learning and removes them, starting with school supplies bought in person and delivered directly.'
  )

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="section section--indigo" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)' }}>
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow eyebrow--light">Our mission</p>
            <h1 className="mission__heading" style={{ color: 'var(--cream)' }}>
              We find the gaps. We fill them.
            </h1>
            <p className="mission__intro" style={{ color: 'rgba(251,246,238,0.72)' }}>
              Around the world, millions of young people face barriers that have nothing
              to do with their intelligence, determination, or potential. Some must leave
              school to support their families. Others lack transportation, school
              supplies, internet access, or safe learning environments.
            </p>
            <p className="mission__intro" style={{ color: 'rgba(251,246,238,0.72)' }}>
              Sambhav, a word that roughly translates to "possible", aims to close that
              gap. There's a kid out there who has to give up their education to support
              their family. There's a kid who can't make the commute to school every day.
              Why should they suffer for the things they can't control?
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PILLARS ───────────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">What we focus on</p>
            <h2 className="mission__heading">One program now. Room to grow.</h2>
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
        </div>
      </section>

      <JaliDivider />

      {/* ── HOW THE DRIVE WORKS ───────────────────────────── */}
      <section className="section section--paper">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">How it works</p>
            <h2 className="mission__heading" style={{ maxWidth: '28ch' }}>
              Direct. Documented. No middlemen.
            </h2>
          </ScrollReveal>
          <div className="grid-4" style={{ marginTop: '2.5rem' }}>
            {STEPS.map((s, i) => (
              <ScrollReveal key={s.n} delay={i + 1}>
                <div className="card">
                  <div className="card__body">
                    <p className="eyebrow">{s.n}</p>
                    <h3 className="card__title">{s.t}</h3>
                    <p className="card__text">{s.b}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="section section--indigo">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2 style={{ color: 'var(--cream)', marginBottom: '1rem' }}>
              Help us close the gap.
            </h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/start" className="btn btn--primary">Start a Chapter</Link>
              <Link to="/impact" className="btn btn--outline">See our impact</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
