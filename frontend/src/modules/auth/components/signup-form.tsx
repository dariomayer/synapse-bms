// Frontend/src/modules/auth/components/signup-form.tsx
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import { apiSignUpEmail } from "@/modules/auth/lib/api"
import { signupSchema, type SignupFormValues } from "@/modules/auth/lib/schemas"

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: SignupFormValues) {
    setServerError(null)
    setLoading(true)

    try {
      const { status } = await apiSignUpEmail({
        email: values.email,
        password: values.password,
        name: values.name || undefined,
      })

      if (status === 200) {
        window.location.href = "/dashboard"
      } else {
        setServerError("Errore durante la registrazione. Riprova.")
      }
    } catch (error) {
      setServerError("Si è verificato un errore. Riprova più tardi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome (opzionale)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Mario Rossi"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@esempio.it"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Useremo questa email per contattarti. Non la condivideremo con nessuno.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            

          <FormDescription>
            La password deve contenere almeno 8 caratteri, una lettera maiuscola, una minuscola e un numero.
          </FormDescription>

          {serverError && (
            <FormDescription className="text-destructive">
              {serverError}
            </FormDescription>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Registrazione..." : "Crea Account"}
          </Button>

          <FormDescription className="text-center">
            Hai già un account?{" "}
            <a
              href="/login"
              className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
            >
              Accedi
            </a>
          </FormDescription>
        </form>
      </Form>
    </div>
  )
}
