// Frontend/src/modules/auth/hooks/use-session.ts
import { useEffect, useState } from "react"
import { apiSession } from "@/modules/auth/lib/api"

export interface User {
  id: string
  email: string
  name?: string
  emailVerified: boolean
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  user: User
  session: {
    id: string
    userId: string
    expiresAt: Date
    token: string
    ipAddress?: string
    userAgent?: string
  }
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSession = async () => {
    setLoading(true)
    setError(null)
    try {
      const { status, data } = await apiSession<Session>()
      console.log('[useSession] API Response:', { status, data })
      if (status === 200 && data) {
        console.log('[useSession] Session valida:', data)
        setSession(data)
      } else {
        console.log('[useSession] Sessione non valida o assente:', { status, data })
        setSession(null)
      }
    } catch (err) {
      console.error('[useSession] Errore fetch sessione:', err)
      setError("Errore nel recupero della sessione")
      setSession(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSession()
  }, [])

  return {
    session,
    user: session?.user ?? null,
    loading,
    error,
    refetch: fetchSession,
  }
}
