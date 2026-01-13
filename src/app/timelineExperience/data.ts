import { curriculoData } from "@/app/curriculo/data"

export type TimelineCategory = "Experiência" | "Projetos" | "Formação" | "Cursos"

export type TimelineExperienceItem = {
  id: string
  category: TimelineCategory
  company: string
  role: string
  location?: string
  start?: string // YYYY-MM (opcional)
  end?: string // YYYY-MM
  isCurrent?: boolean
  periodLabel?: string // ex: "Out/2024 - Atual", "2025", "Cursando"
  summary: string
  highlights?: string[]
  tech?: string[]
  links?: { label: string; href: string }[]
}

const monthMap: Record<string, number> = {
  Jan: 1,
  Fev: 2,
  Mar: 3,
  Abr: 4,
  Mai: 5,
  Jun: 6,
  Jul: 7,
  Ago: 8,
  Set: 9,
  Out: 10,
  Nov: 11,
  Dez: 12,
}

function toIsoYearMonth(year: number, month: number) {
  const y = String(year)
  const m = String(month).padStart(2, "0")
  return `${y}-${m}`
}

function parsePtBrPeriod(periodo: string): { start?: string; end?: string; isCurrent?: boolean } {
  // Exemplos: "Out/2024 - Atual", "Mar/2022 - Dez/2023"
  const [rawStart, rawEnd] = periodo.split("-").map((p) => p.trim())
  const startMatch = rawStart?.match(/^([A-Za-zÀ-ÿ]{3})\/(\d{4})$/)
  const endMatch = rawEnd?.match(/^([A-Za-zÀ-ÿ]{3})\/(\d{4})$/)

  const startMon = startMatch?.[1]
  const startYear = startMatch?.[2] ? Number(startMatch[2]) : undefined
  const startMonth = startMon ? monthMap[startMon] : undefined

  const endMon = endMatch?.[1]
  const endYear = endMatch?.[2] ? Number(endMatch[2]) : undefined
  const endMonth = endMon ? monthMap[endMon] : undefined

  const start = startYear && startMonth ? toIsoYearMonth(startYear, startMonth) : undefined
  const end = endYear && endMonth ? toIsoYearMonth(endYear, endMonth) : undefined

  const isCurrent = /atual/i.test(rawEnd ?? "")

  return { start, end, isCurrent: isCurrent || undefined }
}

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr))
}

function pickHighlights(lines: string[], max = 6) {
  return lines
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/\s+/g, " "))
    .slice(0, max)
}

function inferTechFromText(text: string) {
  const candidates: Array<{ key: string; label: string }> = [
    { key: "next.js", label: "Next.js" },
    { key: "react", label: "React" },
    { key: "typescript", label: "TypeScript" },
    { key: "javascript", label: "JavaScript" },
    { key: "node", label: "Node.js" },
    { key: "prisma", label: "Prisma" },
    { key: "postgres", label: "PostgreSQL" },
    { key: "docker", label: "Docker" },
    { key: "nextauth", label: "NextAuth" },
    { key: "spring", label: "Spring Boot" },
    { key: "java", label: "Java" },
    { key: "c#", label: "C#" },
    { key: ".net", label: ".NET" },
    { key: "asp.net", label: "ASP.NET" },
    { key: "sonarqube", label: "SonarQube" },
    { key: "azure devops", label: "Azure DevOps" },
    { key: "git", label: "Git" },
    { key: "sql", label: "SQL" },
    { key: "uml", label: "UML" },
    { key: "postman", label: "Postman" },
    { key: "swagger", label: "Swagger" },
    { key: "playwright", label: "Playwright" },
    { key: "jest", label: "Jest" },
    { key: "zod", label: "Zod" },
  ]

  const hay = text.toLowerCase()
  return uniq(
    candidates.filter((c) => hay.includes(c.key)).map((c) => c.label)
  )
}

function parseCourseLine(line: string): { title: string; hours?: string; year?: number } {
  // Ex: "• Curso de Next.js - 20h (2025)"
  const cleaned = line.replace(/^\s*•\s*/, "").trim()
  const yearMatch = cleaned.match(/\((\d{4})\)\s*$/)
  const year = yearMatch ? Number(yearMatch[1]) : undefined
  const withoutYear = yearMatch ? cleaned.replace(/\s*\(\d{4}\)\s*$/, "").trim() : cleaned
  const parts = withoutYear.split("-").map((p) => p.trim()).filter(Boolean)
  const title = parts[0] ?? withoutYear
  const hours = parts[1]
  return { title, hours, year }
}

