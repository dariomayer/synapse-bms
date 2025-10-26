// src/modules/auth/components/login-form.tsx
import { useState } from "react"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import { apiSignInEmail } from "@/modules/auth/lib/api"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { status } = await apiSignInEmail({ email, password })
    setLoading(false)
    if (status === 200) {
      window.location.href = "/"
    } else {
      setError("Credenziali non valide. Riprova.")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>
          {error && (
            <FieldDescription className="text-destructive">{error}</FieldDescription>
          )}
          <Field>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Accesso..." : "Accedi"}
            </Button>
          </Field>
          <FieldDescription className="text-center">
            Non hai un account? <a href="/signup" className="underline underline-offset-4">Registrati</a>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  )
}
