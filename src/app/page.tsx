import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="fixed right-4 top-4 z-50">
        <ModeToggle />
      </div>

      <section className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">ISM Prime Capital Trade</h1>
        <p className="text-muted-foreground">Certified Brazilian exports worldwide.</p>
        <Button size="lg">Request a Quote</Button>
      </section>
    </main>
  )
}
