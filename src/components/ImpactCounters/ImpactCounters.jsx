import { useEffect, useRef, useState } from 'react'
import './ImpactCounters.css'

/* Impact figures.
 *
 * Every number here comes from "Sambhav Proof Of Concept", page 4, the block
 * headed "Here's a quick peak of the impact we made". Nothing is derived,
 * rounded up, or combined. Source lines:
 *
 *   page 4, "June 23rd & 24th"      -> the as-of date on every figure
 *   page 4, "12 / SCHOOLS SERVED"   -> schools
 *   page 4, "1200 + / STUDENTS EQUIPPED" -> students who received a kit
 *   page 4 to 5, the two town headings -> towns reached
 *
 * The document writes 1200+, so that figure is shown as "over 1,200" rather than
 * hardened into an exact number.
 *
 * The cost per student figure (=$3.50 on page 4) was removed from this band at
 * the client's request. It is still stated in prose on the Mission and About
 * pages, where it has room for the context that it is a wholesale unit price.
 *
 * The per-figure detail lines and the closing note were removed at the client's
 * request. The "as of" date stays: an undated figure reads as invented.
 *
 * The labels are deliberately long. "Students who received a kit" is not the
 * same claim as "students enrolled at the schools we reached", and the site must
 * never let one be read as the other.
 */
const AS_OF = 'as of 24 June 2026'

const FIGURES = [
  {
    value: 12,
    display: '12',
    label: 'schools reached',
  },
  {
    value: 1200,
    display: '1,200',
    prefix: 'over ',
    label: 'students who received a kit',
  },
  {
    value: 2,
    display: '2',
    label: 'towns reached',
  },
]

function useCountUp(target, decimals, enabled) {
  const [n, setN] = useState(enabled ? 0 : target)

  useEffect(() => {
    if (!enabled) {
      setN(target)
      return
    }
    let raf
    const DURATION = 1400
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1)
      /* ease-out cubic so it decelerates into the final number */
      setN(target * (1 - Math.pow(1 - t, 3)))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setN(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, decimals, enabled])

  return n
}

function Figure({ fig, animate }) {
  const n = useCountUp(fig.value, fig.decimals, animate)
  const text = animate
    ? fig.decimals
      ? `$${n.toFixed(2)}`
      : Math.round(n).toLocaleString('en-US')
    : fig.display

  return (
    <div className="counter">
      <p className="counter__value">
        {fig.prefix && <span className="counter__prefix">{fig.prefix}</span>}
        {text}
      </p>
      <p className="counter__label">{fig.label}</p>
      <p className="counter__asof">{AS_OF}</p>
    </div>
  )
}

/* Counts up once per session, the first time the band enters the viewport.
 * Scrolling away and back does not replay it. */
const SESSION_KEY = 'sambhav:counters-played'

export default function ImpactCounters() {
  const ref = useRef(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === '1'
    if (reduced || alreadyPlayed) return

    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setAnimate(true)
        sessionStorage.setItem(SESSION_KEY, '1')
        io.disconnect()
      },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="counters" ref={ref} aria-labelledby="counters-heading">
      <div className="container">
        <p className="eyebrow">What has happened so far</p>
        <h2 id="counters-heading" className="counters__heading">
          Impact in numbers.
        </h2>
        <div className="counters__grid">
          {FIGURES.map((fig) => (
            <Figure key={fig.label} fig={fig} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  )
}
