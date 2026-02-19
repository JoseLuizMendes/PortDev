import Link from "next/link"

import { logoutAdmin } from "@/app/admin/_actions/auth"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card/40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">Painel</p>
            <h1 className="text-xl font-semibold">Admin</h1>
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <Link href="/admin/timeline" className="text-foreground/90 hover:text-foreground">
              Timeline
            </Link>
            <Link href="/admin/items/new?kind=EXPERIENCE" className="text-foreground/90 hover:text-foreground">
              Novo item
            </Link>
            <form action={logoutAdmin}>
              <Button type="submit" variant="ghost" size="sm">
                Sair
              </Button>
            </form>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
