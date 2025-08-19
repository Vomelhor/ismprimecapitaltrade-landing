import { notFound } from "next/navigation"
import { getMessages, setRequestLocale } from "next-intl/server"
import { LocaleProvider } from "@/components/locale-provider"
import { locales } from "@/config/locales"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale as any)) notFound()

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
