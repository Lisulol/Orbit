"use client"
import { useEffect, useState } from "react"

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY

export default function NEO() {
  const [neoData, setNeoData] = useState<any>(null)

  useEffect(() => {
    fetchNEOData()
  }, [])
  async function fetchNEOData() {
    try {
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=${NASA_API_KEY}`
      )
      const data = await res.json()
      setNeoData(data)
    } catch (err) {
      console.error("NEO error:", err)
      return null
    }
  }
  return (
    <div
      className="h-full flex flex-col w-3/12 rounded-4xl border-2 p-4 overflow-y-auto"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <div className="flex flex-row h-2/12 w-full items-center justify-center mb-4">
        <span className="bg-clip-text text-transparent bg-linear-to-b from-(--accent-primary) to-(--accent-secondary) text-[20px]">
          Near Earth Object
        </span>
      </div>
      {neoData ? (
        <div
          className="text-xs font-bold flex flex-col gap-2 overflow-x-auto"
          style={{ color: "var(--text-primary)" }}
        >
          <p
            className="flex flex-row items-center gap-5 rounded-2xl border p-5 whitespace-nowrap"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-light)",
            }}
          >
            Name: {neoData.name}
          </p>
          <p
            className="flex flex-row items-center gap-5 rounded-2xl border p-5 whitespace-nowrap"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-light)",
            }}
          >
            Absolute Magnitude: {neoData.absolute_magnitude_h}
          </p>
          <p
            className="flex flex-row items-center gap-5 rounded-2xl border p-5 whitespace-nowrap"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-light)",
            }}
          >
            Is Potentially Hazardous:{" "}
            {neoData.is_potentially_hazardous_asteroid ? "Yes" : "No"}
          </p>
        </div>
      ) : (
        <p className="text-xs" style={{ color: "var(--text-primary)" }}>
          Loading Near Earth Object data...
        </p>
      )}
    </div>
  )
}
