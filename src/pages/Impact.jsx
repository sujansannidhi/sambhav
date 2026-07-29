import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import ImpactMap from '../components/ImpactMap/ImpactMap'
import ImpactCounters from '../components/ImpactCounters/ImpactCounters'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './Home.css'

/* Impact.
 *
 * The previous version of this page carried four placeholder figures ($823
 * raised, $810 spent, 100+ students, 3 schools) that were never real and
 * contradicted the organisation's own record. They have been removed. Every
 * number on this page now comes from ImpactCounters, which is sourced line by
 * line from "Sambhav Proof Of Concept", page 4.
 *
 * The "Communities we're committed to" card grid has also been removed: the map
 * section now carries both places with more detail than the cards did.
 */
export default function Impact() {
  useDocumentTitle(
    'Impact | Sambhav',
    'Where Sambhav works and what it has delivered. Twelve schools across Narasaraopet and Ammanabrolu, with every purchase receipted.'
  )

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="section section--indigo" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)' }}>
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow eyebrow--light">Impact and transparency</p>
            <h1 className="mission__heading" style={{ color: 'var(--cream)' }}>
              Every rupee, accounted for.
            </h1>
            <p className="mission__intro" style={{ color: 'rgba(251,246,238,0.72)' }}>
              We buy in person, deliver directly, and document every step. Each
              school keeps a written request, a receipt from the wholesale shop,
              and a letter confirming what arrived.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── THE NUMBERS ──────────────────────────────────── */}
      <ImpactCounters />

      {/* ── MAP: two act scroll sequence, or two static cards on
             phones and under prefers-reduced-motion ─────────── */}
      <ImpactMap />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section section--indigo">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2 style={{ color: 'var(--cream)', marginBottom: '1rem' }}>
              Help us write the next report.
            </h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/start" className="btn btn--primary">Start a Chapter</Link>
              <Link to="/donate" className="btn btn--outline">Donate</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
