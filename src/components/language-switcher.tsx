// src/components/language-switcher.tsx
"use client"

import { useEffect, useState } from "react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { locales, localeLabels } from "@/config/locales"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import type { Route } from "next"

function replaceLocale(pathname: string, nextLocale: string) {
  const parts = pathname.split("/")
  parts[1] = nextLocale
  const nextPath = parts.join("/")
  return nextPath.startsWith("/") ? nextPath : `/${nextPath}`
}

export function LanguageSwitcher() {
  const current = useLocale()
  const pathname = usePathname() || `/${current}`
  const router = useRouter()
  const [query, setQuery] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setQuery(window.location.search) // read once on mount
    }
  }, [])

  function go(nextLocale: string) {
    const nextPath = replaceLocale(pathname, nextLocale)
    const url = query ? `${nextPath}${query}` : nextPath
    router.replace(url as Route)
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
          <DropdownMenuItem key={loc} onClick={() => go(loc)}>
            {localeLabels[loc]} {current === loc ? "✓" : ""}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
