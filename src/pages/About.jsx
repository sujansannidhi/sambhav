import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import JaliDivider from '../components/JaliDivider/JaliDivider'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './Home.css'

/* The team, beneath the founder's story. One entry for now: add to this array
 * as people join rather than editing the markup. */
const TEAM = [
  { name: 'Praneel Rondla', role: 'Vice-president' },
]

/* [CONFIG] Google Form for leadership applications. */
const LEADERSHIP_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScFb3Q3Vd-UqxW7qpYSXPa3olm_9Y_5O5BC9fBMbolgBwmNSw/viewform'

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

      {/* ── TEAM ──────────────────────────────────────────── */}
      <section className="section section--paper">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">The team</p>
            <h2 className="mission__heading">Who runs Sambhav.</h2>
          </ScrollReveal>

          <div className="team">
            {TEAM.map((m, i) => (
              <ScrollReveal key={m.name} delay={i + 1}>
                <div className="team__card">
                  {/* Initials rather than a placeholder silhouette: we do not
                      have photographs for everyone, and a fake avatar is worse
                      than none. */}
                  <span className="team__initials" aria-hidden="true">
                    {m.name.split(' ').map((w) => w[0]).join('')}
                  </span>
                  <h3 className="team__name">{m.name}</h3>
                  <p className="team__role">{m.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={2}>
            <div className="team__apply">
              <h3 className="team__apply-title">Apply for a leadership position</h3>
              <p className="team__apply-body">
                We are building the team out. If you want to help run Sambhav
                rather than just support it, the application is open.
              </p>
              <a
                className="btn btn--primary"
                href={LEADERSHIP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply for a leadership position
              </a>
            </div>
          </ScrollReveal>
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
