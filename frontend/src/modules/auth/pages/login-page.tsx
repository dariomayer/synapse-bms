// src/modules/auth/pages/login-page.tsx

import { AuthShell } from "@/modules/auth/components/auth-shell"
import { LoginForm } from "@/modules/auth/components/login-form"

export default function LoginPage() {
  return (
    <AuthShell title="Accedi" subtitle="Entra con email e password">
      <LoginForm />
    </AuthShell>
  )
}
