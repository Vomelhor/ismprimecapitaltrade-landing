import { notFound } from "next/navigation"
import { getMessages, setRequestLocale } from "next-intl/server"
import { LocaleProvider } from "@/components/locale-provider"
import { locales } from "@/config/locales"
import type { Locale } from "@/config/locales"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// ✅ Type guard: no `any`
function isLocale(input: string): input is Locale {
  return (locales as readonly string[]).includes(input)
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <LocaleProvider messages={messages} locale={locale}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  )
}
