// Frontend/src/modules/core/components/protected-route.tsx
import { useEffect } from "react"
import { useSession } from "@/modules/auth/hooks/use-session"
import { Spinner } from "@/shared/ui/spinner"

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Componente per proteggere route che richiedono autenticazione.
 * Reindirizza a /login se l'utente non è autenticato.
 * Mostra un loader durante il caricamento della sessione.
 */
export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { session, loading } = useSession()

  useEffect(() => {
    // Se non c'è sessione e il caricamento è completato, reindirizza al login
    console.log('[ProtectedRoute] Check:', { loading, session })
    if (!loading && !session) {
      console.log('[ProtectedRoute] Redirect a /login - nessuna sessione')
      window.location.href = "/login"
    }
  }, [session, loading])

  // Mostra loader durante il caricamento
  if (loading) {
    return (
      fallback ?? (
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Spinner className="size-8" />
            <p className="text-sm text-muted-foreground">Caricamento...</p>
          </div>
        </div>
      )
    )
  }

  // Se non c'è sessione, non renderizzare nulla (il redirect è in corso)
  if (!session) {
    return null
  }

  // Renderizza i children solo se autenticato
  return <>{children}</>
}
