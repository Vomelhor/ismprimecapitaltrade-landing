export const locales = ["en", "pt", "es", "zh"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

export const localeLabels: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  es: "Español",
  zh: "中文"
}
