import { useRef, useState } from 'react'
import ScrollReveal from '../ScrollReveal/ScrollReveal'
import Picture from '../Picture/Picture'
import { HANDOVER, HANDOVER_VIDEOS, videoPoster } from '../../data/media'
import './Handover.css'

/* The handover.
 *
 * This is the part of the campaign the whole page builds toward, so it gets its
 * own full width section rather than being the fifth item in a list of steps.
 *
 * The videos are the point here. Every clip is click to play with
 * preload="none", so the section costs nothing but its poster images until a
 * viewer actually asks for one. No autoplay, no sound without a click.
 */

function formatDuration(s) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return m ? `${m}:${String(r).padStart(2, '0')}` : `0:${String(r).padStart(2, '0')}`
}

function VideoCard({ video, feature = false }) {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    setPlaying(true)
    requestAnimationFrame(() => ref.current?.play())
  }

  return (
    <figure className={`hv${feature ? ' hv--feature' : ''}`}>
      <div className="hv__frame">
        <video
          ref={ref}
          className="hv__video"
          poster={videoPoster(video, feature ? 960 : 480)}
          width={video.w}
          height={video.h}
          /* Nothing is fetched until play is pressed. */
          preload="none"
          playsInline
          controls={playing}
          onPlay={() => setPlaying(true)}
        >
          <source src={video.src} type="video/mp4" />
          Your browser cannot play this video.{' '}
          <a href={video.src}>Download the file instead.</a>
        </video>

        {!playing && (
          <button
            type="button"
            className="hv__play"
            onClick={play}
            aria-label={`Play: ${video.alt} (${formatDuration(video.seconds)}, with sound)`}
          >
            <span className="hv__play-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width={feature ? 26 : 20} height={feature ? 26 : 20} fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="hv__duration" aria-hidden="true">{formatDuration(video.seconds)}</span>
          </button>
        )}
      </div>
      <figcaption className="hv__caption">{video.alt}</figcaption>
    </figure>
  )
}

export default function Handover() {
  const [feature, ...rest] = HANDOVER_VIDEOS

  return (
    <section className="handover" aria-labelledby="handover-heading">
      <div className="container">
        <ScrollReveal>
          <p className="eyebrow eyebrow--light">The handover</p>
          <h2 id="handover-heading" className="handover__heading">
            The part that actually matters.
          </h2>
          <p className="handover__lede">
            Everything before this is logistics. This is the day the boxes come off
            the auto-rickshaw and a student walks away holding something that is
            theirs. Sixteen hours of it, across two days, in two towns.
          </p>
        </ScrollReveal>

        {/* Lead film */}
        <ScrollReveal delay={1}>
          <div className="handover__feature">
            <VideoCard video={feature} feature />
          </div>
        </ScrollReveal>

        {/* The three facts the document actually records about the day */}
        <ScrollReveal delay={1}>
          <dl className="handover__facts">
            <div>
              <dt>2 days</dt>
              <dd>23 and 24 June 2026</dd>
            </div>
            <div>
              <dt>16 hours</dt>
              <dd>of distribution across the two towns</dd>
            </div>
            <div>
              <dt>5 hours</dt>
              <dd>of packing before any of it moved</dd>
            </div>
          </dl>
        </ScrollReveal>

        {/* Photo mosaic */}
        <ScrollReveal delay={1}>
          <div className="handover__mosaic">
            {HANDOVER.map((img, i) => (
              <div key={img.slug} className={`handover__tile handover__tile--${i}`}>
                <Picture img={img} sizes="(max-width: 760px) 92vw, 30vw" />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Remaining clips */}
        <ScrollReveal delay={1}>
          <h3 className="handover__subhead">More from the two days</h3>
          <div className="handover__grid">
            {rest.map((v) => (
              <VideoCard key={v.slug} video={v} />
            ))}
          </div>
        </ScrollReveal>

        <p className="handover__note">
          Filmed by the volunteers on the day. Nothing is staged and nothing is
          re-enacted.
        </p>
      </div>
    </section>
  )
}
