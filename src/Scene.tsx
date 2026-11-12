import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Tło 3D: „sieć neuronowa" — węzły na sferze połączone krawędziami + pole cząsteczek.
 * Obraca się za kursorem, a przy scrollu odsuwa się i zmienia barwę.
 */
export default function Scene() {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mount.current
    if (!el) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return // brak WebGL — strona działa bez sceny
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 7

    // Węzły sieci: wierzchołki ikosfery lekko rozrzucone
    const ico = new THREE.IcosahedronGeometry(2.2, 2)
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', ico.getAttribute('position').clone())
    const nodeMat = new THREE.PointsMaterial({
      size: 0.055,
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const wire = new THREE.WireframeGeometry(ico)
    const core = new THREE.Group()
    core.add(new THREE.Points(nodeGeo, nodeMat), new THREE.LineSegments(wire, lineMat))

    const innerGeo = new THREE.IcosahedronGeometry(1.1, 1)
    const innerWire = new THREE.WireframeGeometry(innerGeo)
    const innerMat = lineMat.clone()
    innerMat.color.set(0x22d3ee)
    innerMat.opacity = 0.2
    const inner = new THREE.LineSegments(innerWire, innerMat)
    core.add(inner)
    scene.add(core)

    // Pole cząsteczek w tle
    const COUNT = 700
    const pos = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT * 3; i++) pos[i] = (Math.random() - 0.5) * 30
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const starMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xa5b4fc,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    let dim = 1 // na wąskich ekranach scena leży pod tekstem, więc jest ciemniejsza
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el
      renderer.setSize(w, h)
      camera.aspect = w / h
      // na wąskich ekranach scena jest wyśrodkowana, na szerokich przesunięta w prawo
      core.position.x = w / h > 1.1 ? 2.6 : 0
      core.scale.setScalar(w / h > 1.1 ? 1 : 0.8)
      dim = w / h > 1.1 ? 1 : 0.45
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    const target = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cur = { x: 0, y: 0, scroll: 0 }
    const cyan = new THREE.Color(0x67e8f9)
    const pink = new THREE.Color(0xf472b6)
    const clock = new THREE.Clock()
    let raf = 0

    const frame = () => {
      const t = clock.getElapsedTime()
      const max = document.documentElement.scrollHeight - window.innerHeight
      const scroll = max > 0 ? window.scrollY / max : 0
      cur.x += (target.x - cur.x) * 0.05
      cur.y += (target.y - cur.y) * 0.05
      cur.scroll += (scroll - cur.scroll) * 0.08

      core.rotation.y = t * 0.12 + cur.x * 0.7 + cur.scroll * Math.PI * 2
      core.rotation.x = cur.y * 0.5 + cur.scroll * 1.2
      inner.rotation.y = -t * 0.3
      inner.rotation.z = t * 0.2
      core.position.y = -cur.scroll * 1.5
      camera.position.z = 7 + cur.scroll * 3
      stars.rotation.y = t * 0.01 + cur.x * 0.08
      stars.rotation.x = cur.y * 0.05 + cur.scroll * 0.6
      nodeMat.color.lerpColors(cyan, pink, cur.scroll)
      // w dalszych sekcjach scena przygasa, żeby nie przeszkadzać w czytaniu
      const fade = dim * (1 - Math.min(cur.scroll * 2.2, 0.8))
      nodeMat.opacity = 0.95 * fade
      lineMat.opacity = 0.28 * fade
      innerMat.opacity = 0.2 * fade

      renderer.render(scene, camera)
      if (!reduced) raf = requestAnimationFrame(frame)
    }
    frame()
    // przy ograniczonym ruchu: statyczna klatka, odświeżana tylko przy zmianie rozmiaru
    if (reduced) window.addEventListener('resize', frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', frame)
      window.removeEventListener('pointermove', onMove)
      for (const g of [ico, nodeGeo, wire, innerGeo, innerWire, starGeo]) g.dispose()
      for (const m of [nodeMat, lineMat, innerMat, starMat]) m.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mount} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />
}
