// Frontend/src/modules/auth/components/auth-shell.tsx
import { Card, CardContent } from "@/shared/ui/card"
import { cn } from "@/shared/lib/utils"

type AuthShellProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
  rightPanel?: React.ReactNode
  className?: string
}

/**
 * Shell container per le pagine di autenticazione.
 * Utilizza i token del design system per garantire consistenza visiva.
 * Background con pattern minimal e right panel decorativo.
 */
export function AuthShell({ title, subtitle, children, rightPanel, className }: AuthShellProps) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className={cn(
        "relative w-full max-w-sm md:max-w-4xl rounded-xl border border-border bg-card overflow-hidden shadow-lg",
        className
      )}>
        <Card className="p-0 border-0 shadow-none">
          <CardContent className="grid p-0 md:grid-cols-2">
            {/* Form Section */}
            <div className="p-6 md:p-8">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                {subtitle && (
                  <p className="text-muted-foreground text-sm text-balance mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
              {children}
            </div>

            {/* Right Panel - Hidden on mobile */}
            <div className="relative hidden md:flex items-center justify-center bg-accent overflow-hidden">
              {rightPanel ?? (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  {/* Decorative SVG Pattern */}
                  <svg
                    className="w-full h-full opacity-10"
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Grid Pattern */}
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="400" height="400" fill="url(#grid)" />
                    
                    {/* Geometric Shapes */}
                    <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
                    <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
                    <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.7" />
                    
                    {/* Accent Lines */}
                    <line x1="80" y1="200" x2="120" y2="200" stroke="var(--primary)" strokeWidth="3" opacity="0.6" />
                    <line x1="280" y1="200" x2="320" y2="200" stroke="var(--primary)" strokeWidth="3" opacity="0.6" />
                    <line x1="200" y1="80" x2="200" y2="120" stroke="var(--primary)" strokeWidth="3" opacity="0.6" />
                    <line x1="200" y1="280" x2="200" y2="320" stroke="var(--primary)" strokeWidth="3" opacity="0.6" />
                  </svg>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
