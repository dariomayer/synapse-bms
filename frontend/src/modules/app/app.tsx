// src/modules/app/app.tsx
import { LandingPage } from '@/modules/landing/pages/landing-page'
import { AuthRouter, isAuthPath } from '@/modules/auth/router'
import { DashboardPage } from '@/modules/app/pages/dashboard-page'

export function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  
  // Route protette
  if (path === '/dashboard') return <DashboardPage />
  
  // Route di autenticazione
  if (isAuthPath(path)) return <AuthRouter />
  
  // Landing page pubblica
  return <LandingPage />
}
