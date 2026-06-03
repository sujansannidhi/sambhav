import { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import './Contact.css'

const HOW_OPTIONS = [
  { value: 'donate',    label: 'Donate' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'partner',   label: 'Partner school or organization' },
  { value: 'spread',    label: 'Spread the word' },
  { value: 'other',     label: 'Other / just saying hi' },
]

export default function Contact() {
  const [name, setName]     = useState('')
  const [email, setEmail]   = useState('')
  const [how, setHow]       = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [errors, setErrors]       = useState({})

  const validate = () => {
    const e = {}
    if (!name.trim())    e.name    = 'Please enter your name.'
    if (!email.trim())   e.email   = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email.'
    if (!message.trim()) e.message = 'Please write a message.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    /* [CONFIG: replace with your form handler — Formspree, Netlify Forms, etc.]
     *
     * Example with Formspree:
     *   await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     *     method: 'POST',
     *     headers: { 'Content-Type': 'application/json' },
     *     body: JSON.stringify({ name, email, how, message }),
     *   })
     */
    await new Promise(r => setTimeout(r, 900))

    setLoading(false)
    setSubmitted(true)
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="contact-hero texture-overlay">
        <div className="contact-hero__bg" aria-hidden="true" />
        <div className="container contact-hero__content">
          <ScrollReveal>
            <p className="eyebrow eyebrow--light">Get involved</p>
            <h1 className="contact-hero__h1">We'd love to hear from you.</h1>
            <p className="contact-hero__sub">
              Whether you want to donate, volunteer, connect a school, or just ask
              a question — reach out.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FORM + INFO ──────────────────────────────────────── */}
      <section className="section section--cream">
        <div className="container contact-layout">
          {/* Left: form */}
          <div className="contact-form-col">
            <ScrollReveal>
              <h2 style={{ marginBottom: '2rem', color: 'var(--indigo)' }}>Send us a message</h2>
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
                  <h3>Message sent!</h3>
                  <p>We'll be in touch soon. Thank you for reaching out.</p>
                </div>
              </ScrollReveal>
            ) : (
              <ScrollReveal delay={1}>
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form__field">
                    <label htmlFor="c-name">Full name *</label>
                    <input
                      id="c-name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className={errors.name ? 'contact-form__input--error' : ''}
                      aria-required="true"
                      aria-describedby={errors.name ? 'c-name-err' : undefined}
                    />
                    {errors.name && <span id="c-name-err" className="contact-form__error" role="alert">{errors.name}</span>}
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="c-email">Email address *</label>
                    <input
                      id="c-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={errors.email ? 'contact-form__input--error' : ''}
                      aria-required="true"
                      aria-describedby={errors.email ? 'c-email-err' : undefined}
                    />
                    {errors.email && <span id="c-email-err" className="contact-form__error" role="alert">{errors.email}</span>}
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="c-how">How would you like to help? <em>(optional)</em></label>
                    <select
                      id="c-how"
                      value={how}
                      onChange={e => setHow(e.target.value)}
                    >
                      <option value="">Choose one…</option>
                      {HOW_OPTIONS.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="c-message">Message *</label>
                    <textarea
                      id="c-message"
                      rows={5}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className={errors.message ? 'contact-form__input--error' : ''}
                      aria-required="true"
                      aria-describedby={errors.message ? 'c-msg-err' : undefined}
                      placeholder="Tell us a little about yourself and how you'd like to connect…"
                    />
                    {errors.message && <span id="c-msg-err" className="contact-form__error" role="alert">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn--primary contact-form__submit"
                    disabled={loading}
                  >
                    {loading ? 'Sending…' : 'Send message'}
                  </button>
                </form>
              </ScrollReveal>
            )}
          </div>

          {/* Right: info */}
          <ScrollReveal delay={2} className="contact-info-col">
            <div className="contact-info">
              <div className="contact-info__item">
                <h4>Email</h4>
                <a href="mailto:hello@sambhav.org">hello@sambhav.org</a>
              </div>
              <div className="contact-info__item">
                <h4>Follow along</h4>
                <a href="https://instagram.com/sambhavorg" target="_blank" rel="noopener noreferrer">
                  Instagram — @sambhavorg
                </a>
                <a href="https://twitter.com/sambhavorg" target="_blank" rel="noopener noreferrer">
                  Twitter / X — @sambhavorg
                </a>
              </div>
              <div className="contact-info__item">
                <h4>Partner schools</h4>
                <p>
                  If you represent a school or NGO in India and would like to be
                  considered for a supply campaign, please reach out via email or
                  use the form with "Partner school" selected.
                </p>
              </div>
              <div className="contact-info__quote">
                <p>
                  "Every person who helps is someone who decided the gap was worth
                  filling. That's the whole organization."
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
