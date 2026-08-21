import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import markColour from '../../assets/brand/sambhav-mark.svg'
import markLight from '../../assets/brand/sambhav-mark-light.svg'
import './Header.css'

const NAV_LINKS = [
  { to: '/mission', label: 'Mission' },
  { to: '/impact', label: 'Impact' },
  { to: '/about', label: 'About' },
  { to: '/partnerships', label: 'Partnerships' },
]

/* Campaigns. Teaching and Access were removed at the client's request, leaving
 * Learning Kits as the only campaign. A dropdown holding one item is worse than
 * a link, so "Campaigns" now navigates straight to it. */

const WORDMARK = 'Sambhav'
const ANIM_KEY = 'sambhav:wordmark-played'

function Wordmark() {
  const [animate, setAnimate] = useState(false)

  /* Plays once per session on first load, never on route change. */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || sessionStorage.getItem(ANIM_KEY) === '1') return
    sessionStorage.setItem(ANIM_KEY, '1')
    setAnimate(true)
  }, [])

  return (
    /* Real text in the DOM. The per letter spans are presentational, so the
       parent carries the accessible name and the spans are hidden from
       assistive technology. */
    <span
      className={`header__wordmark${animate ? ' header__wordmark--animate' : ''}`}
      aria-label={WORDMARK}
    >
      {WORDMARK.split('').map((ch, i) => (
        <span
          key={i}
          className="header__wordmark-letter"
          aria-hidden="true"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`} role="banner">
      {/* Scrim: at scroll top the header floats over the hero photograph, which
          now changes every few seconds. This gradient gives every control a
          stable dark backing without reading as a solid bar, and fades out once
          the header takes its own cream background. */}
      <div className="header__scrim" aria-hidden="true" />

      <div className="container header__inner">
        <Link to="/" className="header__logo" aria-label="Sambhav, home" onClick={closeMenu}>
          <span className="header__mark" aria-hidden="true">
            <img src={markColour} alt="" className="header__mark-img header__mark-img--colour" width="34" height="24" />
            <img src={markLight} alt="" className="header__mark-img header__mark-img--light" width="34" height="24" />
          </span>
          <Wordmark />
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          <NavLink to="/campaigns/learning-kits" className="header__nav-link" onClick={closeMenu}>
            Campaigns
          </NavLink>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} className="header__nav-link" onClick={closeMenu}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Donate used .btn--outline-dark, which is indigo text on the indigo
            hero at scroll top: a contrast ratio of 1.08, effectively invisible.
            It now uses a header specific variant that is cream over the hero and
            indigo once the header goes cream. */}
        <Link to="/donate" className="btn header__cta header__cta--secondary" onClick={closeMenu}>
          Donate
        </Link>
        <Link to="/start" className="btn btn--primary header__cta" onClick={closeMenu}>
          Start a Chapter
        </Link>

        <button
          className={`header__hamburger${menuOpen ? ' header__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`header__mobile-menu${menuOpen ? ' header__mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <NavLink to="/campaigns/learning-kits" className="header__mobile-link" onClick={closeMenu}>
            Campaigns
          </NavLink>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} className="header__mobile-link" onClick={closeMenu}>
              {label}
            </NavLink>
          ))}
          <Link to="/donate" className="header__mobile-link" onClick={closeMenu}>Donate</Link>
          <Link to="/start" className="btn btn--primary header__mobile-cta" onClick={closeMenu}>
            Start a Chapter
          </Link>
        </nav>
      </div>
    </header>
  )
}
