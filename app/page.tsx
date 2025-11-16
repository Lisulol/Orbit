import SpaceModel from "@/components/3D-Model/space"
import Fly from "@/components/Fly/fly"
import ISS from "@/components/ISS/iss"
import MarsWeather from "@/components/MarsWeather/marsweather"
import Meteor from "@/components/Meteor/meteor"
import Mission from "@/components/Mission/mission"
import Navbar from "@/components/navbar/navbar"
import NEO from "@/components/neo/neo"
import Picture from "@/components/Picture/picture"
import { Meteors } from "@/components/ui/shadcn-io/meteors"
import Smth from "@/components/ymmidk/smth"

export default function DashBoard() {
  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <Meteors number={15} />
      <div className="fixed z-999 top-0 w-full pointer-events-none">
        <Navbar />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full w-full">
        <div
          className="p-15 h-11/12 w-11/12 rounded-4xl border-4 gap-y-5 flex flex-col"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex gap-x-10 items-center h-1/2 w-full">
            <ISS />
            <MarsWeather />
            <NEO />
            <Meteor />
          </div>
          <div className="flex gap-x-10 items-center h-1/2 w-full">
            <Mission />
            <Picture />
            <Fly />
            <Smth />
          </div>
        </div>
      </div>
    </div>
  )
}
