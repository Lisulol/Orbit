"use client"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"

export default function MapContent({ issData }: { issData: any }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  if (!isReady)
    return (
      <div
        className="h-full w-full"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      />
    )

  const lat = parseFloat(issData.iss_position.latitude)
  const lon = parseFloat(issData.iss_position.longitude)

  // Use a default color that works for both themes
  const borderColor = "#7e8bfc"

  const markerIcon = L.divIcon({
    html: `<div style="width:20px;height:20px;background:${borderColor};border-radius:50%;border:2px solid white;"></div>`,
    iconSize: [20, 20],
    className: "iss-marker",
  })

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={4}
      className="h-full w-full"
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lon]} icon={markerIcon}>
        <Popup>ISS Location</Popup>
      </Marker>
    </MapContainer>
  )
}
