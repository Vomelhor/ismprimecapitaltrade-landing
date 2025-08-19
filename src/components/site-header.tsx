"use client"

import { useLocale } from "next-intl"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ModeToggle } from "@/components/mode-toggle"
import { Suspense } from "react"

export function SiteHeader() {
  const locale = useLocale()
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-foreground" aria-hidden />
          <span className="font-semibold tracking-tight">ISM Prime Capital Trade</span>
          <span className="ml-2 text-xs text-muted-foreground uppercase">{locale}</span>
        </div>
        <div className="flex items-center gap-2">
          <Suspense fallback={null}>
            <LanguageSwitcher />
          </Suspense>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
