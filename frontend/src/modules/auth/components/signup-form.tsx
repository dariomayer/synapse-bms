// src/modules/auth/components/signup-form.tsx
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
import { apiSignUpEmail } from "@/modules/auth/lib/api"

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Le password non corrispondono")
      return
    }

    if (password.length < 8) {
      setError("La password deve essere di almeno 8 caratteri")
      return
    }

    setLoading(true)
    const { status } = await apiSignUpEmail({ email, password, name: name || undefined })
    setLoading(false)

    if (status === 200) {
      window.location.href = "/login"
    } else {
      setError("Errore durante la registrazione. Riprova.")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Nome (opzionale)</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="Mario Rossi"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="email@esempio.it"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FieldDescription>
              Useremo questa email per contattarti. Non la condivideremo con nessuno.
            </FieldDescription>
          </Field>
          <Field>
            <Field className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Field>
                <FieldLabel htmlFor="confirm-password">Conferma Password</FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Field>
            </Field>
            <FieldDescription>Deve essere di almeno 8 caratteri.</FieldDescription>
          </Field>
          {error && (
            <FieldDescription className="text-destructive">{error}</FieldDescription>
          )}
          <Field>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Registrazione..." : "Crea Account"}
            </Button>
          </Field>
          <FieldDescription className="text-center">
            Hai già un account? <a href="/login" className="underline underline-offset-4">Accedi</a>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  )
}