function toMonthIndex(ym?: string) {
  if (!ym) return Number.POSITIVE_INFINITY
  const match = ym.match(/^(\d{4})-(\d{2})$/)
  if (!match) return Number.POSITIVE_INFINITY
  const year = Number(match[1])
  const month = Number(match[2])
  if (!Number.isFinite(year) || !Number.isFinite(month)) return Number.POSITIVE_INFINITY
  return year * 12 + (month - 1)
}

function normalizeYearMonth(ym?: string) {
  if (!ym) return undefined
  const match = ym.match(/^(\d{4})-(\d{2})$/)
  if (!match) return undefined
  return ym
}

const experienceItems: TimelineExperienceItem[] = curriculoData.experienciaProfissional.map((exp, idx) => {
  const parsed = parsePtBrPeriod(exp.periodo)
  const start = normalizeYearMonth(exp.inicio) ?? parsed.start
  const end = normalizeYearMonth(exp.fim) ?? parsed.end
  const activities = exp.atividades ?? []
  const summary =
    activities.find((a) => /desenvolvimento|manuten|api|test|banco|sonar|devops|git/i.test(a)) ??
    activities[0] ??
    "Atuação em desenvolvimento e manutenção de sistemas."

  const tech = inferTechFromText([exp.cargo, exp.empresa, exp.periodo, ...activities].join("\n"))

  return {
    id: `exp-${idx}`,
    category: "Experiência",
    company: exp.empresa,
    role: exp.cargo,
    location: "Vitória/ES",
    start,
    end,
    isCurrent: parsed.isCurrent,
    periodLabel: exp.periodo,
    summary,
    highlights: pickHighlights(activities, 7),
    tech,
  } satisfies TimelineExperienceItem
})

const educationItems: TimelineExperienceItem[] = curriculoData.formacaoAcademica.map((edu, idx) => {
  const start = normalizeYearMonth(edu.inicio)
  const end = normalizeYearMonth(edu.fim)
  return {
    id: `edu-${idx}`,
    category: "Formação",
    company: edu.instituicao,
    role: edu.curso,
    start,
    end,
    isCurrent: /cursando/i.test(edu.instituicao),
    periodLabel: /cursando/i.test(edu.instituicao) ? "Cursando" : undefined,
    summary: "Formação acadêmica em andamento, com base sólida em computação e desenvolvimento de software.",
    tech: ["Algoritmos", "Estruturas de Dados", "POO"],
  } satisfies TimelineExperienceItem
})

const courseItems: TimelineExperienceItem[] = curriculoData.cursosComplementares
  .map((line, idx) => {
    const parsed = parseCourseLine(line)
    const periodLabel = parsed.year ? String(parsed.year) : undefined
    const tech = inferTechFromText([parsed.title, line].join("\n"))

    // Para ordenar cronologicamente, cursos com ano viram YYYY-01
    const start = parsed.year ? toIsoYearMonth(parsed.year, 1) : undefined

    return {
      id: `course-${idx}`,
      category: "Cursos",
      company: parsed.hours ? parsed.hours : "Curso complementar",
      role: parsed.title,
      start,
      periodLabel,
      summary: "Curso complementar para aprofundamento técnico e prática.",
      tech: tech.length ? tech : undefined,
    } satisfies TimelineExperienceItem
  })

const projectItems: TimelineExperienceItem[] = curriculoData.projetosProprios.map((p, idx) => {
  const stackTech = uniq(
    p.stack
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => s.replace(/\s+/g, " "))
  )

  const descr = p.descricao ?? []
  const summary = descr[0] ?? "Projeto full stack com foco em entrega e qualidade."

  const inferredTech = inferTechFromText([p.titulo, p.stack, ...descr].join("\n"))
  const tech = uniq([...stackTech, ...inferredTech])

  const start = normalizeYearMonth(p.inicio)
  const end = normalizeYearMonth(p.fim)

  return {
    id: `proj-${idx}`,
    category: "Projetos",
    company: "Projetos próprios",
    role: p.titulo,
    start,
    end,
    periodLabel: "Projeto",
    summary,
    highlights: pickHighlights(descr.slice(1), 7),
    tech: tech.length ? tech : undefined,
  } satisfies TimelineExperienceItem
})

export const timelineExperience: TimelineExperienceItem[] = [
  ...experienceItems,
  ...educationItems,
  ...courseItems,
  ...projectItems,
].sort((a, b) => {
  const aStart = toMonthIndex(a.start)
  const bStart = toMonthIndex(b.start)
  if (aStart !== bStart) return aStart - bStart

  // desempate: mais antigos (end) primeiro também
  const aEnd = toMonthIndex(a.end)
  const bEnd = toMonthIndex(b.end)
  if (aEnd !== bEnd) return aEnd - bEnd

  return a.id.localeCompare(b.id)
})
