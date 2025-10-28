// Frontend/src/modules/app.tsx
import { LandingPage } from '@/modules/landing/pages/landing-page'
import { AuthRouter, isAuthPath } from '@/modules/auth/router'
import { DashboardRouter, isDashboardPath } from '@/modules/dashboard/router'
import { SettingsRouter, isSettingsPath } from '@/modules/settings/router'

/**
 * Router principale dell'applicazione.
 * Gestisce il routing tra moduli pubblici e protetti.
 * 
 * Struttura moduli:
 * - Pubblici: landing, auth
 * - Protetti: dashboard, settings, [altri moduli futuri]
 * - Core: componenti condivisi tra moduli protetti
 */
export function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  
  // === MODULI PROTETTI ===
  // Dashboard module
  if (isDashboardPath(path)) {
    return <DashboardRouter />
  }
  
  // Settings module
  if (isSettingsPath(path)) {
    return <SettingsRouter />
  }
  
  // === MODULI PUBBLICI ===
  // Auth module (login, signup, etc.)
  if (isAuthPath(path)) {
    return <AuthRouter />
  }
  
  // Landing page (homepage pubblica)
  return <LandingPage />
}
