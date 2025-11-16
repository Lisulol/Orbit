"use client"

import { useEffect, useState } from "react"

const N2YO_API_KEY = process.env.NEXT_PUBLIC_N2YO_API_KEY

export default function Fly() {
  const [satelliteData, setSatelliteData] = useState<any>({})
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [mounted, setMounted] = useState(false)

  const SATELLITES = [
    { name: "ISS (ZARYA)", id: 25544 },
    { name: "Hubble Space Telescope", id: 20580 },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          console.log("User denied location permission")
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          console.log("Location data unavailable")
        }

        setLocation({ latitude: 51.5074, longitude: -0.1278 })
      }
    )
  }, [mounted])

  useEffect(() => {
    if (location) {
      fetchSatelliteData(location.latitude, location.longitude)
    }
  }, [location])

  async function fetchSatelliteData(lat: number, lon: number) {
    try {
      const allData: any = {}

      for (const sat of SATELLITES) {
        const apiUrl = `https://api.n2yo.com/rest/v1/satellite/positions/${sat.id}/${lat}/${lon}/0/1?apiKey=${N2YO_API_KEY}`
        const res = await fetch(
          `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(
            apiUrl
          )}`
        )
        const responseText = await res.text()
        const data = JSON.parse(responseText)
        allData[sat.id] = { name: sat.name, data: data }
      }

      setSatelliteData(allData)
      console.log("All satellite data:", allData)
    } catch (err) {
      console.error("Fly error:", err)
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
      <h2
        className="font-bold mb-4 pb-2"
        style={{
          color: "var(--text-primary)",
          borderColor: "var(--border-light)",
          borderBottomWidth: "1px",
        }}
      >
        Visible Satellites
      </h2>
      {Object.keys(satelliteData).length > 0 ? (
        <div className="text-xs" style={{ color: "var(--text-primary)" }}>
          {SATELLITES.map((sat) => {
            const satData = satelliteData[sat.id]
            if (
              !satData ||
              !satData.data.positions ||
              satData.data.positions.length === 0
            )
              return null

            return (
              <div key={sat.id} className="mb-4">
                <p className="font-bold mb-2">{sat.name}</p>
                {satData.data.positions
                  .slice(0, 2)
                  .map((pass: any, idx: number) => (
                    <div
                      key={idx}
                      className="mb-2 p-2 rounded-2xl text-xs"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-light)",
                        border: "1px solid",
                      }}
                    >
                      <p>Pass {idx + 1}</p>
                      <p>Elevation: {pass.elevation}°</p>
                      <p>Azimuth: {pass.azimuth}°</p>
                    </div>
                  ))}
              </div>
            )
          })}
        </div>
      ) : (
        <p style={{ color: "var(--text-primary)" }}>
          Loading satellite data...
        </p>
      )}
    </div>
  )
}
