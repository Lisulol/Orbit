"use client"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("./map-content" as any), {
  ssr: false,
  loading: () => <div className="text-white">Loading map...</div>,
}) as any

export default function ISS() {
  const [issData, setIssData] = useState<any>(null)

  useEffect(() => {
    fetch(
      "https://api.codetabs.com/v1/proxy?quest=https://api.open-notify.org/iss-now.json"
    )
      .then((res) => res.json())
      .then((data) => setIssData(data))
      .catch(() => {
        setIssData({
          iss_position: { latitude: "51.5074", longitude: "-0.1278" },
          timestamp: Math.floor(Date.now() / 1000),
        })
      })
  }, [])

  if (!issData) return <div className="text-white">Loading ISS data...</div>

  const lat = issData.iss_position.latitude
  const lon = issData.iss_position.longitude

  return (
    <div
      className="h-full flex flex-col w-3/12 rounded-4xl border-2"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <div className="h-3/5 rounded-t-3xl overflow-hidden">
        <Map issData={issData} {...({} as any)} />
      </div>

      <div
        className="h-2/5 w-full flex flex-col text-xs divide-y"
        style={{
          color: "var(--text-primary)",
          borderColor: "var(--border-light)",
        }}
      >
        <p className="flex items-center justify-center p-2">
          ISS Latitude: {lat}°
        </p>
        <p className="flex items-center justify-center p-2">
          ISS Longitude: {lon}°
        </p>
        <p className="flex items-center justify-center p-2">
          Altitude: ~408 km
        </p>
        <p className="flex items-center justify-center p-2">Status: Active</p>
      </div>
    </div>
  )
}
