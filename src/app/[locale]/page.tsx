import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { Strengths } from "@/components/strengths"
import { Logistics } from "@/components/logistics"
import { RFQForm } from "@/components/rfq-form"
import { WhatsAppFab } from "@/components/whatsapp-fab"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={null}>
        <SiteHeader />
      </Suspense>

      <Hero />
      <Products />
      <Strengths />
      <Logistics />

      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <h2 className="mb-2 text-2xl font-semibold">Request a Quote</h2>
        <p className="mb-6 text-muted-foreground">
          Share your requirements and our team will respond quickly.
        </p>
        <RFQForm />
      </section>

      <WhatsAppFab />
    </main>
  )
}
