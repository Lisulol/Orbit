type Props = {
  issData?: {
    iss_position?: {
      latitude?: string
      longitude?: string
    }
  }
}

export default function MapContent({ issData }: Props) {
  const latitude = Number(issData?.iss_position?.latitude ?? 0)
  const longitude = Number(issData?.iss_position?.longitude ?? 0)

  if (!latitude && !longitude) {
    return (
      <div
        className="h-full w-full flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      />
    )
  }

  const width = 640
  const height = 360
  const zoom = 4
  const marker = `${latitude},${longitude},red-pushpin`
  const src = `https://staticmap.openstreetmap.de/staticmap.php?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&markers=${marker}`

  return (
    <div className="h-full w-full flex items-center justify-center">
      <img
        src={src}
        alt="ISS Location"
        width={width}
        height={height}
        className="rounded-lg"
      />
    </div>
  )
}
