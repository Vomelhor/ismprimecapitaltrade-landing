// src/app/[locale]/page.tsx
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"

export default function Home() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <Hero />
      <Products />
    </main>
  )
}
