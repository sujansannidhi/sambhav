import { useEffect, useRef } from 'react' // useRef kept for GoFundMeWidget
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import JaliDivider from '../components/JaliDivider/JaliDivider'
import IndiaMap from '../components/IndiaMap/IndiaMap'
import LearningHero from '../components/LearningHero/LearningHero'
import { IMG_CHILDREN_SMILING } from '../images'
import './Home.css'

const GOFUNDME_URL = 'https://gofund.me/4808bf77f'
const GOFUNDME_SLUG = 'sambhav-bringing-education-opportunities-to-india'


const PLACES = [
  {
    region: 'Narasaraopet',
    area: 'Palnadu district, Andhra Pradesh',
    focus: 'School supplies for students in rural government schools',
    status: 'Active',
  },
]

function GoFundMeWidget() {
  return (
    <div className="gfm-widget-shell">
      <iframe
        src={`https://www.gofundme.com/f/${GOFUNDME_SLUG}/widget/medium/`}
        title="Sambhav fundraiser on GoFundMe"
        width="100%"
        height="380"
        frameBorder="0"
        scrolling="no"
        allow="payment"
      />
    </div>
  )
}

export default function Home() {

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero" aria-label="Hero">
        <div
          className="hero__bg"
          style={{ backgroundImage: `url(${IMG_CHILDREN_SMILING})` }}
          aria-hidden="true"
        />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__glow" aria-hidden="true" />

        <div className="hero__title-stage">
          <span className="hero__devanagari">संभव</span>
          <h1 className="hero__h1">Sambhav</h1>
        </div>

        {/* static sub-content */}
        <div className="container hero__content">
          <p className="eyebrow eyebrow--light">Making opportunity possible</p>
          <p className="hero__sub">
            Opportunity shouldn't depend on where you're born. Sambhav removes
            the small barriers that stop people from thriving, starting with
            the basics every child deserves.
          </p>
          <div className="hero__ctas">
            <a
              href={GOFUNDME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Donate Now
            </a>
            <button className="btn btn--outline" onClick={() => scrollTo('mission')}>
              Our Mission
            </button>
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

      {/* ── MISSION ──────────────────────────────────────── */}
      <section id="mission" className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">What we aim to achieve</p>
            <h2 className="mission__heading">We find the gaps. We fill them.</h2>
            <p className="mission__intro">
              Around the world, millions of young people face barriers that have nothing
              to do with their intelligence, determination, or potential. Some must leave
              school to support their families. Others lack transportation, school
              supplies, internet access, or safe learning environments. Many simply never
              receive the opportunities they deserve.
            </p>
            <p className="mission__intro">
              Sambhav, the name roughly translates to "possible", aims to bridge that
              gap. There's a kid out there who has to give up their education to support
              their family. There's a kid out there who can't make the commute to their
              local school every day. Why should they suffer for the things they can't
              control?
            </p>
          </ScrollReveal>

          <div className="grid-3 mission__pillars">
            {/* Active: Education */}
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

            {/* Blank slot 2 */}
            <ScrollReveal delay={2}>
              <div className="pillar pillar--blank">
                <span className="pillar__blank-dot" />
                <span className="pillar__blank-dot" />
                <span className="pillar__blank-dot" />
                <span className="pillar__label">More coming</span>
              </div>
            </ScrollReveal>

            {/* Blank slot 3 */}
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

      {/* ── MAP ───────────────────────────────────────────── */}
      <section className="section section--dark map-section">
        <div className="container map-section__inner">
          <ScrollReveal>
            <div className="map-section__text">
              <p className="eyebrow eyebrow--light">Where we operate</p>
              <h2 className="map-section__heading">Rooted in Andhra Pradesh.</h2>
              <p className="map-section__body">
                Sambhav begins where the need is clearest. Our first operations
                are in Narasaraopet, a community in Andhra
                Pradesh where access to quality learning materials makes a direct,
                measurable difference.
              </p>
              <div className="map-legend">
                <span className="map-legend__item map-legend__item--active">Active</span>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <IndiaMap />
          </ScrollReveal>
        </div>
      </section>

      {/* ── LEARN / EMPOWER / TRANSFORM ───────────────────── */}
      <LearningHero />

      <JaliDivider />

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section id="about" className="section section--cream">
        <div className="container about-split">
          <ScrollReveal>
            <div className="about-photo-wrap">
              <img
                src="/sujan.jpg"
                alt="Sujan Sannidhi"
                className="about-photo"
              />
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
                Not every student has that privilege. Your support can help provide
                educational resources, expand access to learning opportunities, and
                give students the tools they need to pursue their goals.
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

      {/* ── PLACES ────────────────────────────────────────── */}
      <section id="places" className="section section--dark">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow eyebrow--light">Where we work</p>
            <h2 className="places__heading">Communities we're committed to.</h2>
          </ScrollReveal>
          <div className="places__grid--two">
            {PLACES.map((p, i) => (
              <ScrollReveal key={p.region} delay={i + 1}>
                <div className="place-card">
                  <div className="place-card__top">
                    <h3 className="place-card__region">{p.region}</h3>
                    <span className={`place-card__status${p.status === 'Active' ? ' place-card__status--active' : ''}`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="place-card__area">{p.area}</p>
                  <p className="place-card__focus">{p.focus}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DONATE ────────────────────────────────────────── */}
      <section id="donate" className="donate-section">
        <div className="container donate-inner">
          <ScrollReveal>
            <p className="eyebrow eyebrow--light">Support Sambhav</p>
            <h2 className="donate__heading">Help a student take the first step.</h2>
            <p className="donate__sub">
              Your support can help provide educational resources, expand access
              to learning opportunities, and give students the tools they need
              to pursue their goals. Every dollar goes directly to the field,
              zero overhead, every rupee documented.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div className="donate__widget-wrap">
              <GoFundMeWidget />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p className="donate__trust">
              Secure payments via GoFundMe. Every purchase receipted and photographed.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
