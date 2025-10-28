// src/modules/auth/pages/signup-page.tsx

import { AuthShell } from "@/modules/auth/components/auth-shell"
import { SignupForm } from "@/modules/auth/components/signup-form"

export default function SignupPage() {
  return (
    <AuthShell
      title="Create an account"
      subtitle="Fill in the fields to get started"
    >
      <SignupForm />
    </AuthShell>
  )
}
