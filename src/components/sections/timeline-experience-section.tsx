"use client"

import * as React from "react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { Pin } from "lucide-react"

import type { TimelineItem as TimelineExperienceItem } from "@/lib/timeline"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { GlareHover } from "@/components/ui/glare-hover"
import { StarBorder } from "@/components/ui/star-border"

function formatMonthYear(isoYearMonth: string) {
  const [y, m] = isoYearMonth.split("-").map(Number)
  const date = new Date(y, (m ?? 1) - 1, 1)
  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
  }).format(date)
}

function formatPeriod(item: TimelineExperienceItem) {
  if (item.periodLabel) return item.periodLabel
  if (!item.start) return ""

  const startLabel = formatMonthYear(item.start)
  if (item.isCurrent) return `${startLabel} — atualmente`
  if (item.end) return `${startLabel} — ${formatMonthYear(item.end)}`
  return startLabel
}

type TimelineSide = "single" | "left" | "right"

function TimelineItem({
  item,
  side,
  isPinned,
}: {
  item: TimelineExperienceItem
  side: TimelineSide
  isPinned: boolean
}) {
  const reduceMotion = useReducedMotion()

  const periodLabel = formatPeriod(item)

  const articlePaddingClass =
    side === "single"
      ? "pl-8"
      : side === "left"
        ? "pr-12"
        : "pl-12"

  return (
    <li className="relative">
      <motion.article
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
        transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.5 }}
        className={cn(articlePaddingClass, "transform-[translateZ(0)]")}
      >
        <SpotlightCard className="rounded-2xl">
          <GlareHover className="rounded-2xl">
            <Card className={cn("glass-card rounded-2xl border-border/60", "bg-card/40")}
            >
              <CardHeader className="gap-2">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle className="text-lg md:text-xl">
                      <span className="font-semibold">{item.role}</span>
                      <span className="text-muted-foreground"> · </span>
                      <span className="text-foreground/90">{item.company}</span>
                    </CardTitle>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      {periodLabel ? <span>{periodLabel}</span> : null}
                      {item.location ? (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{item.location}</span>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {isPinned ? (
                        <Badge variant="subtle" className="rounded-full px-3 py-1">
                          <span className="inline-flex items-center gap-1 text-primary">
                            <Pin className="size-4" fill="currentColor" />
                            Fixado
                          </span>
                        </Badge>
                      ) : null}

                      {item.isCurrent ? (
                        <StarBorder className="rounded-full">
                          <Badge variant="subtle" className="rounded-full px-3 py-1">
                            Atualmente
                          </Badge>
                        </StarBorder>
                      ) : null}

                      <Badge variant="subtle" className="rounded-full px-3 py-1">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator className="bg-border/50" />
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                  {item.summary}
                </p>

                {item.highlights?.length ? (
                  <ul className="grid gap-2 text-sm text-muted-foreground">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {item.tech?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="border-border/50 bg-card/30"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </GlareHover>
        </SpotlightCard>
      </motion.article>
    </li>
  )
}

export function TimelineExperienceSection({ items }: { items: TimelineExperienceItem[] }) {
  const reduceMotion = useReducedMotion()
  const sectionRef = React.useRef<HTMLElement | null>(null)

  const orderedItems = React.useMemo(() => items, [items])

  const leftItems: TimelineExperienceItem[] = []
  const rightItems: TimelineExperienceItem[] = []

  orderedItems.forEach((item, idx) => {
    if (idx % 2 === 0) leftItems.push(item)
    else rightItems.push(item)
  })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.15", "end 0.85"],
  })

  const progressSpring = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.25,
  })

  const progressOpacity = useTransform(progressSpring, [0, 0.02], [0, 1])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="timeline-title"
      className="relative mb-10"
    >
      <div className="container mx-auto px-6">
        <header className="mb-10">
          <h1
            id="timeline-title"
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Linha do tempo
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Experiência, formação, cursos e projetos (baseado no seu currículo).
          </p>
        </header>

        <div className="relative">
          <div
            aria-hidden="true"
            className={cn(
              "absolute left-4 top-0 bottom-0 w-px",
              "bg-border/50",
              "md:left-1/2 md:-translate-x-1/2"
            )}
          />

          <motion.div
            aria-hidden="true"
            className={cn(
              "absolute left-4 top-0 bottom-0 w-px origin-top",
              "bg-linear-to-b from-primary via-primary/70 to-transparent",
              "md:left-1/2 md:-translate-x-1/2"
            )}
            style={
              reduceMotion
                ? undefined
                : {
                    scaleY: progressSpring,
                    opacity: progressOpacity,
                  }
            }
          />

          <ol className="grid gap-10 md:hidden">
            {orderedItems.map((item) => (
              <TimelineItem
                key={item.id}
                item={item}
                side="single"
                isPinned={Boolean(item.pinned)}
              />
            ))}
          </ol>

          <div className="hidden md:flex items-start">
            <ol className="w-1/2 self-start grid content-start gap-10">
              {leftItems.map((item) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  side="left"
                  isPinned={Boolean(item.pinned)}
                />
              ))}
            </ol>

            <ol className="w-1/2 self-start grid content-start gap-10">
              {rightItems.map((item) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  side="right"
                  isPinned={Boolean(item.pinned)}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
