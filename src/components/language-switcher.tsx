"use client"

import { useLocale } from "next-intl"
import type { Route } from "next" 
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { locales, localeLabels } from "@/config/locales"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

function replaceLocale(pathname: string, nextLocale: string) {
  // Assumes pathnames like /en/... , /pt/... etc.
  const parts = pathname.split("/")
  parts[1] = nextLocale
  const nextPath = parts.join("/")
  return nextPath.startsWith("/") ? nextPath : `/${nextPath}`
}

export function LanguageSwitcher() {
  const current = useLocale()
  const pathname = usePathname() || `/${current}`
  const search = useSearchParams()
  const router = useRouter()

  function go(nextLocale: string) {
    const nextPath = replaceLocale(pathname, nextLocale)
    const qs = search?.toString()
    const url = qs ? `${nextPath}?${qs}` : nextPath
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
