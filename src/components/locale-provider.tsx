"use client"

import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl"
import { ReactNode } from "react"

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
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  )
}
