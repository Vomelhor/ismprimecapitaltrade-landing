"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

type Item = { name: string }
type Category = { title: string; items: Item[] }

const DATA: Category[] = [
  {
    title: "Grains & Derivatives",
    items: [
      { name: "Sugar — IC45 (Refined)" },
      { name: "Sugar — IC150 (Crystal)" },
      { name: "Sugar — IC600–1200 (VHP)" },
      { name: "Rice — White (5% broken)" },
      { name: "Rice — Parboiled (Type 1)" },
      { name: "Corn — Yellow GMO" },
      { name: "Corn — Yellow NON-GMO" },
      { name: "Corn — White (GMO)" },
      { name: "Beans — Carioca Brown Type 1" },
      { name: "Beans — Black (Phaseolus Vulgaris L.)" },
      { name: "Beans — White (Cannellini)" },
      { name: "Coffee — Arabica (Roasted)" },
      { name: "Coffee — Robusta (Conilon)" },
      { name: "Coffee — Green (Organic)" },
      { name: "Coffee — Instant (Soluble)" },
      { name: "Soybeans — GMO" },
      { name: "Soybeans — NON-GMO" },
      { name: "Wheat — Flour Type 1" },
      { name: "Wheat — Bran" }
    ]
  },
  {
    title: "Animal Protein",
    items: [
      { name: "Frozen Beef" },
      { name: "Frozen Pork" },
      { name: "Frozen Chicken" }
    ]
  }
]

export function Products() {
  const t = useTranslations("products")

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button size="lg">{t("cta")}</Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DATA.map((cat) => (
          <div key={cat.title} className="rounded-xl border bg-card p-5">
            <h3 className="mb-3 text-lg font-semibold">{cat.title}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {cat.items.map((it) => (
                <li key={it.name} className="leading-relaxed">
                  {it.name}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button variant="secondary" size="sm">{t("cta")}</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
