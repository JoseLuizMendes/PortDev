import Link from "next/link"

import { loginAdmin } from "@/app/admin/_actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string
    next?: string
  }>
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {}
  const error = params.error
  const nextPath = params.next && params.next.startsWith("/admin") ? params.next : "/admin/timeline"

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-md items-center">
      <Card className="w-full border-border/60 bg-card/70">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Entrar no admin</CardTitle>
          <CardDescription>
            Use seu usuário e senha de administrador para acessar o painel.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={loginAdmin} className="space-y-4">
            <input type="hidden" name="next" value={nextPath} />

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Usuário
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              />
            </div>

            {error === "invalid" ? (
              <p className="text-sm text-destructive">Usuário ou senha inválidos.</p>
            ) : null}
            {error === "config" ? (
              <p className="text-sm text-destructive">
                Credenciais do admin não configuradas no ambiente.
              </p>
            ) : null}

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Voltar para <Link href="/" className="underline">início</Link>
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
