import { useState, useEffect } from 'react'
import './Header.css'

const NAV_LINKS = [
  { href: '#mission', label: 'Mission' },
  { href: '#about', label: 'About' },
  { href: '#places', label: 'Places' },
  { href: '#donate', label: 'Donate' },
]

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
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

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollTo(href.replace('#', ''))
  }

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`} role="banner">
      <div className="container header__inner">
        <a
          href="#"
          className="header__logo"
          aria-label="Sambhav — Home"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <span className="header__logo-devanagari">संभव</span>
          <span className="header__logo-text">Sambhav</span>
        </a>

        <nav className="header__nav" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="header__nav-link"
              onClick={(e) => handleNav(e, href)}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#donate"
          className="btn btn--primary header__cta"
          onClick={(e) => handleNav(e, '#donate')}
        >
          Donate
        </a>

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
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="header__mobile-link"
              onClick={(e) => handleNav(e, href)}
            >
              {label}
            </a>
          ))}
          <a
            href="#donate"
            className="btn btn--primary header__mobile-cta"
            onClick={(e) => handleNav(e, '#donate')}
          >
            Donate
          </a>
        </nav>
      </div>
    </header>
  )
}
