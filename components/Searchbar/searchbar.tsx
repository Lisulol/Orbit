"use client"
import { useEffect, useState } from "react"

const SOLAR_SYSTEM_PLANETS = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
]

export default function Searchbar() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isOpen, setisOpen] = useState(false)

  const isPlanetOrExoplanet = (title: string) => {
    if (SOLAR_SYSTEM_PLANETS.some((planet) => title.includes(planet))) {
      return true
    }

    if (title.includes("Planet") || title.includes("Exoplanet")) {
      return true
    }
    return false
  }

  async function fetchPlanetData(query: any) {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`
      )
      const data = await response.json()
      if (isPlanetOrExoplanet(data.title)) {
        setResult(data)
        setisOpen(true)
        console.log("Planet data:", data)
      }
    } catch (err) {
      console.log("Error fetching planets:", err)
    }
  }
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Enter") {
        fetchPlanetData(query)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [query])
  function handleChange(e: any) {
    setQuery(e.target.value)
  }

  return (
    <div>
      <input
        className="rounded-2xl p-2  h-15 w-full"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-light)",
          border: "1px solid",
        }}
        placeholder="query..."
        value={query}
        onChange={handleChange}
      ></input>
      {isOpen && result && (
        <div
          className="h-screen w-screen fixed flex items-center justify-center inset-0"
          style={{ zIndex: 9999, backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          onClick={() => setisOpen(false)}
        >
          <div
            className="h-4/5 w-4/5 rounded-4xl p-10 flex flex-col gap-4 overflow-auto"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-light)",
              color: "var(--text-primary)",
              border: "2px solid",
              zIndex: 10000,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <p
                className="font-bold text-2xl"
                style={{ color: "var(--text-primary)" }}
              >
                {result.title}
              </p>
              <span className="text-sm px-3 py-1 rounded bg-blue-500 text-white">
                {result.title.includes("Exoplanet") ? "Exoplanet" : "Planet"}
              </span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-primary)" }}>
              {result.extract}
            </p>
            {result.thumbnail && result.thumbnail.source && (
              <img
                src={result.thumbnail.source}
                alt={result.title}
                className="rounded-lg w-full h-64 object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
