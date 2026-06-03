import { Link } from 'react-router-dom'
import JaliDivider from '../JaliDivider/JaliDivider'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__jali">
        <JaliDivider dark />
      </div>
      <div className="container footer__inner">
        <div className="footer__col footer__col--brand">
          <div className="footer__logo">
            <span className="footer__logo-devanagari">संभव</span>
            <span className="footer__logo-text">Sambhav</span>
          </div>
          <p className="footer__tagline">Making opportunity possible.</p>
          <p className="footer__mission">
            Sambhav removes the small barriers that stop people from thriving —
            starting with the basics every student deserves.
          </p>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Programs</h4>
          <ul className="footer__links">
            <li>
              <Link to="/project-vidya">Project Vidya — Education</Link>
            </li>
            <li>
              <span className="footer__soon">Project Jal — Clean Water <em>coming soon</em></span>
            </li>
            <li>
              <span className="footer__soon">Project Swasth — Health <em>coming soon</em></span>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Quick links</h4>
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/impact">Impact & Transparency</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Get in touch</h4>
          <ul className="footer__links">
            <li>
              <a href="mailto:hello@sambhav.org">
                hello@sambhav.org
              </a>
            </li>
            <li>
              <a href="https://instagram.com/sambhavorg" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://twitter.com/sambhavorg" target="_blank" rel="noopener noreferrer">
                Twitter / X
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© 2025 Sambhav. A student-led initiative.</p>
          <p>
            Donations processed securely.{' '}
            <Link to="/contact">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
