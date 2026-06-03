import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import JaliDivider from '../components/JaliDivider/JaliDivider'
import { IMG_FOUNDER } from '../images'
import './About.css'

const VALUES = [
  {
    title: 'Transparency first',
    body: 'Every rupee is accounted for with a receipt. Every delivery is photographed. Nothing is hidden.',
  },
  {
    title: 'Direct, not distant',
    body: 'We buy in person. We deliver in person. No third-party chains, no opaque logistics.',
  },
  {
    title: 'Local knowledge',
    body: 'Local wholesale markets and trusted partners mean your money stretches 3–4× further than any imported or retail purchase.',
  },
  {
    title: 'Start small, do it right',
    body: "One program at a time. We won't launch the next until this one is airtight.",
  },
]

export default function About() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="about-hero texture-overlay">
        <div className="about-hero__bg" aria-hidden="true" />
        <div className="container about-hero__content">
          <ScrollReveal>
            <p className="eyebrow eyebrow--light">Our story</p>
            <h1 className="about-hero__h1">Why I started Sambhav.</h1>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FOUNDER LETTER ───────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container about-letter">
          <div className="about-letter__image-col">
            <ScrollReveal>
              <img
                className="about-letter__img"
                src={IMG_FOUNDER}
                alt="Sambhav founder"
                loading="eager"
              />
            </ScrollReveal>
          </div>
          <ScrollReveal delay={1} className="about-letter__text">
            <p className="eyebrow">A note from the founder</p>
            <h2>The thing stopping people wasn't a lack of dreams.</h2>
            <div className="about-letter__body">
              <p>
                My name is [Name], and I'm a high school student who started Sambhav
                after spending time in a small village school during a family visit to
                India. I walked into a classroom of thirty children who were sharing
                two notebooks between them. Not because they didn't want to learn —
                because their families genuinely couldn't spare the cost of a notebook.
              </p>
              <p>
                That's when I understood what "barrier" really means. Not a wall.
                A missing ₹20 notebook. Something so fixable it's almost absurd.
                I came home thinking: if we just removed this one specific thing,
                what becomes possible?
              </p>
              <p>
                Sambhav started as a question: <em>what if we took that seriously?</em>
                What if instead of organizing a bake sale and shipping boxes of crayons
                across an ocean, we just went there — bought wholesale, locally, the
                way families would buy if they could — and put the supplies directly
                in students' hands?
              </p>
              <p>
                Project Vidya is the answer to that question. And it works. Every kit
                costs $2–4. Every campaign produces receipts and photos. Every school
                sends back a letter. No overhead. No mystery.
              </p>
              <p className="about-letter__sign">
                — [Name], Founder, Sambhav
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <JaliDivider />

      {/* ── HOW WE WORK EXPANDED ─────────────────────────────── */}
      <section className="section section--paper">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">How we work</p>
            <h2 style={{ marginBottom: '1rem', maxWidth: '30ch' }}>
              The model is simple by design.
            </h2>
            <p style={{ maxWidth: '56ch', marginBottom: '3rem' }}>
              Complexity creates overhead. Simplicity creates trust. Here's exactly
              what happens when you donate.
            </p>
          </ScrollReveal>
          <div className="about-timeline">
            {[
              { n: '1', t: 'You donate', b: 'Your gift is received and earmarked for the current campaign.' },
              { n: '2', t: 'We go to the market', b: 'A team member visits a local wholesale market — the same place families buy when they can. Receipts at every step.' },
              { n: '3', t: 'Kits are assembled', b: 'Standard kits are packed: notebooks, pens, pencils, geometry sets, erasers. No substitutions, no shortcuts.' },
              { n: '4', t: 'Delivered to school', b: 'Our on-the-ground partner delivers directly to the school. The headmaster signs an acknowledgment letter.' },
              { n: '5', t: 'We document and share', b: 'Photos, receipts, and the school letter go up on our Impact page. Nothing is withheld.' },
            ].map((s, i) => (
              <ScrollReveal key={s.n} delay={(i % 3) + 1} className="about-timeline__item">
                <div className="about-timeline__num">{s.n}</div>
                <div className="about-timeline__body">
                  <h3>{s.t}</h3>
                  <p>{s.b}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <JaliDivider />

      {/* ── VALUES ────────────────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">What we stand for</p>
            <h2 style={{ marginBottom: '2.5rem' }}>Built on a short list of hard rules.</h2>
          </ScrollReveal>
          <div className="grid-2">
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.title} delay={(i % 2) + 1}>
                <div className="about-value">
                  <h3 className="about-value__title">{v.title}</h3>
                  <p className="about-value__body">{v.body}</p>
                </div>
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
              Ready to see where it goes?
            </h2>
            <p style={{ color: 'rgba(251,246,238,0.65)', marginBottom: '2rem' }}>
              Every campaign is documented. Nothing is hidden.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/impact" className="btn btn--primary">View the impact</Link>
              <Link to="/project-vidya#donate" className="btn btn--outline">Donate now</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
