import {getRequestConfig} from "next-intl/server"

const supported = ["en", "pt", "es", "zh"] as const
type Supported = (typeof supported)[number]

export default getRequestConfig(async ({locale}) => {
  const input = (locale ?? "en") as string
  const finalLocale: Supported = (supported as readonly string[]).includes(input)
    ? (input as Supported)
    : "en"

  const messages = (await import(`@/messages/${finalLocale}.json`)).default

  return {
    locale: finalLocale,
    messages
  }
})
