"use client"

import { useEffect, useState, startTransition } from "react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { locales, localeLabels } from "@/config/locales"
import type { Locale } from "@/config/locales"
import { stripBasePath, withBasePath } from "@/lib/base-path"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import type { Route } from "next"

// Type guard to avoid `as any`
function isKnownLocale(input: string): input is Locale {
  return (locales as readonly string[]).includes(input)
}

function swapLocaleInPath(strippedPath: string, nextLocale: Locale) {
  const parts = strippedPath.split("/")
  const currentSeg = parts[1] ?? ""
  if (isKnownLocale(currentSeg)) {
    parts[1] = nextLocale
  } else {
    parts.splice(1, 0, nextLocale)
  }
  const nextPath = parts.join("/")
  return nextPath.startsWith("/") ? nextPath : `/${nextPath}`
}

export function LanguageSwitcher() {
  const current = useLocale() as Locale
  const pathname = usePathname() || `/${current}`
  const router = useRouter()
  const [query, setQuery] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") setQuery(window.location.search || "")
  }, [])

  function go(nextLocale: Locale) {
    if (nextLocale === current) return
    const stripped = stripBasePath(pathname)
    const nextStripped = swapLocaleInPath(stripped, nextLocale)
    const url = withBasePath(nextStripped) + (query || "")

    startTransition(() => {
      try {
        router.push(url as unknown as Route)
        router.refresh()
      } catch {
        window.location.assign(url)
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Change language">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem key={loc} onClick={() => go(loc as Locale)}>
            {localeLabels[loc as Locale]} {current === (loc as Locale) ? "✓" : ""}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
