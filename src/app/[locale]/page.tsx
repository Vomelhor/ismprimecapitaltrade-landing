import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={null}>
        <SiteHeader />
      </Suspense>
      <Hero />
      <Products />
    </main>
  )
}
