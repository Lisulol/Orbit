"use client"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import Navbar from "../navbar/navbar"
import { Particles } from "../ui/shadcn-io/particles"
export default function SpaceModel() {
  const [info, setInfo] = useState("")
  const planets = [
    {
      name: "Mercury",
      size: 3.8,
      distance: 30,
      color: 0x8c7853,
      speed: 1.2,
      info: " Closest to Sun \n Temp: 430°C \n Rocky",
    },
    {
      name: "Venus",
      size: 9.5,
      distance: 60,
      color: 0xffc649,
      speed: 0.9,
      info: " Hottest Planet \n Temp: 465°C \n Toxic Atmosphere",
    },
    {
      name: "Earth",
      size: 10,
      distance: 90,
      color: 0x4a90e2,
      speed: 0.6,
      info: " Our Home \n Temp: 15°C \n Water Planet\n Life Here",
    },
    {
      name: "Mars",
      size: 5.3,
      distance: 130,
      color: 0xe27b58,
      speed: 0.45,
      info: " The Red Planet \n Temp: -65°C \n Rocky Surface",
    },
    {
      name: "Jupiter",
      size: 112,
      distance: 260,
      color: 0xd2b48c,
      speed: 0.24,
      info: " Gas Giant \n Strongest Storms \n Great Red Spot \n 95 Moons",
    },
    {
      name: "Saturn",
      size: 94,
      distance: 400,
      color: 0xf5deb3,
      speed: 0.15,
      info: " Iconic Rings\n Gas Giant\n Windy Atmosphere\n 146 Moons",
    },
    {
      name: "Uranus",
      size: 40,
      distance: 560,
      color: 0x7fffd4,
      speed: 0.09,
      info: " Ice Giant\n Temp: -224°C\n Icy Composition\n 27 Moons",
    },
    {
      name: "Neptune",
      size: 39,
      distance: 700,
      color: 0x4169e1,
      speed: 0.06,
      info: " Windiest Planet\n Temp: -200°C\n Supersonic Winds\n< 14 Moons",
    },
  ]

  const containerRef = useRef<HTMLDivElement>(null)
  const onhoverplanet = useRef<string>(null)

  function createPlanetTexture(planet: { name: string; color: number }) {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext("2d")!

    ctx.fillStyle = `#${planet.color.toString(16).padStart(6, "0")}`
    ctx.fillRect(0, 0, 512, 512)

    if (planet.name === "Earth") {
      ctx.fillStyle = "#64C86466"
      ctx.fillRect(50, 100, 150, 100)
      ctx.fillRect(300, 200, 100, 80)
      ctx.fillStyle = "#C8DCFF4D"
      ctx.fillRect(0, 0, 100, 100)
      ctx.fillRect(200, 100, 150, 80)
    }

    if (planet.name === "Jupiter") {
      ctx.fillStyle = "#8B5A2B99"
      for (let i = 50; i < 512; i += 80) {
        ctx.fillRect(0, i, 512, 40)
      }
    }

    if (planet.name === "Saturn") {
      ctx.strokeStyle = "#C8B478B2"
      ctx.lineWidth = 30
      ctx.beginPath()
      ctx.ellipse(256, 256, 200, 100, 0, 0, Math.PI * 2)
      ctx.stroke()
    }

    ctx.fillStyle = "#FFFFFF33"
    for (let i = 0; i < 10; i++) {
      ctx.beginPath()
      ctx.arc(
        Math.random() * 512,
        Math.random() * 512,
        Math.random() * 15,
        0,
        Math.PI * 2
      )
      ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
  }

  useEffect(() => {
    const raycast = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      50000
    )
    camera.position.z = 500
    camera.position.y = 300
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 1)
    renderer.domElement.style.pointerEvents = "auto"
    containerRef.current?.appendChild(renderer.domElement)

    renderer.domElement.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    })

    const sunGeometry = new THREE.SphereGeometry(20, 32, 32)
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xfdb813 })
    const sun = new THREE.Mesh(sunGeometry, sunMaterial)
    scene.add(sun)

    const light = new THREE.PointLight(0xffffff, 2, 10000)
    light.position.set(0, 0, 0)
    scene.add(light)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const planetMeshes = planets.map((planet) => {
      const geometry = new THREE.SphereGeometry(planet.size / 2, 64, 64)
      const texture = createPlanetTexture(planet)
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.7,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = planet.distance
      scene.add(mesh)

      return { mesh, ...planet }
    })

    let previouslyHovered: THREE.Mesh | null = null

    function animate() {
      requestAnimationFrame(animate)
      raycast.setFromCamera(mouse, camera)

      planetMeshes.forEach((planet) => {
        const angle = Date.now() * planet.speed * 0.0001
        planet.mesh.position.x = planet.distance * Math.cos(angle)
        planet.mesh.position.z = planet.distance * Math.sin(angle)
        planet.mesh.rotation.y += 0.08
      })

      const intersects = raycast.intersectObjects(
        planetMeshes.map((p) => p.mesh),
        true
      )

      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object as THREE.Mesh
        const hoveredPlanet = planetMeshes.find((p) => p.mesh === hoveredMesh)
        if (hoveredPlanet) {
          hoveredMesh.scale.set(1.2, 1.2, 1.2)
          previouslyHovered = hoveredMesh

          if (onhoverplanet.current !== hoveredPlanet.name) {
            onhoverplanet.current = hoveredPlanet.name
            setInfo(`${hoveredPlanet.name}\n\n${hoveredPlanet.info}`)
          }
        }
      } else {
        if (previouslyHovered) {
          previouslyHovered.scale.set(1, 1, 1)
          previouslyHovered = null

          if (onhoverplanet.current !== null) {
            onhoverplanet.current = null
            setInfo("")
          }
        }
      }

      renderer.render(scene, camera)
    }
    animate()

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
    }
  }, [])
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div
        ref={containerRef}
        className="w-screen h-screen absolute top-0 left-0"
      ></div>

      <nav className="fixed z-50 top-0 w-full pointer-events-auto">
        <Navbar />
      </nav>

      {info && (
        <div
          className="fixed z-40 bottom-10 left-5 text-sm px-5 py-4 rounded-4xl whitespace-pre-line pointer-events-auto"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-light)",
            color: "var(--text-primary)",
            border: "2px solid var(--border-light)",
          }}
        >
          {info}
        </div>
      )}

      <Link href="/" className="fixed z-40 top-28 left-5 pointer-events-auto">
        <button
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-light)",
            color: "var(--text-primary)",
            border: "2px solid",
          }}
          className="px-4 py-2 rounded-4xl hover:opacity-60"
        >
          Back
        </button>
      </Link>

      <Particles
        className="absolute inset-0 pointer-events-none"
        quantity={100}
        ease={80}
        staticity={50}
        color="#ffffff"
        size={0.8}
      />
    </div>
  )
}
