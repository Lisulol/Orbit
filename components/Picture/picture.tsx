"use client"
import { useEffect, useState } from "react"

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY
export default function Picture() {
  const [PictureData, setPictureData] = useState<any>(null)

  useEffect(() => {
    fetchPictureData()
  }, [])

  async function fetchPictureData() {
    try {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
      )
      const data = await res.json()
      setPictureData(data)
    } catch (err) {
      console.error("Picture error:", err)
      return null
    }
  }
  return (
    <div
      className="h-full flex flex-col w-3/12 rounded-4xl border-2 p-4 overflow-visible"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      {PictureData && PictureData.url ? (
        <img
          src={PictureData.url}
          alt={PictureData.title}
          className="w-full h-2/3 object-cover rounded-2xl mb-4"
        />
      ) : (
        <p className="text-xs" style={{ color: "var(--text-primary)" }}>
          Loading Picture of the Day...
        </p>
      )}
      {PictureData && (
        <div
          className="text-xs font-bold flex flex-col gap-2 overflow-visible"
          style={{ color: "var(--text-primary)" }}
        >
          <p
            className="flex flex-row items-center gap-5 rounded-2xl border p-5 whitespace-nowrap"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-light)",
            }}
          >
            {PictureData.title}
          </p>
          <p
            className="relative group flex flex-row items-center gap-5 rounded-2xl border p-5 whitespace-nowrap"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-light)",
            }}
          >
            {PictureData.explanation.slice(0, 20)}...
            <span
              className="absolute opacity-0 group-hover:opacity-100 transition-opacity rounded-4xl border p-5 text-xs whitespace-normal z-999 top-0 left-0 w-55 -mt-102"
              style={{
                backgroundColor: "var(--bg-card)",
                color: "var(--text-primary)",
                borderColor: "var(--border-light)",
              }}
            >
              {PictureData.explanation}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
