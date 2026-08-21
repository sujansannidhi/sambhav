import { Link } from 'react-router-dom'
import ScrollReveal from '../ScrollReveal/ScrollReveal'
import { GOFUNDME_URL, GOFUNDME_SLUG } from '../../config'
import './DonateSection.css'

/* Giving section.
 *
 * GoFundMe is the channel. Sambhav has no 501(c)(3) and no fiscal sponsor, so
 * nothing here may describe a gift as tax deductible.
 *
 * The widget is an iframe on gofundme.com, so it loads lazily: it is well below
 * the fold and should not cost anything on first paint. The plain link beside it
 * is the fallback that matters, because GoFundMe's own frame-ancestors policy
 * may refuse to render the embed on this domain.
 */
export default function DonateSection() {
  return (
    <section className="give" aria-labelledby="give-heading">
      <div className="container give__inner">
        <div className="give__text">
          <ScrollReveal>
            <p className="eyebrow eyebrow--light">Support the work</p>
            <h2 id="give-heading" className="give__heading">
              About $3.50 puts a kit in a student's hands.
            </h2>
            <p className="give__body">
              That is what one kit cost on the June 2026 run, buying at a local
              wholesale shop in the same district. Every purchase is receipted,
              every delivery is photographed, and each school signs for what it
              received.
            </p>
            <ul className="give__list">
              <li>Bought in person, at local wholesale prices</li>
              <li>Handed to students directly, not through a distribution chain</li>
              <li>Receipts, photographs and a signed letter from every school</li>
            </ul>
            <div className="give__actions">
              <a
                className="btn btn--primary"
                href={GOFUNDME_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Give via GoFundMe
              </a>
              <Link to="/impact" className="btn btn--outline">
                See where it goes
              </Link>
            </div>
            <p className="give__disclaimer">
              GoFundMe holds and processes the funds. Sambhav is a student-led
              initiative and is not a registered 501(c)(3), so gifts are not tax
              deductible.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={1}>
          <div className="give__widget">
            {/* Height is set in CSS to match the widget card exactly (199px).
                Keep scrolling="no" so the clipped area below the card cannot be
                scrolled into view. */}
            <iframe
              src={`https://www.gofundme.com/f/${GOFUNDME_SLUG}/widget/medium/`}
              title="Sambhav fundraiser on GoFundMe"
              frameBorder="0"
              scrolling="no"
              loading="lazy"
              allow="payment"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
