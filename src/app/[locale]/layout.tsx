// src/app/[locale]/layout.tsx
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import type { AbstractIntlMessages } from "next-intl"
import { LocaleProvider } from "@/components/locale-provider"
import { locales } from "@/config/locales"
import type { Locale } from "@/config/locales"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

function isLocale(input: string): input is Locale {
  return (locales as readonly string[]).includes(input)
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  // Next 15: params is a Promise
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  // Tell next-intl the active locale (for formatting, dates, etc.)
  setRequestLocale(locale)

  // ✅ Load messages directly from your JSON files based on the URL segment
  const messages: AbstractIntlMessages = (
    await import(`@/messages/${locale}.json`)
  ).default

  // NOTE: Root <html>/<body> live in src/app/layout.tsx
  return (
    <LocaleProvider messages={messages} locale={locale}>
      {children}
    </LocaleProvider>
  )
}
