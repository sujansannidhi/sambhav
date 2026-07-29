import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle(
    'Page not found | Sambhav',
    'The page you were looking for doesn\'t exist. Head back home or start a chapter.'
  )

  return (
    <section className="section section--cream" style={{ textAlign: 'center' }}>
      <div className="container">
        <ScrollReveal>
          <p className="eyebrow">404</p>
          {/* [COPY] */}
          <h1 style={{ marginBottom: '1rem' }}>This page wandered off.</h1>
          <p style={{ maxWidth: '46ch', margin: '0 auto 2rem' }}>
            The link may be broken or the page may have moved. Let's get you back
            on track.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn--outline-dark">Back home</Link>
            <Link to="/start" className="btn btn--primary">Start a Chapter</Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
