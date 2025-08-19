"use client"

import {useTranslations} from "next-intl"
import {
  ShieldCheck,
  BadgeCheck,
  Leaf,
  Sliders,
  Route as RouteIcon
} from "lucide-react"

const ICONS = {
  largeScale: ShieldCheck,
  compliance: BadgeCheck,
  safety: Leaf,
  customization: Sliders,
  logistics: RouteIcon
} as const

// How many bullets each card shows
const BULLETS: Record<keyof typeof ICONS, number> = {
  largeScale: 2,
  compliance: 2,
  safety: 2,
  customization: 2,
  logistics: 3
}

const ORDER = Object.keys(ICONS) as (keyof typeof ICONS)[]

export function Strengths() {
  const t = useTranslations("strengths")

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {t("title")}
      </h2>
      <p className="mt-2 text-muted-foreground">
        {t("subtitle")}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ORDER.map((k) => {
          const Icon = ICONS[k]
          return (
            <div key={k} className="rounded-xl border bg-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <Icon className="h-5 w-5" aria-hidden />
                <h3 className="text-lg font-semibold">
                  {t(`${k}.title`)}
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {Array.from({ length: BULLETS[k] }).map((_, i) => (
                  <li key={i} className="leading-relaxed">
                    • {t(`${k}.bullets.${i + 1}`)}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
