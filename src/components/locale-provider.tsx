"use client"

import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl"
import { ReactNode } from "react"
import { defaultTimeZone } from "@/config/locales"

export function LocaleProvider({
  children,
  messages,
  locale
}: {
  children: ReactNode
  messages: AbstractIntlMessages
  locale: string
}) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale} timeZone={defaultTimeZone}>
      {children}
    </NextIntlClientProvider>
  )
}
