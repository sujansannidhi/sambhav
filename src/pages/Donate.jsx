import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { GOFUNDME_SLUG } from '../config'
import './Home.css'

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

export default function Donate() {
  useDocumentTitle(
    'Donate | Sambhav',
    'Support Sambhav. Every dollar buys school supplies wholesale and in person, delivered directly to students, with receipts and photos shared.'
  )

  return (
    <section id="donate" className="donate-section" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)' }}>
      <div className="container donate-inner">
        <ScrollReveal>
          <p className="eyebrow eyebrow--light">Support Sambhav</p>
          <h1 className="donate__heading">Help a student take the first step.</h1>
          <p className="donate__sub">
            Your support provides educational resources and gives students the tools
            they need to pursue their goals. Every dollar goes directly to the
            field: supplies bought in person, every rupee documented.
            {/* GoFundMe processes the funds. Sambhav has no 501(c)(3) and no fiscal
                sponsor, so giving is not tax deductible and no copy may imply it is. */}
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
        <ScrollReveal delay={2}>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/impact" className="btn btn--outline">See where it goes →</Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
