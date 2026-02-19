"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const ADMIN_SESSION_COOKIE = "admin_session"

function getEnvCredentials() {
  const user = process.env.ADMIN_USER
  const password = process.env.ADMIN_PASSWORD

  if (!user || !password) {
    return null
  }

  return { user, password }
}

export async function loginAdmin(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const nextPath = String(formData.get("next") ?? "/admin/timeline")

  const credentials = getEnvCredentials()
  if (!credentials) {
    redirect("/admin/login?error=config")
  }

  if (username !== credentials.user || password !== credentials.password) {
    redirect(`/admin/login?error=invalid&next=${encodeURIComponent(nextPath)}`)
  }

  const token = Buffer.from(`${credentials.user}:${credentials.password}`).toString("base64")

  const cookieStore = await cookies()
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  })

  const safePath = nextPath.startsWith("/admin") ? nextPath : "/admin/timeline"
  redirect(safePath)
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
  redirect("/admin/login")
}
