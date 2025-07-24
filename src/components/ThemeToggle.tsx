
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    // Render a placeholder to avoid layout shift
    return <div className="h-10 w-[98px]" />;
  }

  return (
    <div className="flex items-center space-x-2 bg-white/50 dark:bg-glass p-2 rounded-full border border-black/10 dark:border-white/10 backdrop-blur-md">
      <Sun className={`h-5 w-5 transition-colors ${theme === 'light' ? 'text-accent' : 'text-slate-400'}`} />
      <Switch
        id="theme-switch"
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
      />
      <Moon className={`h-5 w-5 transition-colors ${theme === 'dark' ? 'text-primary' : 'text-slate-400'}`} />
    </div>
  )
}

