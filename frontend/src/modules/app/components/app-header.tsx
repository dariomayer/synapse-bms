// Frontend/src/modules/app/components/app-header.tsx
import { useState } from "react"
import { LogOut, User } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { apiSignOut } from "@/modules/auth/lib/api"
import { useSession } from "@/modules/auth/hooks/use-session"

/**
 * Header per le pagine protette con informazioni utente e logout.
 */
export function AppHeader() {
  const { user } = useSession()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await apiSignOut()
      // Reindirizza al login dopo logout
      window.location.href = "/login"
    } catch (error) {
      console.error("Errore durante il logout", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-lg">Synapse BMS</span>
        </div>

        {/* User info + Logout */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {user.name || user.email}
              </span>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={loading}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            {loading ? "Uscita..." : "Logout"}
          </Button>
        </div>
      </div>
    </header>
  )
}
