// src/app/api/rfq/route.ts
import { NextResponse } from "next/server"
import { z } from "zod"
import { sendRFQMail } from "@/lib/email"

const schema = z.object({
  company: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().min(2),

  productGroup: z.string().min(2),
  product: z.string().min(2),
  grade: z.string().optional(),
  gmo: z.enum(["GMO", "NON-GMO"]).optional(),

  quantityMt: z.number().positive(),

  packaging: z.string().optional(),
  incoterm: z.string().optional(),
  destinationPort: z.string().optional(),
  window: z.string().optional(),
  certs: z.string().optional(),
  targetPrice: z.string().optional(),
  notes: z.string().optional(),

  // honeypot, ignored on server
  website: z.string().optional()
})

type RFQInput = z.input<typeof schema>   // what the client could send
type RFQData  = z.output<typeof schema>  // validated/parsed data

export async function POST(req: Request) {
  try {
    const raw = (await req.json()) as unknown

    // Coerce quantity if it comes as a string
    const normalized = (() => {
      const obj = (raw ?? {}) as Record<string, unknown>
      const q = obj.quantityMt
      return {
        ...obj,
        quantityMt:
          typeof q === "string" ? Number(q) :
          typeof q === "number" ? q :
          undefined
      } satisfies Partial<RFQInput>
    })()

    const data: RFQData = schema.parse(normalized)

    // Basic bot check (if a bot filled the honeypot on client)
    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const subject = `RFQ: ${data.product} — ${data.company} (${data.country})`
    const lines = Object.entries(data)
      .filter(([k]) => k !== "website")
      .map(([k, v]) => `${k}: ${String(v ?? "")}`)
      .join("\n")

    await sendRFQMail(subject, lines, lines.replaceAll("\n", "<br/>"))

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "Validation failed", issues: err.flatten() },
        { status: 400 }
      )
    }
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
