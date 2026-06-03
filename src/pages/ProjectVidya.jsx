import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PSAModal from '../components/PSAModal/PSAModal'
import DonationForm from '../components/DonationForm/DonationForm'
import Accordion from '../components/Accordion/Accordion'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import JaliDivider from '../components/JaliDivider/JaliDivider'
import { IMG_CLASSROOM_HERO, IMG_CLASSROOM_2, IMG_RECEIPTS } from '../images'
import './ProjectVidya.css'

const PSA_VIDEO_ID = 'PLACEHOLDER_VIDEO_ID' // [CONFIG: replace with your YouTube video ID]

const KIT_ITEMS = [
  { name: 'Notebooks (×4)', cost: '₹40' },
  { name: 'Pencils (×6)', cost: '₹18' },
  { name: 'Eraser & sharpener', cost: '₹10' },
  { name: 'Ruler', cost: '₹8' },
  { name: 'Geometry box', cost: '₹35' },
  { name: 'Pens (×3)', cost: '₹24' },
]

const TIERS = [
  { amount: '$5',   who: '1 student',          who2: 'full school year' },
  { amount: '$100', who: '20 students',         who2: 'a whole classroom' },
  { amount: '$500', who: '100 students',        who2: 'a small school' },
]

const FAQ = [
  {
    question: 'How do I know the money reaches students?',
    answer: 'Every purchase is made in-person at a local wholesale market by a team member. We photograph receipts, document the delivery, and receive an acknowledgment letter from the school. All of this is shared publicly on our Impact page.',
  },
  {
    question: 'Why not ship supplies from abroad?',
    answer: 'Local wholesale markets in India are 3–4× cheaper than retail or imported goods, and there are no customs delays or fees. Your money simply goes further when we buy locally.',
  },
  {
    question: 'Is my donation tax-deductible?',
    answer: 'Tax deductibility depends on your location and our current fiscal sponsorship arrangement. Please reach out to us at hello@sambhav.org for the latest information — we\'re working to make this as straightforward as possible.',
  },
  {
    question: 'Who runs Sambhav?',
    answer: 'Sambhav is a student-led initiative. Every program is driven by young people who believe small barriers deserve real solutions. Read more on our Our Story page.',
  },
  {
    question: 'Can I donate supplies directly?',
    answer: 'Cash donations are far more efficient — we can buy 3–4× more wholesale than any donated supply would cost at retail, and we avoid international shipping. We appreciate the thought, but cash is genuinely the best gift.',
  },
]

