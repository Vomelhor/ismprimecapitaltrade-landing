"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { applyTheme, getStoredTheme, setStoredTheme, type ThemeMode } from "@/lib/theme"

export function ModeToggle() {
  const [mode, setMode] = useState<ThemeMode>("system")

  useEffect(() => {
    const initial = getStoredTheme()
    setMode(initial)
    applyTheme(initial)
  
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      // ✅ Re-read current preference from storage
      const current = getStoredTheme()
      if (current === "system") applyTheme("system")
    }
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])  

  function select(m: ThemeMode) {
    setMode(m)
    setStoredTheme(m)
    applyTheme(m)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => select("light")}>
          <Sun className="mr-2 h-4 w-4" /> Light {mode === "light" ? "✓" : ""}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => select("dark")}>
          <Moon className="mr-2 h-4 w-4" /> Dark {mode === "dark" ? "✓" : ""}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => select("system")}>
          <Laptop className="mr-2 h-4 w-4" /> System {mode === "system" ? "✓" : ""}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
