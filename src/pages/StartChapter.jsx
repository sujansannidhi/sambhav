import { useState } from 'react'
import Accordion from '../components/Accordion/Accordion'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import JaliDivider from '../components/JaliDivider/JaliDivider'
import useDocumentTitle from '../hooks/useDocumentTitle'
// Reuse the existing contact-form styles rather than authoring new design.
// A later design pass may extract these into a shared form stylesheet.
import './Contact.css'

/* [NEEDS INPUT: copy on this page has not had a review pass against the
 * source document. Chapter mechanics are not described in it at all.] */

const CHAPTER_STEPS = [
  { n: '01', t: 'Gather a few students', b: 'Find classmates who want to help. A chapter can start with two or three people.' },
  { n: '02', t: 'Find a faculty advisor', b: 'A teacher or staff member who can sponsor the club. Helpful, not strictly required to apply.' },
  { n: '03', t: 'Run a supply drive', b: 'We give you the toolkit: supply lists, templates, and guidance to raise funds for a Learning Kits run.' },
  { n: '04', t: 'See where it goes', b: 'Every rupee is documented with receipts, photos, and a letter from the school your chapter supported.' },
]

const REQUIREMENTS = [
  'A current student to lead the chapter',
  'A faculty advisor (helpful, not required to apply)',
  'A school or club willing to host meetings',
  'A few hours a month to run a drive',
]

const FAQ = [
  {
    question: 'Do I need to be a certain age or grade to start a chapter?',
    answer: 'No. If you\'re a high school student who wants to help, you can apply. We\'ll work with you on the rest.',
  },
  {
    question: 'What if I can\'t find a faculty advisor yet?',
    answer: 'Apply anyway. An advisor is helpful for hosting meetings and fundraising at school, but it\'s not required to start the conversation.',
  },
  {
    question: 'How much time does running a chapter take?',
    answer: 'A few hours a month. The toolkit is built so a small team can run a supply drive without it taking over your schedule.',
  },
  {
    question: 'Where does the money my chapter raises go?',
    answer: 'Directly into a Learning Kits supply run. School supplies bought in person, delivered to students, and documented with receipts and photos your chapter can share.',
  },
]

