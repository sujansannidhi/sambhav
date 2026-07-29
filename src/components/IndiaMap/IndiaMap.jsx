/* SUPERSEDED by src/components/ImpactMap/, which is what /impact now renders.
 * Kept only because it is still a working country level marker map. It is not
 * imported anywhere. Chirala was removed from MARKERS below: it is not one of
 * the places in the organisation's record and never should have been listed.
 * Note also that this file's Ammanabrolu coordinate was about 32 km off; the
 * corrected position lives in src/data/geo.js.
 */
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import './IndiaMap.css'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const MARKERS = [
  {
    name: 'Narasaraopet',
    coordinates: [80.0531, 16.2325],
    active: true,
    labelX: 0,
    labelY: -12,
    labelAnchor: 'middle',
  },
  {
    name: 'Ammanabrolu',
    coordinates: [80.0287, 15.8705],
    active: true,
    labelX: -12,
    labelY: 4,
    labelAnchor: 'end',
  },
]

export default function IndiaMap() {
  return (
    <div className="india-map-wrap">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [82.5, 22], scale: 1050 }}
        width={460}
        height={520}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies
              .filter(geo => geo.id === '356')
              .map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(35,48,77,0.9)"
                  stroke="rgba(217,183,121,0.25)"
                  strokeWidth={0.8}
                  style={{
                    default: { outline: 'none' },
                    hover:   { outline: 'none', fill: 'rgba(35,48,77,0.9)' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
          }
        </Geographies>

        {MARKERS.map(({ name, coordinates, active, labelX, labelY, labelAnchor }) => (
          <Marker key={name} coordinates={coordinates}>
            {active && (
              <circle r={7} fill="none" stroke="#e9a23b" strokeWidth={1} className="marker-pulse" />
            )}
            <circle
              r={active ? 4 : 3}
              fill={active ? '#e9a23b' : '#c75126'}
              stroke="#fbf6ee"
              strokeWidth={1}
            />
            <text
              textAnchor={labelAnchor}
              x={labelX}
              y={labelY}
              style={{
                fontFamily: 'Mukta, sans-serif',
                fontSize: 10,
                fontWeight: 700,
                fill: '#fbf6ee',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  )
}
