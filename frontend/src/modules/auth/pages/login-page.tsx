// src/modules/auth/pages/login-page.tsx

import { AuthShell } from "@/modules/auth/components/auth-shell"
import { LoginForm } from "@/modules/auth/components/login-form"

export default function LoginPage() {
  return (
    <AuthShell title="Sign In" subtitle="Enter your email and password to continue">
      <LoginForm />
    </AuthShell>
  )
}
