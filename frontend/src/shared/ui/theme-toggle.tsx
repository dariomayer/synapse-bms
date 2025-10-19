// src/shared/ui/theme-toggle.tsx
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/button'
import { applyTheme, getInitialTheme, toggleTheme, type Theme } from '@/shared/lib/theme'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const initial = getInitialTheme()
    applyTheme(initial)
    setTheme(initial)
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      aria-label="Toggle theme"
      onClick={() => {
        const next = toggleTheme()
        setTheme(next)
      }}
      className="text-muted-foreground hover:text-primary"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
