import { useCallback, useEffect, useRef, useState } from 'react'
import Picture from '../Picture/Picture'
import './MediaCarousel.css'

/* A one-at-a-time viewer for a set of document scans.
 *
 * Exactly one sheet is on screen at any moment. It is still built on native
 * scroll with scroll-snap rather than a transform track, so a touch swipe, a
 * trackpad and the arrow keys all work without any custom gesture handling and
 * nothing is hijacked. The buttons just scroll the container by one slide.
 */
export default function MediaCarousel({ items, label, sizes = '(max-width: 860px) 92vw, 720px' }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const slide = el.firstElementChild?.offsetWidth || el.clientWidth
    /* Round to the nearest slide: snap can leave a sub-pixel offset. */
    setIndex(Math.min(items.length - 1, Math.max(0, Math.round(el.scrollLeft / slide))))
  }, [items.length])

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

  const goTo = (i) => {
    const el = trackRef.current
    if (!el) return
    const target = Math.min(items.length - 1, Math.max(0, i))
    const slide = el.firstElementChild?.offsetWidth || el.clientWidth
    el.scrollTo({ left: target * slide, behavior: 'smooth' })
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1) }
    else if (e.key === 'Home') { e.preventDefault(); goTo(0) }
    else if (e.key === 'End') { e.preventDefault(); goTo(items.length - 1) }
  }

  if (!items?.length) return null

  const current = items[index]

  return (
    <div className="mcar">
      <div
        className="mcar__track"
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label={label}
        onKeyDown={onKeyDown}
      >
        {items.map((img, i) => (
          <figure className="mcar__item" key={img.slug} aria-hidden={i !== index}>
            <Picture img={img} sizes={sizes} />
          </figure>
        ))}
      </div>

      {/* Caption sits outside the track so it never scrolls with the sheets and
          the height stays stable as they change. */}
      <p className="mcar__caption" aria-live="polite">{current.alt}</p>

      <div className="mcar__controls">
        <button
          type="button"
          className="mcar__btn"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label={`Previous of ${items.length}`}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <p className="mcar__count">
          <span className="mcar__count-current">{index + 1}</span>
          <span className="mcar__count-sep">/</span>
          {items.length}
        </p>

        <button
          type="button"
          className="mcar__btn"
          onClick={() => goTo(index + 1)}
          disabled={index === items.length - 1}
          aria-label={`Next of ${items.length}`}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
