import { useEffect, useRef, useState } from 'react'
import { ANDHRA_PRADESH, LOCATIONS, OSM_CREDIT } from '../../data/geo'
import { NARASARAOPET, AMMANABROLU } from '../../data/media'
import Picture from '../Picture/Picture'
import ImpactMapStatic from './ImpactMapStatic'
import './ImpactMap.css'

const VB = { w: 1000, h: 700 }
const PHOTOS = { narasaraopet: NARASARAOPET, ammanabrolu: AMMANABROLU }

/* Equirectangular projection with a latitude correction. Over a single district
 * this is indistinguishable from Mercator and it stays cheap to recompute on
 * every scroll frame. */
function project([lon, lat], camera) {
  const k = Math.cos((camera.lat * Math.PI) / 180)
  return [
    VB.w / 2 + (lon - camera.lon) * camera.scale * k,
    VB.h / 2 - (lat - camera.lat) * camera.scale,
  ]
}

const toPath = (coords, camera) =>
  coords.map((c, i) => `${i ? 'L' : 'M'}${project(c, camera).map((n) => n.toFixed(1)).join(' ')}`).join('') + 'Z'

const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = (v) => Math.min(1, Math.max(0, v))
/* Progress within a sub range of the whole sequence. */
const seg = (p, from, to) => clamp01((p - from) / (to - from))
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

const AP_CAMERA = { lon: 80.4, lat: 16.4, scale: 78 }
const ACTS = LOCATIONS.map((loc) => ({
  ...loc,
  camera: { lon: loc.center[0], lat: loc.center[1], scale: loc.boundary ? 2600 : 3400 },
}))

/* Timeline, in fractions of the pinned scroll distance. Two acts, same shape. */
const T = {
  a1: { move: [0.04, 0.18], draw: [0.18, 0.28], photos: [0.28, 0.42], out: [0.42, 0.48] },
  a2: { move: [0.52, 0.66], draw: [0.66, 0.76], photos: [0.76, 0.88], out: [0.88, 0.96] },
}

