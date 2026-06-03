import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import JaliDivider from '../components/JaliDivider/JaliDivider'
import { IMG_DELIVERY, IMG_RECEIPTS, IMG_LETTERS } from '../images'
import './Impact.css'

const STATS = [
  { number: '$823',  label: 'Raised this campaign' },
  { number: '$810',  label: 'Spent on supplies' },
  { number: '100+',  label: 'Students reached' },
  { number: '3',     label: 'Schools' },
]

const DELIVERY_ALTS = [
  'Delivery day — students receiving kits',
  'School supplies packed and ready',
  'Classroom distribution in progress',
  'School entrance on delivery day',
  'Students with their new supply kits',
  'Wholesale market — buying supplies in person',
]

const TESTIMONIALS = [
  {
    quote: "My daughter has everything she needs for class now. She doesn't have to share a notebook anymore.",
    attr: 'Parent, Government Primary School, [District]',
  },
  {
    quote: 'The supplies arrived right at the start of term. Every student in Class 4 received a complete kit.',
    attr: 'Headmaster, [School Name]',
  },
]

export default function Impact() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="impact-hero texture-overlay">
        <div className="impact-hero__bg" aria-hidden="true" />
        <div className="container impact-hero__content">
          <ScrollReveal>
            <p className="eyebrow eyebrow--light">Impact & Transparency</p>
            <h1 className="impact-hero__h1">
              Every rupee, accounted for.
            </h1>
            <p className="impact-hero__sub">
              We post receipts, photos, and school letters from every campaign.
              Nothing is withheld.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── RUNNING TOTALS ────────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">Campaign totals — Project Vidya, 2024–25</p>
            <p className="impact-updated">Last updated: [Date]</p>
          </ScrollReveal>
          <div className="grid-4" style={{ marginTop: '2rem' }}>
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

      <JaliDivider />

      {/* ── DELIVERY PHOTOS ──────────────────────────────────── */}
      <section className="section section--paper">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">Delivery day</p>
            <h2 style={{ marginBottom: '2rem' }}>From the market to the classroom.</h2>
          </ScrollReveal>
          <div className="impact-photo-grid">
            {IMG_DELIVERY.map((src, i) => (
              <ScrollReveal key={i} delay={(i % 3) + 1}>
                <div className={`impact-photo${i === 0 ? ' impact-photo--large' : ''}`}>
                  <img src={src} alt={DELIVERY_ALTS[i]} className="stock-img" loading="lazy" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <JaliDivider />

      {/* ── RECEIPTS ─────────────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">Receipts & bills</p>
            <h2 style={{ marginBottom: '0.75rem' }}>Every purchase, documented.</h2>
            <p style={{ marginBottom: '2rem', maxWidth: '52ch' }}>
              These are the actual wholesale receipts from every supply run.
              The amounts match exactly what was donated and spent.
            </p>
          </ScrollReveal>
          <div className="impact-receipt-grid">
            {IMG_RECEIPTS.map((src, i) => (
              <ScrollReveal key={i} delay={(i % 4) + 1}>
                <div className="impact-receipt">
                  <img src={src} alt={`Purchase receipt ${i + 1}`} className="stock-img" loading="lazy" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <JaliDivider />

      {/* ── SCHOOL LETTERS ───────────────────────────────────── */}
      <section className="section section--paper">
        <div className="container impact-letters">
          <ScrollReveal>
            <p className="eyebrow">School letters</p>
            <h2 style={{ marginBottom: '2rem' }}>Verified by the schools themselves.</h2>
          </ScrollReveal>
          <div className="grid-2">
            {IMG_LETTERS.map((src, i) => (
              <ScrollReveal key={i} delay={i + 1}>
                <div className="impact-letter" style={{ aspectRatio: '8.5/11', overflow: 'hidden' }}>
                  <img src={src} alt={`School acknowledgment letter ${i + 1}`} className="stock-img" loading="lazy" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <JaliDivider />

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">From the community</p>
            <h2 style={{ marginBottom: '2.5rem' }}>In their words.</h2>
          </ScrollReveal>
          <div className="grid-2">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={i} delay={i + 1}>
                <blockquote className="impact-testimonial">
                  <p className="impact-testimonial__quote">"{t.quote}"</p>
                  <footer className="impact-testimonial__attr">— {t.attr}</footer>
                </blockquote>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section section--indigo">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2 style={{ color: 'var(--cream)', marginBottom: '1rem' }}>
              Help us write the next report.
            </h2>
            <p style={{ color: 'rgba(251,246,238,0.65)', marginBottom: '2rem' }}>
              Every $5 adds a student to the next campaign — and the next receipt.
            </p>
            <Link to="/project-vidya#donate" className="btn btn--primary">
              Donate to Project Vidya
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
