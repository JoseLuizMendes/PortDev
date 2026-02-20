import Link from "next/link"

import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { movePinned, togglePinned } from "@/app/admin/_actions/content"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

function kindLabel(kind: string) {
  switch (kind) {
    case "EXPERIENCE":
      return "Experiência"
    case "EDUCATION":
      return "Bacharelado"
    case "COURSE":
      return "Cursos"
    case "PROJECT":
      return "Projetos"
    default:
      return kind
  }
}

export default async function AdminTimelinePage() {
  type TimelineItemRow = {
    id: string
    kind: string
    role: string
    company: string
    summary: string
    pinned: boolean
    pinnedOrder: number | null
  }

  let items: TimelineItemRow[] = []
  let dbNotReady = false

  try {
    items = (await prisma.contentItem.findMany({
      select: {
        id: true,
        kind: true,
        role: true,
        company: true,
        summary: true,
        pinned: true,
        pinnedOrder: true,
      },
      orderBy: [
        { pinned: "desc" },
        { pinnedOrder: "asc" },
        { startYm: "asc" },
        { endYm: "asc" },
        { id: "asc" },
      ],
    })) as unknown as TimelineItemRow[]
  } catch (e: unknown) {
    // Prisma: P2021 => tabela não existe.
    dbNotReady =
      typeof e === "object" &&
      e !== null &&
      "code" in e &&
      (e as { code?: string }).code === "P2021"
    items = []
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Timeline</h2>
          <p className="text-sm text-muted-foreground">
            Aqui você controla pins e conteúdo exibido na timeline pública.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/items/new?kind=EXPERIENCE">Adicionar experiência</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/items/new?kind=EDUCATION">Adicionar formação</Link>
          </Button>
        </div>
      </header>

      <div className="grid gap-4">
        {dbNotReady ? (
          <Card className="border-border/60 bg-card/40">
            <CardHeader className="gap-2">
              <CardTitle>Banco ainda não preparado</CardTitle>
              <p className="text-sm text-muted-foreground">
                Rode a migration e o seed para criar as tabelas e popular seus dados.
              </p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">Comandos:</p>
              <pre className="rounded-md border border-border bg-background p-3 overflow-x-auto text-xs">
pnpm prisma:migrate
pnpm db:seed
              </pre>
              <p className="text-muted-foreground">
                Depois recarregue esta página.
              </p>
            </CardContent>
          </Card>
        ) : null}

        {items.map((item: TimelineItemRow) => (
          <Card key={item.id} className="border-border/60 bg-card/40">
            <CardHeader className="gap-2">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <CardTitle className="text-base md:text-lg">
                    <span className="font-semibold">{item.role}</span>
                    <span className="text-muted-foreground"> · </span>
                    <span className="text-foreground/90">{item.company}</span>
                  </CardTitle>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="subtle" className="rounded-full px-3 py-1">
                      {kindLabel(item.kind)}
                    </Badge>
                    {item.pinned ? (
                      <Badge variant="subtle" className="rounded-full px-3 py-1 text-primary">
                        Fixado #{item.pinnedOrder ?? "—"}
                      </Badge>
                    ) : null}
                  </div>
                </div>

                <div className="shrink-0 flex flex-wrap items-center justify-end gap-2">
                  <form action={togglePinned.bind(null, item.id)}>
                    <Button type="submit" variant={item.pinned ? "secondary" : "outline"}>
                      {item.pinned ? "Desafixar" : "Fixar"}
                    </Button>
                  </form>

                  {item.pinned ? (
                    <>
                      <form action={movePinned.bind(null, item.id, "up")}>
                        <Button type="submit" variant="ghost">
                          Subir
                        </Button>
                      </form>
                      <form action={movePinned.bind(null, item.id, "down")}>
                        <Button type="submit" variant="ghost">
                          Descer
                        </Button>
                      </form>
                    </>
                  ) : null}

                  <Button asChild variant="default">
                    <Link href={`/admin/items/${item.id}`}>Editar</Link>
                  </Button>
                </div>
              </div>

              <Separator className="bg-border/50" />
            </CardHeader>

            <CardContent>
              <p className="text-sm text-foreground/90 leading-relaxed">{item.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
