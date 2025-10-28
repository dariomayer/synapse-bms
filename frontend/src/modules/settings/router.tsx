// Frontend/src/modules/settings/router.tsx
import { ProfilePage } from "./pages/profile-page"
import { PreferencesPage } from "./pages/preferences-page"

/**
 * Router per il modulo Settings.
 * Gestisce tutte le route relative alle impostazioni.
 */
export function SettingsRouter() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  
  // Route del modulo settings
  if (path === '/settings/profile') {
    return <ProfilePage />
  }
  
  if (path === '/settings/preferences') {
    return <PreferencesPage />
  }
  
  // Default: redirect a profile
  if (path === '/settings') {
    window.location.href = '/settings/profile'
    return null
  }
  
  return null
}

/**
 * Verifica se il path corrente appartiene al modulo settings.
 */
export function isSettingsPath(path: string): boolean {
  return path.startsWith('/settings')
}
