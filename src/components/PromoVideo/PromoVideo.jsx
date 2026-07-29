import { useRef, useState } from 'react'
import { PROMO_VIDEO } from '../../data/media'
import './PromoVideo.css'

/* The promotional film, self hosted.
 *
 * Nothing but the poster image loads on arrival: the <video> carries
 * preload="metadata" and the file itself is only fetched once someone presses
 * play. There is no autoplay and no sound without a click, ever.
 *
 * The poster is a frame from the video itself, so pressing play does not jump
 * to a different picture.
 */
export default function PromoVideo() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    setPlaying(true)
    /* Wait for the controls to mount before asking it to play. */
    requestAnimationFrame(() => videoRef.current?.play())
  }

  return (
    <section className="promo" aria-labelledby="promo-heading">
      <div className="container promo__inner">
        <p className="eyebrow eyebrow--light">Watch</p>
        <h2 id="promo-heading" className="promo__heading">
          Two days, twelve schools.
        </h2>
        <p className="promo__sub">
          Filmed during the June delivery run in Narasaraopet and Ammanabrolu.
        </p>

        <div className="promo__frame">
          <video
            ref={videoRef}
            className="promo__video"
            poster={PROMO_VIDEO.poster}
            width={PROMO_VIDEO.width}
            height={PROMO_VIDEO.height}
            preload="metadata"
            playsInline
            controls={playing}
            onPlay={() => setPlaying(true)}
          >
            <source src={PROMO_VIDEO.src} type="video/mp4" />
            {/* [NEEDS INPUT: caption file needs human review]
                No .vtt exists for this film and no reviewed transcript was
                available at build time. Captions are required before launch.
                Write public/media/sambhav-promo.en.vtt, have a person check it
                against the audio, then uncomment the track below.
            <track
              kind="captions"
              srcLang="en"
              label="English"
              src={PROMO_VIDEO.captions}
              default
            />
            */}
            Your browser cannot play this video.{' '}
            <a href={PROMO_VIDEO.src}>Download the file instead.</a>
          </video>

          {!playing && (
            /* aria-label rather than relying on the inner text: the label span is
               display:none under 640px, which would otherwise leave the button
               with no accessible name on phones. */
            <button
              className="promo__play"
              onClick={play}
              type="button"
              aria-label="Play the film, 28 seconds, with sound"
            >
              <span className="promo__play-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="promo__play-label">
                Play the film
                <span className="promo__play-meta">28 seconds, with sound</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
