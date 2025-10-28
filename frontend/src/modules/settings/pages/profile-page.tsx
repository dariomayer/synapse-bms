// Frontend/src/modules/settings/pages/profile-page.tsx
import { ProtectedRoute } from "@/modules/core/components/protected-route"
import { AppLayout } from "@/modules/core/components/app-layout"
import { useSession } from "@/modules/auth/hooks/use-session"
import { Button } from "@/shared/ui/button"
import { User, Mail, Calendar } from "lucide-react"

/**
 * Pagina profilo utente - modulo settings.
 */
export function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}

function ProfileContent() {
  const { user } = useSession()

  return (
    <AppLayout maxWidth="lg">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Profilo</h1>
          <p className="text-muted-foreground">
            Gestisci le informazioni del tuo account
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center">
              <User className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">{user?.name || "Utente"}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Info Fields */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            {user?.name && (
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Nome</p>
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Membro dal</p>
                <p className="text-sm text-muted-foreground">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("it-IT", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="default">Modifica Profilo</Button>
            <Button variant="outline">Cambia Password</Button>
          </div>
        </div>

        {/* Email Verification Status */}
        <div className={`rounded-lg border p-4 ${
          user?.emailVerified 
            ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950" 
            : "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950"
        }`}>
          <p className="text-sm font-medium">
            {user?.emailVerified 
              ? "✓ Email verificata" 
              : "⚠ Email non verificata"}
          </p>
          {!user?.emailVerified && (
            <p className="text-sm text-muted-foreground mt-1">
              Verifica la tua email per accedere a tutte le funzionalità
            </p>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
