// Frontend/src/modules/app/pages/dashboard-page.tsx
import { ProtectedRoute } from "@/modules/auth/components/protected-route"
import { AppHeader } from "@/modules/app/components/app-header"
import { useSession } from "@/modules/auth/hooks/use-session"

/**
 * Dashboard protetta - accessibile solo agli utenti autenticati.
 */
export function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const { user } = useSession()

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 container py-8 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Benvenuto, {user?.name || "Utente"}!
            </h1>
            <p className="text-muted-foreground">
              Questa è la tua dashboard protetta. Solo gli utenti autenticati possono accedere a questa sezione.
            </p>
          </div>

          {/* User Info Card */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Informazioni Account</h2>
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              {user?.name && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nome:</span>
                  <span className="font-medium">{user.name}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email verificata:</span>
                <span className={user?.emailVerified ? "text-green-600" : "text-yellow-600"}>
                  {user?.emailVerified ? "Sì" : "No"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account creato:</span>
                <span className="font-medium">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("it-IT") : "-"}
                </span>
              </div>
            </div>
          </div>

          {/* Placeholder Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold mb-2">Statistiche</h3>
              <p className="text-sm text-muted-foreground">
                Le tue statistiche appariranno qui.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold mb-2">Attività Recenti</h3>
              <p className="text-sm text-muted-foreground">
                Le tue attività recenti appariranno qui.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
