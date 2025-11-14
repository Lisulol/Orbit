"use client"
import {
  IconSunHigh,
  IconTemperatureMinus,
  IconTemperaturePlus,
  IconWind,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"

const NASA_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY

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
    <div
      className="overflow-hidden h-full flex flex-col w-3/12 rounded-4xl border-2 p-4 overflow-y-auto"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <div className="flex flex-row h-2/12 w-full items-center justify-center mb-4">
        <span className="bg-clip-text text-transparent bg-linear-to-b from-(--accent-primary) to-(--accent-secondary) text-[20px]">
          Weather on Mars
        </span>
      </div>
      {weatherData && weatherData.sol_keys ? (
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
            Latest Sol: {weatherData.sol_keys.slice(-1)[0]}
            <IconSunHigh />
          </p>
          <p
            className="flex flex-row items-center gap-5 rounded-2xl border p-5 whitespace-nowrap"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-light)",
            }}
          >
            Max Temp: {weatherData[weatherData.sol_keys.slice(-1)[0]].AT.mx}°C{" "}
            <IconTemperaturePlus />
          </p>
          <p
            className="flex flex-row items-center gap-5 rounded-2xl border p-5 whitespace-nowrap"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-light)",
            }}
          >
            Min Temp: {weatherData[weatherData.sol_keys.slice(-1)[0]].AT.mn}°C
            <IconTemperatureMinus />
          </p>
          <p
            className="flex flex-row items-center gap-5 rounded-2xl border p-5 whitespace-nowrap"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-light)",
            }}
          >
            Wind Speed: {weatherData[weatherData.sol_keys.slice(-1)[0]].HWS.av}{" "}
            m/s <IconWind />
          </p>
          <p
            className="flex flex-row items-center gap-5 rounded-2xl border p-5 whitespace-nowrap"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-light)",
            }}
          >
            Pressure: {weatherData[weatherData.sol_keys.slice(-1)[0]].PRE.av} Pa
          </p>
        </div>
      ) : (
        <p className="text-xs" style={{ color: "var(--text-primary)" }}>
          Loading Mars weather data...
        </p>
      )}
    </div>
  )
}
