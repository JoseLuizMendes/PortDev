"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Toggle } from "@/components/ui/toggle"

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-md bg-slate-800/50 animate-pulse" />
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme
  const isDark = currentTheme === "dark"

  return (
    <Toggle
      pressed={isDark}
      onPressedChange={(pressed) => {
        setTheme(pressed ? "dark" : "light")
      }}
      aria-label="Alternar tema"
      size="sm"
      variant="outline"
      className="bg-slate-800/50 hover:bg-slate-700/50 border-slate-600/50 data-[state=on]:bg-slate-700/70 data-[state=on]:border-blue-500/50"
    >
      {isDark ? (
        <Moon className="h-4 w-4 text-blue-400" />
      ) : (
        <Sun className="h-4 w-4 text-yellow-500" />
      )}
    </Toggle>
  )
}
