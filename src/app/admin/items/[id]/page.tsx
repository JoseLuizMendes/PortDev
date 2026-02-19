import { notFound } from "next/navigation"

import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { deleteContentItem, updateContentItem } from "@/app/admin/_actions/content"

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

function toLines(value: unknown) {
  if (!Array.isArray(value)) return ""
  return value.filter((v) => typeof v === "string").join("\n")
}

export default async function EditItemPage({ params }: { params: { id: string } }) {
  const { id } = params
  const item = await prisma.contentItem.findUnique({ where: { id } })
  if (!item) notFound()

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Editando</p>
          <h2 className="text-2xl font-semibold">{kindLabel(item.kind)}</h2>
        </div>

        <form action={deleteContentItem.bind(null, item.id)}>
          <Button type="submit" variant="destructive">
            Excluir
          </Button>
        </form>
      </header>

      <Card className="border-border/60 bg-card/40">
        <CardHeader>
          <CardTitle>Detalhes</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateContentItem.bind(null, item.id)} className="grid gap-4">
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground">Tipo</span>
              <div className="h-10 rounded-md border border-border bg-background px-3 text-sm flex items-center">
                {kindLabel(item.kind)}
              </div>
            </div>

            <label className="grid gap-1">
              <span className="text-sm text-muted-foreground">Empresa/Instituição</span>
              <input
                name="company"
                required
                defaultValue={item.company}
                className="h-10 rounded-md border border-border bg-background px-3 text-sm"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-muted-foreground">Cargo/Título</span>
              <input
                name="role"
                required
                defaultValue={item.role}
                className="h-10 rounded-md border border-border bg-background px-3 text-sm"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1">
                <span className="text-sm text-muted-foreground">Localização</span>
                <input
                  name="location"
                  defaultValue={item.location ?? ""}
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm text-muted-foreground">Rótulo do período</span>
                <input
                  name="periodLabel"
                  defaultValue={item.periodLabel ?? ""}
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1">
                <span className="text-sm text-muted-foreground">Início (YYYY-MM)</span>
                <input
                  name="startYm"
                  defaultValue={item.startYm ?? ""}
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm text-muted-foreground">Fim (YYYY-MM)</span>
                <input
                  name="endYm"
                  defaultValue={item.endYm ?? ""}
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm"
                />
              </label>
            </div>

            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" name="isCurrent" defaultChecked={item.isCurrent} className="accent-primary" />
              <span>Atualmente</span>
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-muted-foreground">Resumo</span>
              <textarea
                name="summary"
                required
                rows={4}
                defaultValue={item.summary}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-muted-foreground">Highlights (1 por linha)</span>
              <textarea
                name="highlights"
                rows={6}
                defaultValue={toLines(item.highlights)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-muted-foreground">Tech (1 por linha)</span>
              <textarea
                name="tech"
                rows={4}
                defaultValue={toLines(item.tech)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </label>

            <div className="flex items-center justify-end gap-2">
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