export default function ProjectVidya() {
  const [showModal, setShowModal]  = useState(false)
  const [psaSeen, setPsaSeen]      = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('vidya_psa_seen') === 'true'
    setPsaSeen(seen)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!seen && !prefersReduced) {
      const timer = setTimeout(() => setShowModal(true), 400)
      return () => clearTimeout(timer)
    }
  }, [])

  const closeModal = () => {
    setShowModal(false)
    localStorage.setItem('vidya_psa_seen', 'true')
    setPsaSeen(true)
  }

  const scrollToDonate = () => {
    document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {showModal && <PSAModal onClose={closeModal} />}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="vidya-hero texture-overlay">
        <div className="vidya-hero__diya-glow" aria-hidden="true" />
        <div className="vidya-hero__jali" aria-hidden="true" />

        <div className="container vidya-hero__content">
          <ScrollReveal>
            <div className="vidya-hero__lockup">
              <span className="vidya-hero__parent">Sambhav</span>
              <span className="vidya-hero__dot">·</span>
              <span className="vidya-hero__program">Project Vidya</span>
            </div>
            <p className="vidya-hero__subtitle">Education Initiative</p>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <h1 className="vidya-hero__h1">
              A notebook should never be the reason a child stops learning.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <p className="vidya-hero__body">
              We buy school supplies wholesale, in person, and deliver them directly
              to government schools — with receipts, photos, and a letter from the school.
            </p>
            <div className="vidya-hero__ctas">
              <button className="btn btn--primary" onClick={scrollToDonate}>
                Donate now
              </button>
              <button className="btn btn--outline vidya-hero__psa-btn" onClick={() => setShowModal(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                </svg>
                Watch our story
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* PSA video embed for return visitors */}
        {psaSeen && (
          <div className="container vidya-hero__video-wrap">
            <div className="vidya-hero__video">
              <div className="vidya-hero__video-poster">
                <img src={IMG_CLASSROOM_HERO} alt="Students in classroom" className="stock-img" />
                <button
                  className="vidya-hero__play-btn"
                  onClick={() => setShowModal(true)}
                  aria-label="Play Project Vidya story video"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <circle cx="12" cy="12" r="12" fill="rgba(22,33,58,0.75)" />
                    <polygon points="10 8 18 12 10 16 10 8" fill="white" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── A. SCROLL CUE ─────────────────────────────────────── */}
      <div className="vidya-scroll-cue" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <span>Learn how it works</span>
      </div>

      {/* ── B. INFORMATION ────────────────────────────────────── */}

      {/* 1. THE PROBLEM */}
      <section className="section section--cream">
        <div className="container vidya-problem">
          <ScrollReveal className="vidya-problem__text">
            <p className="eyebrow">The problem</p>
            <h2>Access — not ability — is the barrier.</h2>
            <p>
              In government schools across rural India, students leave school over
              the smallest costs. A notebook. A pencil. A geometry set. Families
              who can't spare ₹150 for supplies make an impossible choice. The
              ability to learn is there. The access isn't.
            </p>
            <div className="vidya-stat-inline">
              <span className="vidya-stat-inline__num">1 in 4</span>
              <span className="vidya-stat-inline__label">
                students in rural government schools lacks basic supplies at the
                start of term.
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1} className="vidya-problem__img">
            <img src={IMG_CLASSROOM_2} alt="Students in a government school classroom" className="stock-img" loading="lazy" />
          </ScrollReveal>
        </div>
      </section>

      <JaliDivider />

      {/* 2. WHAT WE DO */}
      <section className="section section--paper">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">What we do</p>
            <h2 style={{ marginBottom: '2.5rem', maxWidth: '28ch' }}>
              Direct. Documented. No middlemen.
            </h2>
          </ScrollReveal>
          <div className="grid-4">
            {[
              { n: '01', t: 'Go in person', b: 'A team member visits wholesale markets on the ground — no remote purchasing, no third-party fulfillment.' },
                { n: '02', t: 'Buy wholesale, locally', b: "Local markets bring per-kit costs to ~$2–4. That's 3–4× cheaper than retail or imported goods." },
              { n: '03', t: 'Deliver directly', b: 'Supplies go to government schools through a verified on-the-ground partner, not a distribution chain.' },
              { n: '04', t: 'Document everything', b: 'Receipts, photos, and a signed letter from the school. Every campaign, every time.' },
            ].map((s, i) => (
              <ScrollReveal key={s.n} delay={i + 1}>
                <div className="home-step">
                  <span className="home-step__num">{s.n}</span>
                  <h3 className="home-step__title">{s.t}</h3>
                  <p className="home-step__body">{s.b}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <JaliDivider />

      {/* 3. KIT CONTENTS */}
      <section className="section section--cream">
        <div className="container vidya-kit">
          <ScrollReveal className="vidya-kit__text">
            <p className="eyebrow">What's in a kit</p>
            <h2>Everything a student needs to show up ready.</h2>
            <p>
              Each kit is assembled from a standard list so every child receives
              the same starting point. Wholesale cost: approximately <strong>$2–4 per kit</strong>.
            </p>
          </ScrollReveal>
          <div className="vidya-kit__list">
            {KIT_ITEMS.map((item, i) => (
              <ScrollReveal key={item.name} delay={(i % 4) + 1}>
                <div className="vidya-kit__item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="vidya-kit__item-name">{item.name}</span>
                  <span className="vidya-kit__item-cost">{item.cost}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <JaliDivider />

      {/* 4. GIFT TIERS */}
      <section className="section section--indigo">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow eyebrow--light">Your gift in action</p>
            <h2 style={{ color: 'var(--cream)', marginBottom: '2.5rem', maxWidth: '26ch' }}>
              Every dollar has a direct, visible impact.
            </h2>
          </ScrollReveal>
          <div className="grid-3 vidya-tiers">
            {TIERS.map((t, i) => (
              <ScrollReveal key={t.amount} delay={i + 1}>
                <div className="vidya-tier">
                  <span className="vidya-tier__amount">{t.amount}</span>
                  <span className="vidya-tier__arrow">→</span>
                  <div>
                    <p className="vidya-tier__who">{t.who}</p>
                    <p className="vidya-tier__who2">{t.who2}</p>
                  </div>
                  <button
                    className="btn btn--primary vidya-tier__btn"
                    onClick={scrollToDonate}
                    aria-label={`Give ${t.amount} — ${t.who}`}
                  >
                    Give {t.amount}
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="vidya-trust-chips">
            {['100% to supplies', 'Bought in person', 'Receipts shared', 'School-verified delivery'].map(c => (
              <span key={c} className="vidya-trust-chip">✓ {c}</span>
            ))}
          </div>
        </div>
      </section>

      <JaliDivider />

      {/* 5. TRANSPARENCY */}
      <section className="section section--paper">
        <div className="container vidya-transparency">
          <ScrollReveal>
            <p className="eyebrow">Transparency</p>
            <h2 style={{ marginBottom: '1rem' }}>We show you exactly where it goes.</h2>
            <p style={{ marginBottom: '2rem', maxWidth: '48ch' }}>
              Every campaign produces a receipt gallery, delivery photos, and a
              written acknowledgment from the school. Nothing is hidden.
            </p>
          </ScrollReveal>
          <div className="vidya-receipt-grid">
            {IMG_RECEIPTS.map((src, i) => (
              <ScrollReveal key={i} delay={(i % 4) + 1}>
                <div className="vidya-receipt">
                  <img src={src} alt={`Purchase receipt ${i + 1}`} className="stock-img" loading="lazy" />
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <Link to="/impact" className="btn btn--outline-dark" style={{ marginTop: '2rem', display: 'inline-flex' }}>
              View full impact report →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <JaliDivider />

      {/* 6. FAQ */}
      <section className="section section--cream">
        <div className="container vidya-faq">
          <ScrollReveal>
            <p className="eyebrow">Questions</p>
            <h2 style={{ marginBottom: '2rem' }}>Honest answers.</h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <Accordion items={FAQ} />
          </ScrollReveal>
        </div>
      </section>

      {/* ── C. DONATION FORM ──────────────────────────────────── */}
      <section className="section section--paper vidya-donate-section">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow" style={{ textAlign: 'center' }}>Donate</p>
            <h2 style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
              Ready to make it possible?
            </h2>
          </ScrollReveal>
          <DonationForm />
        </div>
      </section>
    </>
  )
}
