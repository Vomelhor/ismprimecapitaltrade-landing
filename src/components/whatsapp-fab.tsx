"use client"

import { MessageCircle } from "lucide-react"

const phone = process.env.NEXT_PUBLIC_WHATSAPP || "00000000000" // intl format, e.g., 5511999999999

export function WhatsAppFab() {
  const href = `https://wa.me/${phone}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border bg-card shadow-lg transition hover:scale-105"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}
