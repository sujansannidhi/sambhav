import { useEffect, useRef, useState } from 'react'
import { IMG_CLASSROOM_HERO } from '../../images'
import './PSAModal.css'

const PSA_VIDEO_ID = 'PLACEHOLDER_VIDEO_ID' // [CONFIG: replace with your YouTube video ID]

export default function PSAModal({ onClose }) {
  const [muted, setMuted] = useState(true)
  const overlayRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') trapFocus(e)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [onClose])

  const trapFocus = (e) => {
    const modal = overlayRef.current
    if (!modal) return
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  const videoSrc = `https://www.youtube.com/embed/${PSA_VIDEO_ID}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&modestbranding=1&enablejsapi=1`

  return (
    <div
      className="psa-overlay"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Project Vidya — Our story"
      onClick={handleOverlayClick}
    >
      <div className="psa-modal">
        <div className="psa-modal__header">
          <div className="psa-modal__meta">
            <span className="eyebrow eyebrow--light">Sambhav · Project Vidya</span>
          </div>
          <button
            ref={closeRef}
            className="psa-modal__close"
            onClick={onClose}
            aria-label="Close video and continue to Project Vidya"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Skip →
          </button>
        </div>

        <div className="psa-modal__video-wrap">
          <iframe
            className="psa-modal__iframe"
            src={videoSrc}
            title="Project Vidya — Our story"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
          {/* Poster shown if video blocked by prefers-reduced-motion */}
          <div className="psa-modal__poster psa-modal__poster--hidden" aria-hidden="true">
            <img src={IMG_CLASSROOM_HERO} alt="Project Vidya — students in classroom" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>

        <div className="psa-modal__footer">
          <button
            className="psa-modal__sound-btn"
            onClick={() => setMuted((v) => !v)}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
          >
            {muted ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
                Tap for sound
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
                Sound on
              </>
            )}
          </button>

          <button className="btn btn--primary psa-modal__cta" onClick={onClose}>
            Continue to Project Vidya →
          </button>
        </div>
      </div>
    </div>
  )
}
