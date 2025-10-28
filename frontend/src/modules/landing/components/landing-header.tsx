// Frontend/src/modules/landing/components/landing-header.tsx
import { useSession } from '@/modules/auth/hooks/use-session'

/**
 * Minimal header for landing page with Login/Signup or Dashboard CTA.
 * Sticky, transparent, modern.
 */
export function LandingHeader() {
  const { session, loading } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full bg-background/30 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo / Brand */}
        <a href="/" className="flex items-center gap-2 transition hover:opacity-80">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-lg">Synapse BMS</span>
        </a>

        {/* CTA Auth - condizionale su stato sessione */}
        {!loading && (
          <div className="flex items-center gap-3">
            {session ? (
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Go to Dashboard
              </a>
            ) : (
              <>
                <a
                  href="/login"
                  className="inline-flex items-center justify-center rounded-md border border-border/50 bg-background/50 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
