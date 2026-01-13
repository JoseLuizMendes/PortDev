"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type GlareHoverProps = React.ComponentProps<"div"> & {
  intensity?: number
}

export function GlareHover({
  className,
  children,
  intensity = 0.22,
  ...props
}: GlareHoverProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const rafRef = React.useRef<number | null>(null)
  const lastRef = React.useRef<{ x: number; y: number } | null>(null)

  const onPointerMove = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    lastRef.current = { x: px, y: py }

    if (rafRef.current != null) return
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null
      const pt = lastRef.current
      if (!pt) return

      const rotate = (pt.x - 0.5) * 16
      const alpha = Math.max(0.06, intensity)

      el.style.setProperty("--glare-rotate", `${rotate}deg`)
      el.style.setProperty("--glare-alpha", `${alpha}`)
      el.style.setProperty("--glare-x", `${Math.round(pt.x * 100)}%`)
      el.style.setProperty("--glare-y", `${Math.round(pt.y * 100)}%`)
    })
  }, [intensity])

  React.useEffect(() => {
    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "group/glare relative overflow-hidden",
        "[transform:translateZ(0)] will-change-transform",
        className
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity",
          "group-hover/glare:opacity-100 group-focus-within/glare:opacity-100"
        )}
        style={{
          backgroundImage: `linear-gradient(var(--glare-rotate, 0deg), transparent 0%, color-mix(in srgb, var(--primary-blue) calc(var(--glare-alpha, 0.18) * 100%), transparent) 45%, transparent 70%)`,
          transform: "translateZ(0)",
          transformOrigin: "center",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
