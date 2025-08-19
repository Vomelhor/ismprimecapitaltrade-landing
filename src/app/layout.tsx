// src/app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ISM Prime Capital Trade",
  description: "Brazilian commodities & animal protein, delivered worldwide."
}

const noFlashScript = `
(() => {
  try {
    const s = localStorage.getItem("theme");
    const m = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = s === "dark" || ((!s || s === "system") && m);
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
  } catch {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
