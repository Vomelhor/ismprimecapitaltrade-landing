export type ThemeMode = "light" | "dark" | "system"

const STORAGE_KEY = "theme"

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  const systemPrefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  const effectiveDark = mode === "dark" || (mode === "system" && systemPrefersDark)
  root.classList.toggle("dark", effectiveDark)
}

export function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "system"
  const v = window.localStorage.getItem(STORAGE_KEY)
  return (v as ThemeMode) || "system"
}

export function setStoredTheme(mode: ThemeMode) {
  window.localStorage.setItem(STORAGE_KEY, mode)
}
