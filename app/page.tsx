import ISS from "@/components/ISS/iss"
import MarsWeather from "@/components/MarsWeather/marsweather"
import Mission from "@/components/Mission/mission"
import Navbar from "@/components/navbar/navbar"
import Picture from "@/components/Picture/picture"
import { Meteors } from "@/components/ui/shadcn-io/meteors"

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
          </div>
          <div className="flex gap-x-10 items-center h-1/2 w-full">
            <Mission />
            <Picture />
          </div>
        </div>
      </div>
    </div>
  )
}

// --radius: 0.625rem;
//   --background: oklch(89.755% 0.0001 271.152);
//   --border: #7e8bfc;
//   --border-container: #7e8bfc;
//   --bg-components: #8a8a8a;
//   --foreground: oklch(0.129 0.042 264.695);
//   --card: oklch(1 0 0);
//   --text-primatry: oklch(0% 0 0);
//   --card-foreground: oklch(0.129 0.042 264.695);
//   --popover: oklch(1 0 0);
//   --popover-foreground: oklch(0.129 0.042 264.695);
//   --primary: oklch(0.208 0.042 265.755);
//   --primary-foreground:
