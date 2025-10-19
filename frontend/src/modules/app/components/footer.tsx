// src/modules/app/components/footer.tsx
import { useMemo } from 'react'

export function Footer() {
  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className="w-full mt-8">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/40 bg-background/40 backdrop-blur-sm px-4 py-3 text-xs text-muted-foreground">
          <p className="truncate">
            Licenza <span className="font-medium text-foreground">MIT</span> · © {year} <span className="font-medium text-foreground">Dario Pratola</span>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/dariomayer/synapse-bms"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border/50 px-2 py-1 transition-colors hover:text-primary hover:border-primary/40 hover:bg-primary/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring inline-flex items-center gap-1.5"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-black"
              >
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.85 9.7.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.79.62-3.38-1.37-3.38-1.37-.46-1.19-1.12-1.51-1.12-1.51-.92-.64.07-.63.07-.63 1.02.07 1.56 1.06 1.56 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.23-.26-4.57-1.14-4.57-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05a9.24 9.24 0 0 1 2.5-.34c.85 0 1.7.12 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.64 1.03 2.76 0 3.94-2.35 4.82-4.59 5.07.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
