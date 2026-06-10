import JaliDivider from '../JaliDivider/JaliDivider'
import './Footer.css'

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

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
            Sambhav removes the small barriers that stop people from thriving,
            starting with the basics every student deserves.
          </p>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Programs</h4>
          <ul className="footer__links">
            <li>
              <a href="#mission" onClick={(e) => { e.preventDefault(); scrollTo('mission') }}>
                Project Vidya: Education
              </a>
            </li>
            <li><span className="footer__soon">Project Jal: Clean Water <em>coming soon</em></span></li>
            <li><span className="footer__soon">Project Swasth: Health <em>coming soon</em></span></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Navigate</h4>
          <ul className="footer__links">
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                Home
              </a>
            </li>
            <li><a href="#mission" onClick={(e) => { e.preventDefault(); scrollTo('mission') }}>Mission</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about') }}>About</a></li>
            <li><a href="#places" onClick={(e) => { e.preventDefault(); scrollTo('places') }}>Places</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Get in touch</h4>
          <ul className="footer__links">
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
          <p>© 2025 Sambhav. A student-led initiative.</p>
          <p>Donations processed securely through GoFundMe.</p>
        </div>
      </div>
    </footer>
  )
}
