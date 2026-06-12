import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import './IndiaMap.css'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const MARKERS = [
  {
    name: 'Narasaraopet',
    coordinates: [80.0531, 16.2325],
    active: true,
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

        {MARKERS.map(({ name, coordinates, active }) => (
          <Marker key={name} coordinates={coordinates}>
            {/* Pulse ring */}
            {active && (
              <circle r={14} fill="none" stroke="#e9a23b" strokeWidth={1.5} className="marker-pulse" />
            )}
            {/* Dot */}
            <circle
              r={active ? 7 : 5}
              fill={active ? '#e9a23b' : '#c75126'}
              stroke="#fbf6ee"
              strokeWidth={1.5}
            />
            {/* Label */}
            <text
              textAnchor="middle"
              y={-14}
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