export default function StartChapter() {
  useDocumentTitle(
    'Start a Chapter | Sambhav',
    'Start a Sambhav chapter at your school. Run a supply drive, deliver real impact, and grow the movement.'
  )

  const [studentName, setStudentName]   = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [school, setSchool]             = useState('')
  const [location, setLocation]         = useState('')
  const [grade, setGrade]               = useState('')
  const [advisorName, setAdvisorName]   = useState('')
  const [advisorEmail, setAdvisorEmail] = useState('')
  const [why, setWhy]                   = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [errors, setErrors]       = useState({})

  const validate = () => {
    const e = {}
    if (!studentName.trim())  e.studentName  = 'Please enter your name.'
    if (!studentEmail.trim()) e.studentEmail = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail)) e.studentEmail = 'Please enter a valid email.'
    if (!school.trim())    e.school   = 'Please enter your school name.'
    if (!location.trim())  e.location = 'Please enter your city and state.'
    if (!grade.trim())     e.grade    = 'Please select your grade level.'
    if (!why.trim())       e.why      = 'Please tell us why you want to start a chapter.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    /* [CONFIG: replace with your form handler, e.g. Formspree or Netlify Forms]
     *
     * Example with Formspree:
     *   await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     *     method: 'POST',
     *     headers: { 'Content-Type': 'application/json' },
     *     body: JSON.stringify({
     *       studentName, studentEmail, school, location, grade,
     *       advisorName, advisorEmail, why,
     *     }),
     *   })
     */
    await new Promise(r => setTimeout(r, 900))

    setLoading(false)
    setSubmitted(true)
  }

  const scrollToForm = () => {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="contact-hero texture-overlay">
        <div className="contact-hero__bg" aria-hidden="true" />
        <div className="container contact-hero__content">
          <ScrollReveal>
            <p className="eyebrow eyebrow--light">Start a chapter</p>
            <h1 className="contact-hero__h1">Bring Sambhav to your school.</h1>
            <p className="contact-hero__sub">
              Start a student chapter, run a supply drive, and put school supplies
              directly into students' hands, with receipts to prove it.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <button className="btn btn--primary" onClick={scrollToForm}>
                Apply to start a chapter
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── WHAT A CHAPTER DOES ──────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">What a chapter actually does</p>
            <h2 style={{ marginBottom: '2.5rem', maxWidth: '30ch' }}>
              Four steps from "I want to help" to real impact.
            </h2>
          </ScrollReveal>
          <div className="grid-4">
            {CHAPTER_STEPS.map((s, i) => (
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

      <JaliDivider />

      {/* ── WHAT YOU GET ─────────────────────────────────────── */}
      <section className="section section--paper">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">What you get</p>
            <h2 style={{ marginBottom: '1rem', maxWidth: '30ch' }}>
              A chapter toolkit, so you're not starting from scratch.
            </h2>
            {/* [CONFIG] placeholder link; becomes /chapters/toolkit later. */}
            <p style={{ maxWidth: '56ch' }}>
              Supply lists, fundraising templates, a chapter starter guide, and
              direct guidance from the Sambhav team. Everything you need to run
              your first drive is on the way once you're approved.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <JaliDivider />

      {/* ── REQUIREMENTS ─────────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">What you'll need</p>
            <h2 style={{ marginBottom: '2rem', maxWidth: '30ch' }}>
              The bar to start is intentionally low.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <ul style={{ maxWidth: '52ch', lineHeight: 1.9, paddingLeft: '1.2rem' }}>
              {REQUIREMENTS.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <JaliDivider />

      {/* ── APPLICATION FORM ─────────────────────────────────── */}
      <section id="apply" className="section section--paper">
        <div className="container" style={{ maxWidth: '620px' }}>
          <ScrollReveal>
            <p className="eyebrow">Apply</p>
            <h2 style={{ marginBottom: '2rem' }}>Start your chapter.</h2>
          </ScrollReveal>

          {submitted ? (
            <ScrollReveal>
              <div className="contact-success">
                <div className="contact-success__icon" aria-hidden="true">
                  <svg viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="rgba(233,162,59,0.1)" />
                    <polyline points="14 24 21 31 34 18" stroke="var(--terra)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Application received!</h3>
                <p>We'll be in touch soon with next steps and your chapter toolkit. Thank you for stepping up.</p>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal delay={1}>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__field">
                  <label htmlFor="s-name">Student name *</label>
                  <input
                    id="s-name"
                    type="text"
                    autoComplete="name"
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    className={errors.studentName ? 'contact-form__input--error' : ''}
                    aria-required="true"
                    aria-describedby={errors.studentName ? 's-name-err' : undefined}
                  />
                  {errors.studentName && <span id="s-name-err" className="contact-form__error" role="alert">{errors.studentName}</span>}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="s-email">Student email *</label>
                  <input
                    id="s-email"
                    type="email"
                    autoComplete="email"
                    value={studentEmail}
                    onChange={e => setStudentEmail(e.target.value)}
                    className={errors.studentEmail ? 'contact-form__input--error' : ''}
                    aria-required="true"
                    aria-describedby={errors.studentEmail ? 's-email-err' : undefined}
                  />
                  {errors.studentEmail && <span id="s-email-err" className="contact-form__error" role="alert">{errors.studentEmail}</span>}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="s-school">School name *</label>
                  <input
                    id="s-school"
                    type="text"
                    value={school}
                    onChange={e => setSchool(e.target.value)}
                    className={errors.school ? 'contact-form__input--error' : ''}
                    aria-required="true"
                    aria-describedby={errors.school ? 's-school-err' : undefined}
                  />
                  {errors.school && <span id="s-school-err" className="contact-form__error" role="alert">{errors.school}</span>}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="s-location">School city / state *</label>
                  <input
                    id="s-location"
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className={errors.location ? 'contact-form__input--error' : ''}
                    aria-required="true"
                    aria-describedby={errors.location ? 's-location-err' : undefined}
                  />
                  {errors.location && <span id="s-location-err" className="contact-form__error" role="alert">{errors.location}</span>}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="s-grade">Grade level *</label>
                  <select
                    id="s-grade"
                    value={grade}
                    onChange={e => setGrade(e.target.value)}
                    className={errors.grade ? 'contact-form__input--error' : ''}
                    aria-required="true"
                    aria-describedby={errors.grade ? 's-grade-err' : undefined}
                  >
                    <option value="">Choose one…</option>
                    <option value="9">9th grade</option>
                    <option value="10">10th grade</option>
                    <option value="11">11th grade</option>
                    <option value="12">12th grade</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.grade && <span id="s-grade-err" className="contact-form__error" role="alert">{errors.grade}</span>}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="s-advisor">Faculty advisor name <em>(helpful, not required)</em></label>
                  <input
                    id="s-advisor"
                    type="text"
                    value={advisorName}
                    onChange={e => setAdvisorName(e.target.value)}
                  />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="s-advisor-email">Faculty advisor email <em>(optional)</em></label>
                  <input
                    id="s-advisor-email"
                    type="email"
                    value={advisorEmail}
                    onChange={e => setAdvisorEmail(e.target.value)}
                  />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="s-why">Why do you want to start a chapter? *</label>
                  <textarea
                    id="s-why"
                    rows={5}
                    value={why}
                    onChange={e => setWhy(e.target.value)}
                    className={errors.why ? 'contact-form__input--error' : ''}
                    aria-required="true"
                    aria-describedby={errors.why ? 's-why-err' : undefined}
                    placeholder="Tell us what's drawing you to this…"
                  />
                  {errors.why && <span id="s-why-err" className="contact-form__error" role="alert">{errors.why}</span>}
                </div>

                <button
                  type="submit"
                  className="btn btn--primary contact-form__submit"
                  disabled={loading}
                >
                  {loading ? 'Sending…' : 'Submit application'}
                </button>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>

      <JaliDivider />

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">Questions</p>
            <h2 style={{ marginBottom: '2rem' }}>Before you apply.</h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <Accordion items={FAQ} />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
