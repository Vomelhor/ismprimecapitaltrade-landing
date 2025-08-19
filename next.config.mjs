// next.config.mjs
import createNextIntlPlugin from "next-intl/plugin"
const withNextIntl = createNextIntlPlugin()

const isExport = process.env.NEXT_EXPORT === "true"
const base = process.env.NEXT_PUBLIC_BASE_PATH || ""

export default withNextIntl({
  experimental: { typedRoutes: true },
  // Só usa export no Pages
  output: isExport ? "export" : undefined,
  images: { unoptimized: isExport }, // se algum dia usar next/image
  basePath: isExport && base ? base : undefined,
  assetPrefix: isExport && base ? base : undefined
})
