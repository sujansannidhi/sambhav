import { ANDHRA_PRADESH, LOCATIONS, OSM_CREDIT } from '../../data/geo'
import { NARASARAOPET, AMMANABROLU } from '../../data/media'
import Picture from '../Picture/Picture'
import './ImpactMap.css'

const PHOTOS = { narasaraopet: NARASARAOPET, ammanabrolu: AMMANABROLU }
const VB = { w: 420, h: 300 }

/* The static version of the impact map.
 *
 * This is what phones and anyone with prefers-reduced-motion get. It is a
 * complete component in its own right, not the scroll sequence with the motion
 * switched off: one card per location, each showing the place, its outline and a
 * small grid of photographs. Everything the animated version communicates is
 * here, just without the camera move.
 */
function fitCamera(coords, center) {
  const lons = coords ? coords.map((c) => c[0]) : [center[0] - 0.05, center[0] + 0.05]
  const lats = coords ? coords.map((c) => c[1]) : [center[1] - 0.05, center[1] + 0.05]
  const lon = (Math.min(...lons) + Math.max(...lons)) / 2
  const lat = (Math.min(...lats) + Math.max(...lats)) / 2
  const k = Math.cos((lat * Math.PI) / 180)
  const spanX = (Math.max(...lons) - Math.min(...lons)) * k || 0.1
  const spanY = Math.max(...lats) - Math.min(...lats) || 0.1
  const scale = Math.min((VB.w * 0.7) / spanX, (VB.h * 0.7) / spanY)
  return { lon, lat, scale }
}

function project([lon, lat], cam) {
  const k = Math.cos((cam.lat * Math.PI) / 180)
  return [VB.w / 2 + (lon - cam.lon) * cam.scale * k, VB.h / 2 - (lat - cam.lat) * cam.scale]
}

const toPath = (coords, cam) =>
  coords.map((c, i) => `${i ? 'L' : 'M'}${project(c, cam).map((n) => n.toFixed(1)).join(' ')}`).join('') + 'Z'

export default function ImpactMapStatic() {
  return (
    <section className="imap-static" aria-labelledby="imap-static-heading">
      <div className="container">
        <p className="eyebrow eyebrow--light">Where it happened</p>
        <h2 id="imap-static-heading" className="imap-static__heading">
          Two towns in Andhra Pradesh.
        </h2>

        <div className="imap-static__grid">
          {LOCATIONS.map((loc) => {
            const cam = fitCamera(loc.boundary, loc.center)
            const pt = project(loc.center, cam)
            const ringR = loc.radiusKm ? (loc.radiusKm / 111) * cam.scale : 0
            const photos = PHOTOS[loc.id] || []

            return (
              <article className="imap-card" key={loc.id}>
                <div className="imap-card__map">
                  <svg viewBox={`0 0 ${VB.w} ${VB.h}`} role="img" aria-label={`Outline map of ${loc.name}`}>
                    <path className="imap__state imap__state--static" d={toPath(ANDHRA_PRADESH, cam)} />
                    {loc.boundary ? (
                      <path className="imap__boundary imap__boundary--static" d={toPath(loc.boundary, cam)} />
                    ) : (
                      <circle className="imap__ring" cx={pt[0]} cy={pt[1]} r={ringR} />
                    )}
                    <circle className="imap__dot" cx={pt[0]} cy={pt[1]} r="5" />
                  </svg>
                </div>

                <div className="imap-card__body">
                  <h3 className="imap-card__place">{loc.name}</h3>
                  <p className="imap-card__district">{loc.district}</p>
                  <p className="imap-card__schools">{loc.schools} schools reached in June 2026</p>
                  <p className="imap-card__note">{loc.note}</p>
                </div>

                <div className="imap-card__photos">
                  {photos.map((img) => (
                    <Picture key={img.slug} img={img} sizes="(max-width: 767px) 45vw, 220px" />
                  ))}
                </div>
              </article>
            )
          })}
        </div>

        <p className="imap__credit imap__credit--static">{OSM_CREDIT}</p>
      </div>
    </section>
  )
}
