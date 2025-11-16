"use client"
import { useEffect, useState } from "react"

export default function Meteor() {
  const meteorshowers = [
    { name: "Quadrantids", month: 1, peakStart: 3, peakEnd: 4, zhR: 40 },
    { name: "Lyrids", month: 4, peakStart: 22, peakEnd: 23, zhR: 18 },
    { name: "Eta Aquariids", month: 5, peakStart: 6, peakEnd: 7, zhR: 50 },
    { name: "Delta Aquariids", month: 7, peakStart: 29, peakEnd: 30, zhR: 20 },
    { name: "Perseids", month: 8, peakStart: 11, peakEnd: 13, zhR: 100 },
    { name: "Draconids", month: 10, peakStart: 8, peakEnd: 9, zhR: 10 },
    { name: "Orionids", month: 10, peakStart: 20, peakEnd: 21, zhR: 10 },
    { name: "Leonids", month: 11, peakStart: 17, peakEnd: 18, zhR: 15 },
    { name: "Geminids", month: 12, peakStart: 13, peakEnd: 14, zhR: 150 },
    { name: "Ursids", month: 12, peakStart: 22, peakEnd: 23, zhR: 10 },
  ]
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  return (
    <div
      className="h-full flex flex-col w-3/12 rounded-4xl border-2 p-4 overflow-y-auto"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <p className="flex items-center justify-center h-1/12" style={{}}>
        <span className="bg-clip-text text-transparent bg-linear-to-b from-(--accent-primary) to-(--accent-secondary) text-[20px]">
          Meteor Showers
        </span>
      </p>
      <div className="grid grid-cols-2 gap-2">
        {monthNames.map((month, index) => {
          const showrs = meteorshowers.filter((s) => s.month === index + 1)

          return (
            <div
              key={month}
              className="border rounded-2xl p-3 text-xs overflow-hidden"
              style={{
                borderColor: "var(--border-light)",
                backgroundColor: "var(--bg-card)",
              }}
            >
              <p
                style={{ color: "var(--text-primary)" }}
                className="font-bold text-xs"
              >
                {month}
              </p>
              {showrs.map((shower) => (
                <p
                  key={shower.name}
                  style={{ color: "var(--text-secondary)" }}
                  className="text-xs truncate"
                >
                  {shower.name}
                </p>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
