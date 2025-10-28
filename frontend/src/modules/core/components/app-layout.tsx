// Frontend/src/modules/core/components/app-layout.tsx
import { AppHeader } from "./app-header"

interface AppLayoutProps {
  children: React.ReactNode
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
}

/**
 * Layout comune per tutte le pagine protette.
 * Include header e gestisce il max-width del contenuto.
 */
export function AppLayout({ children, maxWidth = "2xl" }: AppLayoutProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-4xl",
    full: "max-w-full"
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 container py-8 px-6">
        <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>
          {children}
        </div>
      </main>
    </div>
  )
}
