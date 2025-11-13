"use client"
import { useEffect, useState } from "react"

export default function Mission() {
  const [missions, setMissions] = useState<any[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    fetchMissionData()
  }, [])

  async function fetchMissionData() {
    try {
      const res = await fetch(
        "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10"
      )
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()

      console.log("Missions data:", data)

      setMissions((data.results || []).slice(0, 8))
    } catch (err) {
      console.error("Missions error:", err)
      setError("Failed to load missions")
    }
  }

  return (
    <div className="h-full flex flex-col w-3/12 rounded-4xl border-2 border-[#7e8bfc] bg-[#0b0e2b] p-4 overflow-y-auto">
      <h2 className="text-white font-bold mb-4 border-b border-[#738bfc] pb-2">
        Upcoming Missions
      </h2>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {missions.length === 0 && !error && (
        <p className="text-white text-xs">Loading...</p>
      )}
      <div className="flex gap-y-3 flex-col overflow-hidden">
        {missions.map((mission, index) => (
          <div
            key={index}
            className="flex-row flex gap-x-2 items-center rounded-2xl bg-[#2624a7] text-white text-xs p-2 border-b border-[#738bfc] last:border-b-0"
          >
            <div className="h-2 w-2 rounded-full bg-green-500 animate-blink" />
            <div>
              <p className="font-bold">{mission.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
