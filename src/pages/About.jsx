import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import JaliDivider from '../components/JaliDivider/JaliDivider'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './Home.css'

const VALUES = [
  { title: 'Transparency first', body: 'Every rupee is accounted for with a receipt. Every delivery is photographed. Nothing is hidden.' },
  { title: 'Direct, not distant', body: 'We buy in person. We deliver in person. No third-party chains, no opaque logistics.' },
  { title: 'Local knowledge', body: 'Buying at a wholesale shop in the same district brought the cost of a kit to about $3.50. No importing, no retail markup.' },
  { title: 'Start small, do it right', body: "One program at a time. We won't launch the next until this one is airtight." },
]

export default function About() {
  useDocumentTitle(
    'About | Sambhav',
    'Why a high school student started Sambhav, and the simple, documented model behind its work.'
  )

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="section section--indigo" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)' }}>
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow eyebrow--light">Our story</p>
            <h1 className="mission__heading" style={{ color: 'var(--cream)' }}>
              Why I started Sambhav.
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FOUNDER ──────────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container about-split">
          <ScrollReveal>
            <div className="about-photo-wrap">
              <img src="/sujan.jpg" alt="Sujan Sannidhi" className="about-photo" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div className="about-text">
              <p className="eyebrow">Who I am</p>
              <h2 className="about-name">Sujan Sannidhi</h2>
              <p className="about-bio">
                I'm a rising junior at Independence High School. Education has always
                been one of the most important parts of my life. Growing up in the
                United Kingdom and later moving to the United States, I experienced
                two very different education systems. That change was hard, but not
                impossible, because of the people around me and the resources I had
                to overcome any obstacles that came my way.
              </p>
              <p className="about-bio about-bio--second">
                This isn't the same for everyone, and I want to fight to change that.
                Not every student has that privilege. Sambhav is my attempt to remove
                the small, fixable barriers that stop students from showing up
                ready to learn: a notebook, a pencil, a geometry set.
              </p>
              <a
                href="https://www.linkedin.com/in/sujan-sannidhi2010/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline-dark about-linkedin"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <JaliDivider />

      {/* ── VALUES ────────────────────────────────────────── */}
      <section className="section section--paper">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">What we stand for</p>
            <h2 className="mission__heading">Built on a short list of hard rules.</h2>
          </ScrollReveal>
          <div className="grid-2" style={{ marginTop: '2.5rem' }}>
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.title} delay={(i % 2) + 1}>
                <div className="card">
                  <div className="card__body">
                    <h3 className="card__title">{v.title}</h3>
                    <p className="card__text">{v.body}</p>
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
              Want to be part of it?
            </h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/start" className="btn btn--primary">Start a Chapter</Link>
              <Link to="/contact" className="btn btn--outline">Get in touch</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
