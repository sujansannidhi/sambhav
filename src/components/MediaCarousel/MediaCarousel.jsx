import { useCallback, useEffect, useRef, useState } from 'react'
import Picture from '../Picture/Picture'
import './MediaCarousel.css'

/* A horizontally scrollable strip of images.
 *
 * Unlike the hero, this one IS a gallery, so it gets real controls: arrows, a
 * keyboard-reachable scroll container, and a caption per item. It is built on
 * native scroll with scroll-snap rather than a transform track, which means the
 * trackpad, a touch swipe, shift+wheel and the arrow keys all work with no
 * extra code and nothing is hijacked.
 */
export default function MediaCarousel({ items, label, sizes = '(max-width: 760px) 78vw, 340px' }) {
  const trackRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const nudge = (dir) => {
    const el = trackRef.current
    if (!el) return
    const step = el.querySelector('figure')?.offsetWidth ?? 320
    el.scrollBy({ left: dir * (step + 20), behavior: 'smooth' })
  }

  if (!items?.length) return null

  return (
    <div className="mcar">
      <div
        className="mcar__track"
        ref={trackRef}
        /* Focusable so the arrow keys reach it without a mouse. role="group"
           keeps it announced as one unit rather than a list of stray images. */
        tabIndex={0}
        role="group"
        aria-label={label}
      >
        {items.map((img) => (
          <figure className="mcar__item" key={img.slug}>
            <Picture img={img} sizes={sizes} />
            <figcaption className="mcar__caption">{img.alt}</figcaption>
          </figure>
        ))}
      </div>

      <div className="mcar__controls">
        <button
          type="button"
          className="mcar__btn"
          onClick={() => nudge(-1)}
          disabled={atStart}
          aria-label={`Scroll ${label} left`}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className="mcar__btn"
          onClick={() => nudge(1)}
          disabled={atEnd}
          aria-label={`Scroll ${label} right`}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
