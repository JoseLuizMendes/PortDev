"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type SpotlightCardProps = React.ComponentProps<"div"> & {
  radiusPx?: number
}

export function SpotlightCard({
  className,
  children,
  radiusPx = 520,
  ...props
}: SpotlightCardProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const rafRef = React.useRef<number | null>(null)
  const lastPointRef = React.useRef<{ x: number; y: number } | null>(null)

  const setPoint = React.useCallback((x: number, y: number) => {
    const el = ref.current
    if (!el) return

    el.style.setProperty("--spotlight-x", `${x}px`)
    el.style.setProperty("--spotlight-y", `${y}px`)
  }, [])

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      lastPointRef.current = { x, y }

      if (rafRef.current != null) return
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        const pt = lastPointRef.current
        if (!pt) return
        setPoint(pt.x, pt.y)
      })
    },
    [setPoint]
  )

  const onPointerLeave = React.useCallback(() => {
    const el = ref.current
    if (!el) return

    el.style.removeProperty("--spotlight-x")
    el.style.removeProperty("--spotlight-y")
  }, [])

  React.useEffect(() => {
    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "group/spotlight relative",
        "[transform:translateZ(0)] will-change-transform",
        className
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity",
          "group-hover/spotlight:opacity-100 group-focus-within/spotlight:opacity-100"
        )}
        style={{
          backgroundImage: [
            `radial-gradient(${radiusPx}px circle at var(--spotlight-x, 50%) var(--spotlight-y, 0%), color-mix(in srgb, var(--primary-blue) 32%, transparent), transparent 60%)`,
            `radial-gradient(${Math.round(
              radiusPx * 0.75
            )}px circle at var(--spotlight-x, 50%) var(--spotlight-y, 0%), color-mix(in srgb, var(--primary-purple) 20%, transparent), transparent 60%)`,
          ].join(","),
        }}
      />
      <div className="relative rounded-[inherit]">{children}</div>
    </div>
  )
}
