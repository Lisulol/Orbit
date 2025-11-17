import type { NextConfig } from "next"

// Read base path from env so we can build for GitHub Pages subpath (e.g. /Orbit)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

const nextConfig: NextConfig = {
  // When deploying to a repository page under a subpath (username.github.io/RepoName)
  // set NEXT_PUBLIC_BASE_PATH=/RepoName in CI so Next emits correct asset paths.
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
}

export default nextConfig
