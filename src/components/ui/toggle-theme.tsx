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
      <div className="h-9 w-9 rounded-md bg-card/50 animate-pulse" />
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
      className="bg-card/80 hover:bg-card border-primary/30 data-[state=on]:bg-card data-[state=on]:border-primary/50 transition-all duration-300"
    >
      {isDark ? (
        <Moon className="h-4 w-4 text-primary transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Sun className="h-4 w-4 text-yellow-500 transition-transform duration-300 hover:rotate-90" />
      )}
    </Toggle>
  )
}
