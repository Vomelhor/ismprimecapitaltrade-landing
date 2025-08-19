"use client"

import { useEffect } from "react"
import { withBasePath } from "@/lib/base-path"
import { defaultLocale } from "@/config/locales"

export default function RootRedirect() {
  useEffect(() => {
    window.location.replace(withBasePath(`/${defaultLocale}`))
  }, [])
  return null
}
