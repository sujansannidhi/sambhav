import { useState } from 'react'
import './DonationForm.css'

const PRESETS = [
  { amount: 5,   impact: '≈ 1 student, full year' },
  { amount: 25,  impact: '≈ 5 students' },
  { amount: 100, impact: '≈ 20 students (a classroom)' },
  { amount: 500, impact: '≈ 100 students (a small school)' },
]

const STEP_AMOUNT = 1
const STEP_DETAILS = 2
const STEP_SUCCESS = 3

export default function DonationForm() {
  const [step, setStep] = useState(STEP_AMOUNT)
  const [selected, setSelected] = useState(25)
  const [custom, setCustom] = useState('')
  const [isMonthly, setIsMonthly] = useState(false)
  const [coverFees, setCoverFees] = useState(false)

  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [note, setNote]       = useState('')
  const [updates, setUpdates] = useState(true)

  const [loading, setLoading] = useState(false)
  const [errors, setErrors]   = useState({})

  const baseAmount = custom !== '' ? parseFloat(custom) || 0 : selected
  const finalAmount = coverFees ? Math.round(baseAmount * 1.03 * 100) / 100 : baseAmount
  const studentsReached = Math.max(1, Math.floor(finalAmount / 5))

  const impactLabel = PRESETS.find(p => p.amount === selected)?.impact ||
    (baseAmount >= 5 ? `≈ ${studentsReached} student${studentsReached !== 1 ? 's' : ''}` : '')

  const validateStep2 = () => {
    const e = {}
    if (!name.trim())  e.name  = 'Please enter your name.'
    if (!email.trim()) e.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep2()) return
    setLoading(true)

    /* [CONFIG: Replace this mock with your Stripe Checkout call]
     *
     * Example with Stripe:
     *   const session = await fetch('/api/create-checkout-session', {
     *     method: 'POST',
     *     headers: { 'Content-Type': 'application/json' },
     *     body: JSON.stringify({ amount: finalAmount * 100, name, email, note, isMonthly }),
     *   }).then(r => r.json())
     *   window.location.href = session.url
     *
     * Example with Donorbox: embed their iframe instead of this form.
     */
    await new Promise(r => setTimeout(r, 1200)) // simulate network

    setLoading(false)
    setStep(STEP_SUCCESS)
  }

  if (step === STEP_SUCCESS) {
    return <SuccessState amount={finalAmount} students={studentsReached} name={name} />
  }

  return (
    <div className="donation-form" id="donate">
      <div className="donation-form__card">
        <h2 className="donation-form__title">Help a student take the first step.</h2>

        {/* Frequency toggle */}
        <div className="donation-form__freq" role="group" aria-label="Donation frequency">
          <button
            className={`donation-form__freq-btn${!isMonthly ? ' donation-form__freq-btn--active' : ''}`}
            onClick={() => setIsMonthly(false)}
            type="button"
          >
            One-time
          </button>
          <button
            className={`donation-form__freq-btn${isMonthly ? ' donation-form__freq-btn--active' : ''}`}
            onClick={() => setIsMonthly(true)}
            type="button"
          >
            Monthly
          </button>
        </div>

        {step === STEP_AMOUNT && (
          <StepAmount
            presets={PRESETS}
            selected={selected}
            custom={custom}
            onSelect={(v) => { setSelected(v); setCustom('') }}
            onCustom={(v) => { setCustom(v); setSelected(null) }}
            coverFees={coverFees}
            onCoverFees={setCoverFees}
            impactLabel={impactLabel}
            finalAmount={finalAmount}
            onNext={() => setStep(STEP_DETAILS)}
          />
        )}

        {step === STEP_DETAILS && (
          <StepDetails
            name={name} setName={setName}
            email={email} setEmail={setEmail}
            note={note} setNote={setNote}
            updates={updates} setUpdates={setUpdates}
            errors={errors}
            loading={loading}
            finalAmount={finalAmount}
            onBack={() => { setStep(STEP_AMOUNT); setErrors({}) }}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      <div className="donation-form__trust">
        <TrustChip icon="shield" label="Secure payment" />
        <TrustChip icon="receipt" label="Receipts shared" />
        <TrustChip icon="check" label="100% to supplies" />
        <TrustChip icon="photo" label="Delivery verified" />
      </div>
    </div>
  )
}

function StepAmount({ presets, selected, custom, onSelect, onCustom, coverFees, onCoverFees, impactLabel, finalAmount, onNext }) {
  const isValid = (custom !== '' ? parseFloat(custom) >= 1 : selected !== null)

  return (
    <div className="donation-form__step">
      <p className="donation-form__step-label">Step 1 of 2: choose an amount</p>

      <div className="donation-form__presets" role="group" aria-label="Preset donation amounts">
        {presets.map(({ amount, impact }) => (
          <button
            key={amount}
            type="button"
            className={`donation-form__preset${selected === amount && custom === '' ? ' donation-form__preset--active' : ''}`}
            onClick={() => onSelect(amount)}
            aria-pressed={selected === amount && custom === ''}
          >
            <span className="donation-form__preset-amount">${amount}</span>
            <span className="donation-form__preset-impact">{impact}</span>
          </button>
        ))}
      </div>

      <div className="donation-form__custom">
        <label htmlFor="custom-amount" className="donation-form__custom-label">Custom amount</label>
        <div className="donation-form__custom-wrap">
          <span className="donation-form__currency">$</span>
          <input
            id="custom-amount"
            type="number"
            min="1"
            step="1"
            placeholder="Other"
            value={custom}
            onChange={(e) => onCustom(e.target.value)}
            className="donation-form__custom-input"
            aria-label="Custom donation amount in dollars"
          />
        </div>
      </div>

      {impactLabel && (
        <p className="donation-form__impact-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Your gift: {impactLabel}
        </p>
      )}

      <label className="donation-form__checkbox">
        <input
          type="checkbox"
          checked={coverFees}
          onChange={(e) => onCoverFees(e.target.checked)}
        />
        <span>Add 3% to cover processing fees so 100% reaches students</span>
      </label>

      <button
        className="btn btn--primary donation-form__next"
        type="button"
        onClick={onNext}
        disabled={!isValid || finalAmount < 1}
      >
        Continue, ${finalAmount.toFixed(2)} →
      </button>
    </div>
  )
}

function StepDetails({ name, setName, email, setEmail, note, setNote, updates, setUpdates, errors, loading, finalAmount, onBack, onSubmit }) {
  return (
    <form className="donation-form__step" onSubmit={onSubmit} noValidate>
      <p className="donation-form__step-label">Step 2 of 2: your details</p>

      <div className="donation-form__field">
        <label htmlFor="donor-name">Full name *</label>
        <input
          id="donor-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? 'donation-form__input--error' : ''}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-required="true"
        />
        {errors.name && <span id="name-error" className="donation-form__error" role="alert">{errors.name}</span>}
      </div>

      <div className="donation-form__field">
        <label htmlFor="donor-email">Email address *</label>
        <input
          id="donor-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? 'donation-form__input--error' : ''}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-required="true"
        />
        {errors.email && <span id="email-error" className="donation-form__error" role="alert">{errors.email}</span>}
      </div>

      <div className="donation-form__field">
        <label htmlFor="donor-note">Leave a note or dedicate this gift <em>(optional)</em></label>
        <textarea
          id="donor-note"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. In memory of…  or  For the students of…"
        />
      </div>

      <label className="donation-form__checkbox">
        <input
          type="checkbox"
          checked={updates}
          onChange={(e) => setUpdates(e.target.checked)}
        />
        <span>I'd like updates on where my gift goes (delivery photos, receipts)</span>
      </label>

      {/* [CONFIG: Replace with your payment processor's hosted card element]
       *  e.g. <CardElement options={...} /> from @stripe/react-stripe-js
       *  or point to your Donorbox / Razorpay embed.
       */}
      <div className="donation-form__payment-placeholder">
        <div className="donation-form__payment-mock">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
          <span>Card details, powered by Stripe</span>
          <em>[CONFIG: embed Stripe CardElement or Checkout here]</em>
        </div>
      </div>

      <div className="donation-form__actions">
        <button type="button" className="btn btn--outline-dark donation-form__back" onClick={onBack}>
          ← Back
        </button>
        <button
          type="submit"
          className="btn btn--primary donation-form__submit"
          disabled={loading}
          aria-label={`Donate $${finalAmount.toFixed(2)}`}
        >
          {loading ? (
            <>
              <svg className="donation-form__spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              Processing…
            </>
          ) : (
            `Give $${finalAmount.toFixed(2)}`
          )}
        </button>
      </div>

      <p className="donation-form__security">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Secure payment · Your card data is never stored on our servers.
      </p>
    </form>
  )
}

function SuccessState({ amount, students, name }) {
  return (
    <div className="donation-form" id="donate">
      <div className="donation-form__card donation-form__card--success">
        <div className="donation-success__glow" aria-hidden="true" />
        <div className="donation-success">
          <div className="donation-success__diya" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none">
              <ellipse cx="32" cy="44" rx="16" ry="6" fill="rgba(233,162,59,0.15)" />
              <path d="M24 40 Q32 20 40 40 Q36 44 28 44 Z" fill="var(--saffron)" opacity="0.9" />
              <ellipse cx="32" cy="24" rx="4" ry="6" fill="var(--saffron)" />
              <ellipse cx="32" cy="22" rx="2" ry="4" fill="#fff" opacity="0.7" />
            </svg>
          </div>
          <h2 className="donation-success__title">
            Thank you{name ? `, ${name.split(' ')[0]}` : ''}.
          </h2>
          <p className="donation-success__subtitle">
            You just equipped <strong>{students} student{students !== 1 ? 's' : ''}</strong> for the school year.
          </p>
          <div className="donation-success__details">
            <div className="donation-success__chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.84 13.5 19.79 19.79 0 0 1 1.77 4.87 2 2 0 0 1 3.75 2.67h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Receipt sent to your email
            </div>
            <div className="donation-success__chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
              </svg>
              ${amount.toFixed(2)} goes directly to supplies
            </div>
          </div>
          <div className="donation-success__share">
            <p>Share the mission:</p>
            <div className="donation-success__share-btns">
              <a
                href={`https://twitter.com/intent/tweet?text=I+just+helped+${students}+students+get+school+supplies+through+%40sambhavorg.+sambhav.foundation%2Fcampaigns%2Flearning-kits`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline-dark donation-success__share-btn"
              >
                Share on X
              </a>
            </div>
          </div>
          <a href="/impact" className="btn btn--ghost donation-success__impact-link">
            Watch where it goes →
          </a>
        </div>
      </div>
    </div>
  )
}

function TrustChip({ icon, label }) {
  const icons = {
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    receipt: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    photo: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  }
  return (
    <div className="trust-chip">
      <span className="trust-chip__icon">{icons[icon]}</span>
      <span>{label}</span>
    </div>
  )
}
