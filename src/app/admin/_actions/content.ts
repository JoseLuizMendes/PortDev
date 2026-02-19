"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"
import { ContentKind } from "@prisma/client"

function parseLines(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return undefined
  const arr = value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
  return arr.length ? arr : undefined
}

function parseOptionalString(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return undefined
  const s = value.trim()
  return s ? s : undefined
}

function parseBoolean(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return false
  return value === "on" || value === "true" || value === "1"
}

export async function createContentItem(formData: FormData) {
  const kind = parseOptionalString(formData.get("kind"))
  if (!kind) throw new Error("kind é obrigatório")

  const company = parseOptionalString(formData.get("company"))
  const role = parseOptionalString(formData.get("role"))
  const summary = parseOptionalString(formData.get("summary"))

  if (!company || !role || !summary) {
    throw new Error("company, role e summary são obrigatórios")
  }

  const location = parseOptionalString(formData.get("location"))
  const startYm = parseOptionalString(formData.get("startYm"))
  const endYm = parseOptionalString(formData.get("endYm"))
  const periodLabel = parseOptionalString(formData.get("periodLabel"))
  const isCurrent = parseBoolean(formData.get("isCurrent"))

  const highlights = parseLines(formData.get("highlights"))
  const tech = parseLines(formData.get("tech"))

  const item = await prisma.contentItem.create({
    data: {
      kind: kind as ContentKind,
      company,
      role,
      summary,
      location,
      startYm,
      endYm,
      isCurrent,
      periodLabel,
      highlights,
      tech,
    },
  })

  revalidatePath("/timelineExperience")
  revalidatePath("/admin/timeline")
  redirect(`/admin/items/${item.id}`)
}

export async function updateContentItem(id: string, formData: FormData) {
  const company = parseOptionalString(formData.get("company"))
  const role = parseOptionalString(formData.get("role"))
  const summary = parseOptionalString(formData.get("summary"))

  if (!company || !role || !summary) {
    throw new Error("company, role e summary são obrigatórios")
  }

  const location = parseOptionalString(formData.get("location"))
  const startYm = parseOptionalString(formData.get("startYm"))
  const endYm = parseOptionalString(formData.get("endYm"))
  const periodLabel = parseOptionalString(formData.get("periodLabel"))
  const isCurrent = parseBoolean(formData.get("isCurrent"))

  const highlights = parseLines(formData.get("highlights"))
  const tech = parseLines(formData.get("tech"))

  await prisma.contentItem.update({
    where: { id },
    data: {
      company,
      role,
      summary,
      location,
      startYm,
      endYm,
      isCurrent,
      periodLabel,
      highlights,
      tech,
    },
  })

  revalidatePath("/timelineExperience")
  revalidatePath("/admin/timeline")
  revalidatePath(`/admin/items/${id}`)
}

export async function deleteContentItem(id: string) {
  await prisma.contentItem.delete({ where: { id } })

  revalidatePath("/timelineExperience")
  revalidatePath("/admin/timeline")
  redirect("/admin/timeline")
}

export async function togglePinned(id: string) {
  const item = await prisma.contentItem.findUnique({ where: { id } })
  if (!item) return

  const nextPinned = !item.pinned

  await prisma.contentItem.update({
    where: { id },
    data: {
      pinned: nextPinned,
      pinnedOrder: nextPinned ? 999 : null,
    },
  })

  // normaliza ordem dos pinados
  const pinned = await prisma.contentItem.findMany({
    where: { pinned: true },
    orderBy: [{ pinnedOrder: "asc" }, { updatedAt: "desc" }, { id: "asc" }],
  })

  let order = 1
  for (const p of pinned) {
    await prisma.contentItem.update({ where: { id: p.id }, data: { pinnedOrder: order } })
    order += 1
  }

  revalidatePath("/timelineExperience")
  revalidatePath("/admin/timeline")
}

export async function movePinned(id: string, direction: "up" | "down") {
  const pinned = await prisma.contentItem.findMany({
    where: { pinned: true },
    orderBy: [{ pinnedOrder: "asc" }, { id: "asc" }],
  })

  const idx = pinned.findIndex((p) => p.id === id)
  if (idx === -1) return

  const swapWith = direction === "up" ? idx - 1 : idx + 1
  if (swapWith < 0 || swapWith >= pinned.length) return

  const a = pinned[idx]
  const b = pinned[swapWith]

  await prisma.$transaction([
    prisma.contentItem.update({ where: { id: a.id }, data: { pinnedOrder: b.pinnedOrder ?? (swapWith + 1) } }),
    prisma.contentItem.update({ where: { id: b.id }, data: { pinnedOrder: a.pinnedOrder ?? (idx + 1) } }),
  ])

  revalidatePath("/timelineExperience")
  revalidatePath("/admin/timeline")
}
