// src/modules/auth/components/auth-shell.tsx

import { Card, CardContent } from "@/shared/ui/card"
import { cn } from "@/shared/lib/utils"

type AuthShellProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
  rightPanel?: React.ReactNode
  className?: string
}

export function AuthShell({ title, subtitle, children, rightPanel, className }: AuthShellProps) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className={cn("w-full max-w-sm md:max-w-4xl rounded-xl border border-border bg-card overflow-hidden", className)}>
        <Card className="p-0 border-0 shadow-none">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="p-6 md:p-8">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold">{title}</h1>
                {subtitle ? (
                  <p className="text-muted-foreground text-sm text-balance mt-1">{subtitle}</p>
                ) : null}
              </div>
              {children}
            </div>
            <div className="relative hidden md:block bg-accent">
              {rightPanel ?? <div className="absolute inset-0" />}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
