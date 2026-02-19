import { prisma } from "../src/lib/prisma"
import { curriculoData } from "../src/app/curriculo/data"

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr))
}

function normalizeYearMonth(input?: string) {
  if (!input) return undefined

  const iso = input.trim().replace("/", "-")
  const match = iso.match(/^(\d{4})-(\d{1,2})$/)
  if (!match) return undefined

  const y = match[1]
  const m = String(Number(match[2])).padStart(2, "0")
  return `${y}-${m}`
}

function isPinnedDefault(kind: "EXPERIENCE" | "EDUCATION", company: string, role: string) {
  if (kind === "EXPERIENCE") {
    return /prodest/i.test(company) || /prodest/i.test(role)
  }

  if (kind === "EDUCATION") {
    return /faesa/i.test(company)
  }

  return false
}

async function main() {
  // MVP: seed só da timeline (experiências + formação + cursos + projetos) para ContentItem.
  // Mantém id estável por índice para evitar duplicar ao rodar seed várias vezes.

  const items: Array<{
    id: string
    kind: "EXPERIENCE" | "EDUCATION" | "COURSE" | "PROJECT"
    company: string
    role: string
    location?: string
    startYm?: string
    endYm?: string
    isCurrent?: boolean
    periodLabel?: string
    summary: string
    highlights?: string[]
    tech?: string[]
    links?: { label: string; href: string }[]
  }> = []

  curriculoData.experienciaProfissional.forEach((exp, idx) => {
    const activities = exp.atividades ?? []
    const summary =
      activities.find((a) => /desenvolvimento|manuten|api|test|banco|sonar|devops|git/i.test(a)) ??
      activities[0] ??
      "Atuação em desenvolvimento e manutenção de sistemas."

    const tech = uniq(
      [exp.cargo, exp.empresa, exp.periodo, ...activities]
        .join("\n")
        .toLowerCase()
        .includes("react")
        ? ["React"]
        : []
    )

    items.push({
      id: `exp-${idx}`,
      kind: "EXPERIENCE",
      company: exp.empresa,
      role: exp.cargo,
      location: "Vitória/ES",
      startYm: normalizeYearMonth(exp.inicio),
      endYm: normalizeYearMonth(exp.fim),
      isCurrent: /atual/i.test(exp.periodo),
      periodLabel: exp.periodo,
      summary,
      highlights: activities.slice(0, 10),
      tech: tech.length ? tech : undefined,
    })
  })

  curriculoData.formacaoAcademica.forEach((edu, idx) => {
    const summary = edu.descricao ?? "Formação acadêmica em andamento."

    items.push({
      id: `edu-${idx}`,
      kind: "EDUCATION",
      company: edu.instituicao,
      role: edu.curso,
      location: edu.campus,
      startYm: normalizeYearMonth(edu.inicio),
      endYm: normalizeYearMonth(edu.fim),
      isCurrent: edu.status ? /cursando/i.test(edu.status) : false,
      periodLabel: [edu.status, edu.periodoAtual].filter(Boolean).join(" · ") || undefined,
      summary,
      highlights: [
        ...(edu.disciplinas ?? []).slice(0, 8).map((d) => `Disciplina: ${d}`),
        ...(edu.atividades ?? []).slice(0, 6),
      ].slice(0, 10),
      tech: edu.competencias,
    })
  })

  curriculoData.cursosComplementares.forEach((course, idx) => {
    const company = course.instituicao ?? course.plataforma ?? (course.cargaHoraria ? course.cargaHoraria : "Curso complementar")

    const summary =
      course.resumo ??
      (course.topicos?.length
        ? course.topicos.join(", ")
        : course.cargaHoraria
        ? `Curso complementar (${course.cargaHoraria}).`
        : "Curso complementar.")

    items.push({
      id: `course-${idx}`,
      kind: "COURSE",
      company,
      role: course.titulo,
      startYm: normalizeYearMonth(course.inicio),
      endYm: normalizeYearMonth(course.fim),
      periodLabel: course.ano ? String(course.ano) : undefined,
      summary,
      highlights: [
        ...(course.cargaHoraria ? [`Carga horária: ${course.cargaHoraria}`] : []),
        ...(course.modalidade ? [`Modalidade: ${course.modalidade}`] : []),
        ...(course.instituicao ? [`Instituição: ${course.instituicao}`] : []),
        ...(course.plataforma ? [`Plataforma: ${course.plataforma}`] : []),
        ...(course.topicos ?? []),
      ].slice(0, 10),
      tech: course.tags,
      links: course.certificadoUrl ? [{ label: "Certificado", href: course.certificadoUrl }] : undefined,
    })
  })

  curriculoData.projetosProprios.forEach((p, idx) => {
    const descr = p.descricao ?? []
    const summary = descr[0] ?? "Projeto full stack com foco em entrega e qualidade."

    const tech = uniq(
      p.stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    )

    items.push({
      id: `proj-${idx}`,
      kind: "PROJECT",
      company: "Projetos próprios",
      role: p.titulo,
      startYm: normalizeYearMonth(p.inicio),
      endYm: normalizeYearMonth(p.fim),
      periodLabel: "Projeto",
      summary,
      highlights: descr.slice(1, 11),
      tech: tech.length ? tech : undefined,
    })
  })

  // Upsert (idempotente)
  for (const item of items) {
    const pinnedDefault =
      item.kind === "EXPERIENCE" || item.kind === "EDUCATION"
        ? isPinnedDefault(item.kind, item.company, item.role)
        : false

    await prisma.contentItem.upsert({
      where: { id: item.id },
      create: {
        id: item.id,
        kind: item.kind,
        company: item.company,
        role: item.role,
        location: item.location,
        startYm: item.startYm,
        endYm: item.endYm,
        isCurrent: Boolean(item.isCurrent),
        periodLabel: item.periodLabel,
        summary: item.summary,
        highlights: item.highlights,
        tech: item.tech,
        links: item.links,
        pinned: pinnedDefault,
        pinnedOrder: pinnedDefault ? 999 : null,
      },
      update: {
        company: item.company,
        role: item.role,
        location: item.location,
        startYm: item.startYm,
        endYm: item.endYm,
        isCurrent: Boolean(item.isCurrent),
        periodLabel: item.periodLabel,
        summary: item.summary,
        highlights: item.highlights,
        tech: item.tech,
        links: item.links,
      },
    })
  }

  // Ajusta ordem default (PRODEST primeiro, FAESA segundo)
  const pinned = await prisma.contentItem.findMany({
    where: { pinned: true },
    orderBy: [{ pinnedOrder: "asc" }, { id: "asc" }],
  })

  let order = 1
  for (const p of pinned) {
    const isProdest = p.kind === "EXPERIENCE" && (/prodest/i.test(p.role) || /prodest/i.test(p.company))
    const isFaesa = p.kind === "EDUCATION" && /faesa/i.test(p.company)

    if (isProdest) {
      await prisma.contentItem.update({ where: { id: p.id }, data: { pinnedOrder: 1 } })
    } else if (isFaesa) {
      await prisma.contentItem.update({ where: { id: p.id }, data: { pinnedOrder: 2 } })
    } else {
      order += 1
      await prisma.contentItem.update({ where: { id: p.id }, data: { pinnedOrder: 100 + order } })
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
