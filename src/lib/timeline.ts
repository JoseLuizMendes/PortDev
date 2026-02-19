export type TimelineCategory = "Experiência" | "Projetos" | "Bacharelado" | "Cursos"

export type TimelineItem = {
  id: string
  category: TimelineCategory
  company: string
  role: string
  location?: string
  start?: string
  end?: string
  isCurrent?: boolean
  periodLabel?: string
  summary: string
  highlights?: string[]
  tech?: string[]
  links?: { label: string; href: string }[]
  pinned?: boolean
}

function kindToCategory(kind: string): TimelineCategory {
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
      return "Experiência"
  }
}

function jsonArrayToStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined
  const arr = value.filter((v) => typeof v === "string") as string[]
  return arr.length ? arr : undefined
}

function jsonLinks(value: unknown): { label: string; href: string }[] | undefined {
  if (!Array.isArray(value)) return undefined
  const links = value
    .map((v) => {
      if (!v || typeof v !== "object") return null
      const obj = v as Record<string, unknown>
      const label = typeof obj.label === "string" ? obj.label : undefined
      const href = typeof obj.href === "string" ? obj.href : undefined
      if (!label || !href) return null
      return { label, href }
    })
    .filter(Boolean) as { label: string; href: string }[]

  return links.length ? links : undefined
}

export async function getTimelineItems(): Promise<TimelineItem[]> {
  // Fallback para não quebrar build/preview sem DATABASE_URL.
  if (!process.env.DATABASE_URL) {
    const mod = await import("@/app/timelineExperience/data")
    return mod.timelineExperience as TimelineItem[]
  }

  try {
    const { prisma } = await import("@/lib/prisma")
    const rows = await prisma.contentItem.findMany({
      orderBy: [
        { pinned: "desc" },
        { pinnedOrder: "asc" },
        { startYm: "asc" },
        { endYm: "asc" },
        { id: "asc" },
      ],
    })

    return rows.map((r) => ({
      id: r.id,
      category: kindToCategory(r.kind),
      company: r.company,
      role: r.role,
      location: r.location ?? undefined,
      start: r.startYm ?? undefined,
      end: r.endYm ?? undefined,
      isCurrent: r.isCurrent || undefined,
      periodLabel: r.periodLabel ?? undefined,
      summary: r.summary,
      highlights: jsonArrayToStringArray(r.highlights),
      tech: jsonArrayToStringArray(r.tech),
      links: jsonLinks(r.links),
      pinned: r.pinned,
    }))
  } catch {
    const mod = await import("@/app/timelineExperience/data")
    return mod.timelineExperience as TimelineItem[]
  }
}
