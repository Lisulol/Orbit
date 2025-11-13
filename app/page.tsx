import ISS from "@/components/ISS/iss"
import MarsWeather from "@/components/MarsWeather/marsweather"
import Mission from "@/components/Mission/mission"
import Navbar from "@/components/navbar/navbar"
import { Meteors } from "@/components/ui/shadcn-io/meteors"

export default function DashBoard() {
  return (
    <div className="relative bg-[#141b33] h-screen w-full overflow-hidden">
      <Meteors number={15} />
      <div className="fixed z-99 w-full">
        <Navbar />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full w-full">
        <div className="p-15 h-11/12 w-11/12 bg-[#0f1529] rounded-4xl border-4 gap-y-5 border-[#040f1a] flex flex-col">
          <div className="flex gap-x-10 items-center h-1/2 w-full">
            <ISS />
            <MarsWeather />
          </div>
          <div className="flex items-center h-1/2 w-full">
            <Mission />
          </div>
        </div>
      </div>
    </div>
  )
}
