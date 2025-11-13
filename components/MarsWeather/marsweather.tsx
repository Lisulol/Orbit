"use client"
import { useEffect, useState } from "react"

const NASA_KEY = process.env.Next_PUBLIC_NASA_API_KEY

export default function MarsWeather() {
  const [weatherData, setWeatherData] = useState<any>(null)

  useEffect(() => {
    fetchMarsWeather()
  }, [])
  async function fetchMarsWeather() {
    try {
      const res = await fetch(
        `https://api.nasa.gov/insight_weather/?api_key=${NASA_KEY}&feedtype=json&ver=1.0`
      )
      const data = await res.json()
      setWeatherData(data)
    } catch (err) {
      console.error("Mars Weather error:", err)
    }
  }

  return (
    <div className="h-full flex flex-col w-3/12 rounded-4xl border-2 border-[#7e8bfc] bg-[#0b0e2b] p-4 overflow-y-auto">
      Mars Weather Component
      {weatherData && <pre>{JSON.stringify(weatherData, null, 2)}</pre>}
    </div>
  )
}
