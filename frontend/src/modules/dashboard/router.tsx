// Frontend/src/modules/dashboard/router.tsx
import { DashboardPage } from "./pages/dashboard-page"

/**
 * Router per il modulo Dashboard.
 * Gestisce tutte le route relative alla dashboard.
 */
export function DashboardRouter() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  
  // Route principale della dashboard
  if (path === '/dashboard') {
    return <DashboardPage />
  }
  
  return null
}

/**
 * Verifica se il path corrente appartiene al modulo dashboard.
 */
export function isDashboardPath(path: string): boolean {
  return path.startsWith('/dashboard')
}
