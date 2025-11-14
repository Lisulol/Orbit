"use client"
import { ShootingStars } from "../ui/shadcn-io/shooting-stars"
import { IconBrandGithub, IconMoon, IconSun } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  function ChangeTheme() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div
      className="font-bold text-4xl relative h-20 w-full border-gradient flex items-center justify-center px-10"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <ShootingStars
        starColor="#9E00FF"
        trailColor="#2EB9DF"
        minSpeed={15}
        maxSpeed={15}
        minDelay={16}
        maxDelay={20}
      />
      <div className="flex items-center justify-between flex-row w-full">
        <div
          onClick={ChangeTheme}
          className="cursor-pointer pointer-events-auto"
          style={{ color: "var(--text-primary)" }}
        >
          {theme === "dark" ? <IconSun size={24} /> : <IconMoon size={24} />}
        </div>
        <div className="items-center justify-center flex flex-col">
          <p className="bg-clip-text text-transparent bg-linear-to-b from-(--accent-primary) to-(--accent-secondary)">
            Orbit
          </p>
          <p className="text-xs bg-clip-text text-transparent bg-linear-to-b from-(--accent-primary) to-(--accent-secondary)">
            An interactive space tracker
          </p>
        </div>
        <div
          style={{ color: "var(--text-primary)" }}
          className="pointer-events-auto"
        >
          <a target={"_blank"} href={"https://github.com/Lisulol"}>
            <IconBrandGithub size={24} />
          </a>
        </div>
      </div>
    </div>
  )
}
