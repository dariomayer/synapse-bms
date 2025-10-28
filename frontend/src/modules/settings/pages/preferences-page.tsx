// Frontend/src/modules/settings/pages/preferences-page.tsx
import { ProtectedRoute } from "@/modules/core/components/protected-route"
import { AppLayout } from "@/modules/core/components/app-layout"
import { Button } from "@/shared/ui/button"
import { Moon, Sun, Bell, Globe } from "lucide-react"

/**
 * Pagina preferenze - modulo settings.
 */
export function PreferencesPage() {
  return (
    <ProtectedRoute>
      <PreferencesContent />
    </ProtectedRoute>
  )
}

function PreferencesContent() {
  return (
    <AppLayout maxWidth="lg">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Preferenze</h1>
          <p className="text-muted-foreground">
            Personalizza l'esperienza dell'applicazione
          </p>
        </div>

        {/* Theme Settings */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Sun className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <h3 className="font-semibold">Tema</h3>
              <p className="text-sm text-muted-foreground">
                Scegli il tema dell'interfaccia
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Sun className="h-4 w-4 mr-2" />
              Chiaro
            </Button>
            <Button variant="outline" size="sm">
              <Moon className="h-4 w-4 mr-2" />
              Scuro
            </Button>
            <Button variant="outline" size="sm">
              Sistema
            </Button>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <h3 className="font-semibold">Notifiche</h3>
              <p className="text-sm text-muted-foreground">
                Gestisci le tue preferenze di notifica
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-sm">Notifiche email</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-sm">Notifiche push</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Newsletter settimanale</span>
            </label>
          </div>
        </div>

        {/* Language Settings */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <h3 className="font-semibold">Lingua</h3>
              <p className="text-sm text-muted-foreground">
                Seleziona la lingua dell'interfaccia
              </p>
            </div>
          </div>
          <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
            <option value="it">Italiano</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button>Salva Preferenze</Button>
        </div>
      </div>
    </AppLayout>
  )
}
