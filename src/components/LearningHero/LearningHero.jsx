import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './LearningHero.css'

gsap.registerPlugin(ScrollTrigger)

/* The three goals, as the organisation defines them in "Sambhav Proof Of
 * Concept", page 2. The wording of each line is drawn from that section.
 * Animation timing and typography are unchanged from the previous version. */
const SECTIONS = [
  {
    word: 'EQUIP',
    line1: 'We put the physical tools of learning',
    line2: 'into a student\'s hands.',
  },
  {
    word: 'ENABLE',
    line1: 'Volunteer teaching, exam preparation, and support',
    line2: 'for the students the system leaves behind.',
  },
  {
    word: 'SUSTAIN',
    line1: 'Not one good year, but consistency:',
    line2: 'one student staying in school, year by year.',
  },
]

// Site palette as hex numbers
const C = {
  indigo2:  0x16213a,
  indigo:   0x23304d,
  saffron:  0xe9a23b,
  terra:    0xc75126,
  cream:    0xfbf6ee,
  goldLine: 0xd9b779,
}

export default function LearningHero() {
  const outerRef  = useRef(null)   // 300vh scroll container
  const stickyRef = useRef(null)   // sticky 100vh viewport
  const canvasRef = useRef(null)
  const titleRef  = useRef(null)
  const subRef    = useRef(null)

  const [sectionIdx, setSectionIdx] = useState(0)
  /* Null until we know. False means we render the scene-free version: the words
     and their lines still appear, just over a flat indigo ground. */
  const [webgl, setWebgl] = useState(null)
  const threeRefs = useRef({
    scene: null, camera: null, renderer: null,
    stars: [], mountains: [], animId: null,
    targetZ: 0,
  })

  // ── Three.js setup ────────────────────────────────────────────
  useEffect(() => {
    const R = threeRefs.current

    /* A WebGL context is not guaranteed: it can be blocked by a GPU blocklist,
       switched off in settings, or simply unavailable in a VM or on older
       hardware. three.js throws when it cannot get one, and an uncaught throw in
       an effect takes the whole React tree down with it, which used to blank the
       entire homepage. Check first, and treat any failure as "no scene". */
    let ok = false
    try {
      const probe = document.createElement('canvas')
      ok = !!(window.WebGLRenderingContext &&
        (probe.getContext('webgl2') || probe.getContext('webgl') || probe.getContext('experimental-webgl')))
    } catch {
      ok = false
    }
    if (!ok) {
      setWebgl(false)
      return
    }

    try {
      R.scene = new THREE.Scene()
      R.scene.fog = new THREE.FogExp2(C.indigo2, 0.0004)

      R.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000)
      R.camera.position.set(0, 25, 80)

      R.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: false })
      R.renderer.setSize(window.innerWidth, window.innerHeight)
      R.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      R.renderer.setClearColor(C.indigo2)
      R.renderer.toneMapping = THREE.ACESFilmicToneMapping
      R.renderer.toneMappingExposure = 0.8

      buildStars(R)
      buildMountains(R)
      buildHorizonGlow(R)
    } catch (err) {
      console.warn('LearningHero: falling back to the scene-free version.', err)
      setWebgl(false)
      return
    }
    setWebgl(true)

    const animate = () => {
      R.animId = requestAnimationFrame(animate)
      const t = Date.now() * 0.001

      R.stars.forEach(s => { if (s.material.uniforms) s.material.uniforms.time.value = t })

      // Smooth camera Z
      R.camera.position.z += (R.targetZ - R.camera.position.z) * 0.04
      R.camera.position.x = Math.sin(t * 0.08) * 3
      R.camera.position.y = 25 + Math.sin(t * 0.12) * 2
      R.camera.lookAt(0, 5, R.camera.position.z - 100)

      R.renderer.render(R.scene, R.camera)
    }
    animate()

    const onResize = () => {
      R.camera.aspect = window.innerWidth / window.innerHeight
      R.camera.updateProjectionMatrix()
      R.renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(R.animId)
      R.stars.forEach(s => { s.geometry.dispose(); s.material.dispose() })
      R.mountains.forEach(m => { m.geometry.dispose(); m.material.dispose() })
      R.renderer.dispose()
    }
  }, [])

  // ── Scroll handler ────────────────────────────────────────────
  useEffect(() => {
    const R = threeRefs.current

    const onScroll = () => {
      const outer = outerRef.current
      if (!outer) return
      const rect = outer.getBoundingClientRect()
      const scrollable = outer.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(scrolled / scrollable, 1)

      const idx = Math.min(Math.floor(progress * 3), 2)
      setSectionIdx(idx)

      // Camera Z: pull back as we go through sections
      const cameraZ = [80, 0, -80]
      const next = cameraZ[Math.min(idx + 1, 2)]
      const cur  = cameraZ[idx]
      const sub  = (progress * 3) % 1
      R.targetZ  = cur + (next - cur) * sub
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Animate text on section change ───────────────────────────
  useEffect(() => {
    if (!titleRef.current || !subRef.current) return
    gsap.fromTo(
      [titleRef.current, subRef.current],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 }
    )
  }, [sectionIdx])

  const s = SECTIONS[sectionIdx]

  return (
    <div ref={outerRef} className={`lh-outer${webgl === false ? ' lh-outer--flat' : ''}`}>
      <div ref={stickyRef} className="lh-sticky">
        {/* Kept mounted until we know: the ref has to exist for three.js to
            attach to. Dropped entirely once we know there is no context. */}
        {webgl !== false && <canvas ref={canvasRef} className="lh-canvas" />}

        <div className="lh-content">
          <p className="lh-eyebrow">Sambhav</p>
          <h2 ref={titleRef} className="lh-word">{s.word}</h2>
          <div ref={subRef} className="lh-sub">
            <p>{s.line1}</p>
            <p>{s.line2}</p>
          </div>
        </div>

        {/* section dots */}
        <div className="lh-dots">
          {SECTIONS.map((_, i) => (
            <span key={i} className={`lh-dot${i === sectionIdx ? ' lh-dot--active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Scene builders ────────────────────────────────────────────

function buildStars(R) {
  for (let layer = 0; layer < 3; layer++) {
    const count = 3000
    const geo = new THREE.BufferGeometry()
    const pos  = new Float32Array(count * 3)
    const col  = new Float32Array(count * 3)
    const sz   = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const r     = 300 + Math.random() * 700
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(Math.random() * 2 - 1)
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i*3+2] = r * Math.cos(phi)

      const c = new THREE.Color()
      const t = Math.random()
      if (t < 0.65)      c.set(C.cream)         // cream stars
      else if (t < 0.85) c.set(C.saffron)        // saffron accent
      else               c.set(C.goldLine)        // gold accent
      col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b

      sz[i] = Math.random() * 1.8 + 0.4
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
    geo.setAttribute('size',     new THREE.BufferAttribute(sz, 1))

    const mat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, depth: { value: layer } },
      vertexShader: `
        attribute float size; attribute vec3 color;
        varying vec3 vColor; uniform float time; uniform float depth;
        void main() {
          vColor = color;
          vec3 p = position;
          float a = time * 0.04 * (1.0 - depth * 0.3);
          mat2 r = mat2(cos(a),-sin(a),sin(a),cos(a));
          p.xz = r * p.xz;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = size * (250.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float o = 1.0 - smoothstep(0.0, 0.5, d);
          gl_FragColor = vec4(vColor, o);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const mesh = new THREE.Points(geo, mat)
    R.scene.add(mesh)
    R.stars.push(mesh)
  }
}

function buildMountains(R) {
  const layers = [
    { z: -30,  h: 55,  color: 0x0a1020 },
    { z: -80,  h: 75,  color: 0x111c2e },
    { z: -130, h: 95,  color: 0x16213a },
    { z: -180, h: 115, color: 0x1c2a48 },
  ]

  layers.forEach(({ z, h, color }) => {
    const pts = []
    const N = 60
    for (let i = 0; i <= N; i++) {
      const x = (i / N - 0.5) * 1200
      const y = Math.sin(i * 0.12) * h
            + Math.sin(i * 0.07) * h * 0.5
            + (Math.random() * h * 0.15) - 120
      pts.push(new THREE.Vector2(x, y))
    }
    pts.push(new THREE.Vector2(600, -400))
    pts.push(new THREE.Vector2(-600, -400))

    const shape = new THREE.Shape(pts)
    const geo   = new THREE.ShapeGeometry(shape)
    const mat   = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
    const mesh  = new THREE.Mesh(geo, mat)
    mesh.position.z = z
    mesh.position.y = 0
    R.scene.add(mesh)
    R.mountains.push(mesh)
  })
}

function buildHorizonGlow(R) {
  const geo = new THREE.PlaneGeometry(2000, 80)
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      col1: { value: new THREE.Color(C.saffron) },
      col2: { value: new THREE.Color(C.terra) },
    },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform vec3 col1; uniform vec3 col2; varying vec2 vUv;
      void main() {
        vec3 c = mix(col1, col2, vUv.x);
        float a = smoothstep(0.0, 0.5, vUv.y) * (1.0 - smoothstep(0.5, 1.0, vUv.y));
        gl_FragColor = vec4(c, a * 0.55);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.set(0, -65, -25)
  R.scene.add(mesh)
}