export default function ImpactMap() {
  const outerRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [useStatic, setUseStatic] = useState(true)

  /* Decide once, and re-decide if the viewport or the motion preference changes.
   * Under 768px and under reduced motion we render a different component
   * entirely, not a degraded animation. */
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const small = window.matchMedia('(max-width: 767px)')
    const decide = () => setUseStatic(motion.matches || small.matches)
    decide()
    motion.addEventListener('change', decide)
    small.addEventListener('change', decide)
    return () => {
      motion.removeEventListener('change', decide)
      small.removeEventListener('change', decide)
    }
  }, [])

  /* Scroll progress from the section's own geometry. No scroll hijacking, no
   * wheel listeners, no preventDefault: the page scrolls at its normal speed and
   * we only read where it got to. */
  useEffect(() => {
    if (useStatic) return
    const el = outerRef.current
    if (!el) return

    let ticking = false
    let visible = false

    const read = () => {
      ticking = false
      const rect = el.getBoundingClientRect()
      const scrollable = el.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      setProgress(clamp01(-rect.top / scrollable))
    }
    const onScroll = () => {
      if (!visible || ticking) return
      ticking = true
      requestAnimationFrame(read)
    }

    /* Only listen while the section is actually on screen. */
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) read()
      },
      { rootMargin: '10% 0px' }
    )
    io.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [useStatic])

  if (useStatic) return <ImpactMapStatic />

  /* ── camera ─────────────────────────────────────────────────────────────── */
  const p = progress
  let camera = AP_CAMERA
  let act = -1

  if (p < T.a1.move[0]) {
    camera = AP_CAMERA
  } else if (p < T.a1.out[1]) {
    const t = easeInOut(seg(p, ...T.a1.move))
    camera = zoom(AP_CAMERA, ACTS[0].camera, t)
    act = 0
    if (p > T.a1.out[0]) {
      const back = easeInOut(seg(p, ...T.a1.out))
      camera = zoom(ACTS[0].camera, AP_CAMERA, back * 0.55)
    }
  } else if (p < T.a2.move[0]) {
    camera = zoom(ACTS[0].camera, AP_CAMERA, 0.55)
  } else {
    const t = easeInOut(seg(p, ...T.a2.move))
    camera = zoom(zoom(ACTS[0].camera, AP_CAMERA, 0.55), ACTS[1].camera, t)
    act = 1
    if (p > T.a2.out[0]) {
      const back = easeInOut(seg(p, ...T.a2.out))
      camera = zoom(ACTS[1].camera, AP_CAMERA, back * 0.55)
    }
  }

  const timeline = act === 1 ? T.a2 : T.a1
  const drawT = act >= 0 ? seg(p, ...timeline.draw) : 0
  const photoT = act >= 0 ? seg(p, ...timeline.photos) : 0
  const outT = act >= 0 ? seg(p, ...timeline.out) : 0
  const current = act >= 0 ? ACTS[act] : null

  const apPath = toPath(ANDHRA_PRADESH, camera)
  const boundaryPath = current?.boundary ? toPath(current.boundary, camera) : null
  const centerPt = current ? project(current.center, camera) : null
  /* One degree of latitude is about 111 km, so a radius in km becomes a radius
     in projected units directly. */
  const ringR = current?.radiusKm ? (current.radiusKm / 111) * camera.scale : 0

  const photos = current ? PHOTOS[current.id] || [] : []
  const labelOpacity = act >= 0 ? clamp01(drawT * 2) * (1 - outT) : 0

  return (
    <section className="imap" ref={outerRef} aria-labelledby="imap-heading">
      <div className="imap__sticky">
        <div className="imap__stage">
          <svg
            className="imap__svg"
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            role="img"
            aria-label="Map of Andhra Pradesh showing Narasaraopet and Ammanabrolu, the two places Sambhav has delivered to."
          >
            <path className="imap__state" d={apPath} />

            {boundaryPath && (
              <path
                className="imap__boundary"
                d={boundaryPath}
                /* pathLength normalises the dash maths regardless of the real
                   perimeter, so the stroke draws at a predictable rate. */
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - drawT}
                opacity={1 - outT}
              />
            )}

            {current && !current.boundary && centerPt && (
              <g opacity={(1 - outT) * clamp01(drawT * 1.4)}>
                <circle
                  className="imap__ring"
                  cx={centerPt[0]}
                  cy={centerPt[1]}
                  r={ringR * clamp01(drawT * 1.2)}
                />
                <circle className="imap__dot" cx={centerPt[0]} cy={centerPt[1]} r="6" />
              </g>
            )}

            {current?.boundary && centerPt && (
              <circle
                className="imap__dot"
                cx={centerPt[0]}
                cy={centerPt[1]}
                r="5"
                opacity={(1 - outT) * drawT}
              />
            )}
          </svg>

          {/* Photographs drift in around the outline. They are decorative here:
              the same images carry real alt text in the static cards below the
              fold and on the campaign page. */}
          <div className="imap__photos" aria-hidden="true">
            {photos.map((img, i) => {
              const stagger = clamp01((photoT - i * 0.12) / 0.4)
              const drift = (1 - stagger) * 26 + outT * -40
              return (
                <figure
                  key={img.slug}
                  className={`imap__photo imap__photo--${i}`}
                  style={{
                    opacity: stagger * (1 - outT),
                    transform: `translate3d(0, ${drift}px, 0)`,
                  }}
                >
                  <Picture img={img} sizes="320px" decorative />
                </figure>
              )
            })}
          </div>

          {current && (
            <div className="imap__label" style={{ opacity: labelOpacity }}>
              <h3 className="imap__place">{current.name}</h3>
              <p className="imap__district">{current.district}</p>
              <p className="imap__schools">
                {current.schools} schools reached in June 2026
              </p>
              <p className="imap__note">{current.note}</p>
            </div>
          )}

          <h2 id="imap-heading" className="imap__title" style={{ opacity: 1 - clamp01(p * 8) }}>
            <span className="eyebrow eyebrow--light">Where it happened</span>
            Two towns in Andhra Pradesh.
          </h2>

          <p className="imap__credit">{OSM_CREDIT}</p>
        </div>
      </div>
    </section>
  )
}

function zoom(a, b, t) {
  return {
    lon: lerp(a.lon, b.lon, t),
    lat: lerp(a.lat, b.lat, t),
    /* Interpolate scale geometrically so the zoom feels linear to the eye. */
    scale: Math.exp(lerp(Math.log(a.scale), Math.log(b.scale), t)),
  }
}
