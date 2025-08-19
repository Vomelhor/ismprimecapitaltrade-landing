import { getRequestConfig } from "next-intl/server"
import type { AbstractIntlMessages } from "next-intl"
import { locales, defaultLocale, type Locale, defaultTimeZone } from "@/config/locales"

export default getRequestConfig(async ({ locale }) => {
  const input = (locale ?? defaultLocale) as string
  const finalLocale: Locale = (locales as readonly string[]).includes(input)
    ? (input as Locale)
    : defaultLocale

  // Strongly type messages
  let messages: AbstractIntlMessages
  try {
    messages = (await import(`@/messages/${finalLocale}.json`)).default as AbstractIntlMessages
  } catch {
    messages = (await import(`@/messages/${defaultLocale}.json`)).default as AbstractIntlMessages
  }

  return {
    locale: finalLocale,
    messages,
    timeZone: defaultTimeZone
  }
})
