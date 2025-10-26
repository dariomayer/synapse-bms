// src/modules/auth/router.tsx

import LoginPage from '@/modules/auth/pages/login-page'
import SignupPage from '@/modules/auth/pages/signup-page'

export function isAuthPath(pathname: string) {
  return pathname === '/login' || pathname === '/signup'
}

export function AuthRouter() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  if (path === '/login') return <LoginPage />
  if (path === '/signup') return <SignupPage />
  return null
}
