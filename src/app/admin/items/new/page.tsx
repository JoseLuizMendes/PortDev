import { createContentItem } from "@/app/admin/_actions/content"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const kindOptions = [
  { value: "EXPERIENCE", label: "Experiência" },
  { value: "EDUCATION", label: "Bacharelado" },
  { value: "COURSE", label: "Cursos" },
  { value: "PROJECT", label: "Projetos" },
] as const

export default function NewItemPage({
  searchParams,
}: {
  searchParams: { kind?: string }
}) {
  const kindFromQuery = typeof searchParams.kind === "string" ? searchParams.kind : undefined
  const defaultKind = kindOptions.some((k) => k.value === kindFromQuery) ? kindFromQuery : "EXPERIENCE"

  return (
    <Card className="border-border/60 bg-card/40">
      <CardHeader>
        <CardTitle>Novo item</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={createContentItem} className="grid gap-4">
          <label className="grid gap-1">
            <span className="text-sm text-muted-foreground">Tipo</span>
            <select
              name="kind"
              defaultValue={defaultKind}
              className="h-10 rounded-md border border-border bg-background px-3 text-sm"
            >
              {kindOptions.map((k) => (
                <option key={k.value} value={k.value}>
                  {k.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-muted-foreground">Empresa/Instituição</span>
            <input
              name="company"
              required
              className="h-10 rounded-md border border-border bg-background px-3 text-sm"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-muted-foreground">Cargo/Título</span>
            <input
              name="role"
              required
              className="h-10 rounded-md border border-border bg-background px-3 text-sm"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm text-muted-foreground">Localização</span>
              <input
                name="location"
                className="h-10 rounded-md border border-border bg-background px-3 text-sm"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-muted-foreground">Rótulo do período</span>
              <input
                name="periodLabel"
                placeholder="Ex: Out/2024 - Atual"
                className="h-10 rounded-md border border-border bg-background px-3 text-sm"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm text-muted-foreground">Início (YYYY-MM)</span>
              <input
                name="startYm"
                placeholder="2024-10"
                className="h-10 rounded-md border border-border bg-background px-3 text-sm"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-muted-foreground">Fim (YYYY-MM)</span>
              <input
                name="endYm"
                placeholder="2026-10"
                className="h-10 rounded-md border border-border bg-background px-3 text-sm"
              />
            </label>
          </div>

          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" name="isCurrent" className="accent-primary" />
            <span>Atualmente</span>
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-muted-foreground">Resumo</span>
            <textarea
              name="summary"
              required
              rows={4}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-muted-foreground">Highlights (1 por linha)</span>
            <textarea
              name="highlights"
              rows={5}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-muted-foreground">Tech (1 por linha)</span>
            <textarea
              name="tech"
              rows={4}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <div className="flex items-center justify-end">
            <Button type="submit">Criar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
