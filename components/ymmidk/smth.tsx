import Link from "next/link"

export default function Smth() {
  return (
    <div
      className="h-full flex flex-col w-3/12 rounded-4xl border-2"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <div className="h-full w-full items-center justify-center p-10">
        <Link href="/3D">
          <button
            className="mb-2 p-2  w-full h-15 rounded-2xl text-xs hover:opacity-60"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-light)",
              border: "1px solid",
            }}
          >
            3D Space
          </button>
        </Link>
      </div>
    </div>
  )
}
