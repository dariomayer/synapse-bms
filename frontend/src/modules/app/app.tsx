// src/modules/app/app.tsx
import { LandingPage } from '@/modules/landing/pages/landing-page'
import { AuthRouter, isAuthPath } from '@/modules/auth/router'

export function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  if (isAuthPath(path)) return <AuthRouter />
  return <LandingPage />
}
