import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import JaliDivider from '../components/JaliDivider/JaliDivider'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './Home.css'

/* [NEEDS INPUT: partnership types are placeholders. The source document names
 * only one confirmed partnership target, the Nobel Institute, as a short term
 * goal. Real programme details are needed before this page can be finished.] */
const PARTNER_TYPES = [
  {
    eyebrow: 'Schools in India',
    title: 'Partner schools',
    body: 'Government or low-resource schools that would like to be considered for a supply campaign. We buy locally and deliver directly.',
  },
  {
    eyebrow: 'On-the-ground orgs',
    title: 'Local NGOs',
    body: 'Trusted organizations that can help verify need, coordinate delivery, and confirm receipt with a signed letter.',
  },
  {
    eyebrow: 'Schools & clubs abroad',
    title: 'Chapter partners',
    body: 'High schools and student clubs that want to run supply drives. This is how Sambhav grows: start a chapter and lead one.',
  },
]

export default function Partnerships() {
  useDocumentTitle(
    'Partnerships | Sambhav',
    'Partner with Sambhav. Connect a school or organisation in India, or bring a student chapter to your school.'
  )

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="section section--indigo" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)' }}>
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow eyebrow--light">Partnerships</p>
            <h1 className="mission__heading" style={{ color: 'var(--cream)' }}>
              Let's reach more students together.
            </h1>
            <p className="mission__intro" style={{ color: 'rgba(251,246,238,0.72)' }}>
              Sambhav works through partners: schools that need supplies, local
              organizations that make delivery possible, and student chapters that
              raise the funds. There's a place for you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PARTNER TYPES ─────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">Ways to partner</p>
            <h2 className="mission__heading">Three ways in.</h2>
          </ScrollReveal>
          <div className="grid-3" style={{ marginTop: '2.5rem' }}>
            {PARTNER_TYPES.map((p, i) => (
              <ScrollReveal key={p.title} delay={i + 1}>
                <div className="card">
                  <div className="card__body">
                    <p className="eyebrow">{p.eyebrow}</p>
                    <h3 className="card__title">{p.title}</h3>
                    <p className="card__text">{p.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <JaliDivider />

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="section section--paper">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2 className="mission__heading" style={{ marginInline: 'auto' }}>
              Ready to talk?
            </h2>
            <p style={{ maxWidth: '46ch', margin: '1rem auto 2rem', color: 'var(--ink-soft)' }}>
              If you represent a school or organisation, or want to start a chapter,
              reach out and we'll take it from there.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/start" className="btn btn--primary">Start a Chapter</Link>
              <Link to="/contact" className="btn btn--outline-dark">Contact us</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
