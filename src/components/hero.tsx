"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export function Hero() {
  const t = useTranslations("hero")

  return (
    <section className="relative flex min-h-[74vh] items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {t("subtitle")}
        </p>
        <div className="mt-8">
          <Button size="lg">{t("cta")}</Button>
        </div>
      </div>
    </section>
  )
}
