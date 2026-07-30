import { useEffect, useState } from 'react'
import { HERO } from '../../data/media'
import { srcSet, fallback } from '../../data/media'
import './HeroCarousel.css'

const HOLD_MS = 6000
const FADE_MS = 1200

/* Background image rotation for the hero.
 *
 * This is a background, not a gallery: no arrows, no dots, no pause control.
 * The first frame is the LCP element, so it renders eagerly and is preloaded
 * from index.html. Later frames only start loading once the hero has painted.
 *
 * prefers-reduced-motion turns the whole thing into a single static image.
 * The crossfade and the Ken Burns drift are both CSS, so that switch happens in
 * HeroCarousel.css and the timer below simply never starts.
 */
export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [ready, setReady] = useState(false)
  const [reduced, setReduced] = useState(false)
  /* Which frames have been allowed to start loading. With 13 frames, mounting
     them all at once would pull megabytes the viewer may never see, so we keep a
     sliding window: frame 0 up front, then each frame's successor as its turn
     approaches. Once a frame is in the set it stays, so going round again is
     instant. */
  const [allowed, setAllowed] = useState(() => new Set([0]))

  /* Watch the motion preference live: a user can change it mid-session. */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  /* Hold the remaining frames back until after first paint so they cannot
     compete with the LCP image for bandwidth. */
  useEffect(() => {
    if (reduced) return
    const start = () => setReady(true)
    if (document.readyState === 'complete') {
      const id = setTimeout(start, 400)
      return () => clearTimeout(id)
    }
    window.addEventListener('load', start, { once: true })
    return () => window.removeEventListener('load', start)
  }, [reduced])

  useEffect(() => {
    if (reduced || !ready || HERO.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO.length), HOLD_MS)
    return () => clearInterval(id)
  }, [reduced, ready])

  /* Open the window to the next frame as soon as the current one is showing,
     giving it a full 6 second hold to arrive before it is needed. */
  useEffect(() => {
    if (reduced || !ready) return
    const next = (index + 1) % HERO.length
    setAllowed((prev) => (prev.has(next) ? prev : new Set(prev).add(next)))
  }, [index, ready, reduced])

  const frames = reduced ? HERO.slice(0, 1) : HERO

  return (
    <div className="hero-carousel" aria-hidden="true">
      {frames.map((img, i) => {
        const active = i === index
        /* Frame 0 is eager. The rest wait for the load event AND their turn in
           the sliding window above. */
        const shouldLoad = i === 0 || (ready && allowed.has(i))
        return (
          <div
            key={img.slug}
            className={`hero-carousel__frame${active ? ' hero-carousel__frame--active' : ''}`}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          >
            {shouldLoad && (
              <picture>
                <source type="image/avif" srcSet={srcSet(img, 'avif')} sizes="100vw" />
                <source type="image/webp" srcSet={srcSet(img, 'webp')} sizes="100vw" />
                <img
                  src={fallback(img)}
                  srcSet={srcSet(img, 'jpg')}
                  sizes="100vw"
                  alt=""
                  width={img.w}
                  height={img.h}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding={i === 0 ? 'sync' : 'async'}
                  /* Lowercase: React 18 drops the camelCase `fetchPriority`. */
                  fetchpriority={i === 0 ? 'high' : 'low'}
                  style={{ objectPosition: img.objectPosition }}
                />
              </picture>
            )}
          </div>
        )
      })}
    </div>
  )
}
