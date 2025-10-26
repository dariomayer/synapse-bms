// src/modules/auth/pages/signup-page.tsx

import { AuthShell } from "@/modules/auth/components/auth-shell"
import { SignupForm } from "@/modules/auth/components/signup-form"

export default function SignupPage() {
  return (
    <AuthShell title="Crea account" subtitle="Registrati con email e password">
      <SignupForm />
    </AuthShell>
  )
}
