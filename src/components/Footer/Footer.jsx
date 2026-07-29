import { Link } from 'react-router-dom'
import JaliDivider from '../JaliDivider/JaliDivider'
import markLight from '../../assets/brand/sambhav-mark-light.svg'
import { GOFUNDME_URL } from '../../config'
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
            {/* Cream mark: the footer sits on --indigo-2, where the ink trunk of
                the colour mark measures 1.13:1 and would disappear. */}
            <img src={markLight} alt="" className="footer__logo-mark" width="40" height="28" />
            <span className="footer__logo-text">Sambhav</span>
          </div>
          <p className="footer__tagline">Making opportunity possible.</p>
          <p className="footer__mission">
            Sambhav removes the small barriers that stop people from thriving,
            starting with the basics every student deserves.
          </p>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Explore</h2>
          <ul className="footer__links">
            <li><Link to="/campaigns/learning-kits">Learning Kits</Link></li>
            <li><Link to="/mission">Mission</Link></li>
            <li><Link to="/impact">Impact</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/partnerships">Partnerships</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Take action</h2>
          <ul className="footer__links">
            <li><Link to="/start">Start a Chapter</Link></li>
            <li><Link to="/donate">Donate</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Connect</h2>
          <ul className="footer__links">
            {/* GoFundMe is the current giving channel. Sambhav has no 501(c)(3)
                and no fiscal sponsor, so no page may describe a gift as tax
                deductible. */}
            <li>
              <a href={GOFUNDME_URL} target="_blank" rel="noopener noreferrer">
                Give via GoFundMe
              </a>
            </li>
            <li><a href="mailto:sujan.sannidhi@gmail.com">sujan.sannidhi@gmail.com</a></li>
            <li>
              <a href="https://www.linkedin.com/in/sujan-sannidhi2010/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© 2026 Sambhav. Frisco, Texas.</p>
          {/* Do not claim registered status until it is true. The organisation's
              own record lists "file and receive 501(c) status" as a long term
              goal that has not been started, so "pending" would overstate it. */}
          <p>
            A student-led initiative. Not a registered 501(c)(3), and gifts are not
            tax deductible.
          </p>
        </div>
      </div>
    </footer>
  )
}
