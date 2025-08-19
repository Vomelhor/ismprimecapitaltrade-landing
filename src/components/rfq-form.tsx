"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import {
  useForm,
  type SubmitHandler
} from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const schema = z.object({
  company: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().min(2),

  productGroup: z.string().min(2),
  product: z.string().min(2),
  grade: z.string().optional(),
  gmo: z.string().optional(),

  // Input can be string; will be coerced to number by schema
  quantityMt: z.coerce.number().positive(),

  packaging: z.string().optional(),
  incoterm: z.string().optional(),
  destinationPort: z.string().optional(),
  window: z.string().optional(),
  certs: z.string().optional(),
  targetPrice: z.string().optional(),
  notes: z.string().optional(),

  // Honeypot (bots fill this; humans don't)
  website: z.string().optional()
})

// Use INPUT type for the form, OUTPUT for parsed payload
type RFQInput = z.input<typeof schema>
type RFQData = z.output<typeof schema>

export function RFQForm() {
  const t = useTranslations("rfq")
  const [sent, setSent] = useState<"idle" | "ok" | "error">("idle")

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<RFQInput>({
    resolver: zodResolver(schema), // no generics here – lets zod infer properly
    defaultValues: {
      productGroup: "",
      gmo: ""
    }
  })

  const DEMO = process.env.NEXT_PUBLIC_DEMO === "true"

  const onSubmit: SubmitHandler<RFQInput> = async (values) => {
    setSent("idle")
    if (values.website && values.website.trim()) { setSent("ok"); reset({productGroup:"", gmo:""}); return }
  
    if (DEMO) {
      // simula sucesso no Pages (sem backend)
      setTimeout(() => { setSent("ok"); reset({productGroup:"", gmo:""}) }, 400)
      return
    }
  
    const payload: RFQData = schema.parse(values)
    const res = await fetch("/api/rfq", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) })
    setSent(res.ok ? "ok" : "error")
    if (res.ok) reset({productGroup:"", gmo:""})
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Hidden fields so RHF tracks Select-managed values */}
      <input type="hidden" {...register("productGroup")} />
      <input type="hidden" {...register("gmo")} />
      {/* Honeypot (keep name="website") */}
      <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="company">{t("company")}</Label>
          <Input id="company" {...register("company")} aria-invalid={!!errors.company} />
          {errors.company && <p className="mt-1 text-sm text-red-500">{t("required")}</p>}
        </div>

        <div>
          <Label htmlFor="name">{t("name")}</Label>
          <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className="mt-1 text-sm text-red-500">{t("required")}</p>}
        </div>

        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="mt-1 text-sm text-red-500">{t("required")}</p>}
        </div>

        <div>
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input id="phone" {...register("phone")} />
        </div>

        <div>
          <Label htmlFor="country">{t("country")}</Label>
          <Input id="country" {...register("country")} aria-invalid={!!errors.country} />
          {errors.country && <p className="mt-1 text-sm text-red-500">{t("required")}</p>}
        </div>

        <div>
          <Label>{t("productGroup")}</Label>
          <Select onValueChange={(v) => setValue("productGroup", v, { shouldValidate: true })}>
            <SelectTrigger>
              <SelectValue placeholder={t("choose")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Grains">{t("grains")}</SelectItem>
              <SelectItem value="Animal Protein">{t("animalProtein")}</SelectItem>
            </SelectContent>
          </Select>
          {errors.productGroup && <p className="mt-1 text-sm text-red-500">{t("required")}</p>}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="product">{t("product")}</Label>
          <Input
            id="product"
            {...register("product")}
            placeholder="Sugar IC45, Rice 5%, Beef, Soybeans..."
            aria-invalid={!!errors.product}
          />
          {errors.product && <p className="mt-1 text-sm text-red-500">{t("required")}</p>}
        </div>

        <div>
          <Label htmlFor="grade">{t("grade")}</Label>
          <Input id="grade" {...register("grade")} placeholder="IC45 / VHP / 5% Broken / etc." />
        </div>

        <div>
          <Label>{t("gmo")}</Label>
          <Select onValueChange={(v) => setValue("gmo", v)}>
            <SelectTrigger>
              <SelectValue placeholder={t("choose")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GMO">GMO</SelectItem>
              <SelectItem value="NON-GMO">NON-GMO</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="quantityMt">{t("quantityMt")}</Label>
          <Input
            id="quantityMt"
            type="number"
            step="any"
            inputMode="decimal"
            {...register("quantityMt")}
            aria-invalid={!!errors.quantityMt}
          />
          {errors.quantityMt && <p className="mt-1 text-sm text-red-500">{t("required")}</p>}
        </div>

        <div>
          <Label htmlFor="packaging">{t("packaging")}</Label>
          <Input id="packaging" {...register("packaging")} placeholder="Bulk, Big Bag, 50kg, Vacuum, Reefer..." />
        </div>

        <div>
          <Label htmlFor="incoterm">{t("incoterm")}</Label>
          <Input id="incoterm" {...register("incoterm")} placeholder="CIF / FOB / CFR / DAP" />
        </div>

        <div>
          <Label htmlFor="destinationPort">{t("destinationPort")}</Label>
          <Input id="destinationPort" {...register("destinationPort")} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="window">{t("window")}</Label>
          <Input id="window" {...register("window")} placeholder="e.g., 2025-10 / Nov–Dec" />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="certs">{t("certs")}</Label>
          <Input id="certs" {...register("certs")} placeholder="RTRS, Halal, Non-GMO, HACCP..." />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="targetPrice">{t("targetPrice")}</Label>
          <Input id="targetPrice" {...register("targetPrice")} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="notes">{t("notes")}</Label>
          <Textarea id="notes" rows={4} {...register("notes")} />
        </div>
      </div>

      <Button disabled={isSubmitting} size="lg">
        {isSubmitting ? t("sending") : t("submit")}
      </Button>

      {sent === "ok" && <p className="pt-2 text-green-600">{t("success")}</p>}
      {sent === "error" && <p className="pt-2 text-red-600">{t("error")}</p>}
    </form>
  )
}
