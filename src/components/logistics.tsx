"use client"

import { Ship, Train } from "lucide-react"

export function Logistics() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <Train className="h-5 w-5" aria-hidden />
            <h3 className="text-lg font-semibold">Rail Integration</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            FIOL, FICO, and the North–South railways connect producing regions to export corridors,
            improving transit times and reducing logistics costs.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <Ship className="h-5 w-5" aria-hidden />
            <h3 className="text-lg font-semibold">Export Ports</h3>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Northern Arc: Barcarena, Itaqui, Santarém</li>
            <li>• Southeast/South: Santos, Paranaguá</li>
            <li>• Incoterms: CIF (growing), FOB, CFR</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
