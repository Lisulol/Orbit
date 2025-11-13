import { ShootingStars } from "../ui/shadcn-io/shooting-stars"

export default function Navbar() {
  return (
    <div className=" font-bold text-4xl relative h-20 w-full bg-[#121212] border-b-6 border-[#7e8bfc] flex items-center justify-center px-10">
      <ShootingStars
        starColor="#9E00FF"
        trailColor="#2EB9DF"
        minSpeed={15}
        maxSpeed={15}
        minDelay={16}
        maxDelay={20}
      />
      <div className="flex items-center justify-center flex-col">
        <p className=" bg-clip-text text-transparent bg-linear-to-b from-[#4e63df] to-[#3651e9]">
          Orbit
        </p>
        <p className="text-xs bg-clip-text text-transparent bg-linear-to-b from-[#4e63df] to-[#3651e9]">
          An interactive space tracker
        </p>
      </div>
    </div>
  )
}
