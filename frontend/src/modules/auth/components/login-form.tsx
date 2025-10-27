// Frontend/src/modules/auth/components/login-form.tsx
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
import { apiSignInEmail } from "@/modules/auth/lib/api"
import { loginSchema, type LoginFormValues } from "@/modules/auth/lib/schemas"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginFormValues) {
    setServerError(null)
    setLoading(true)
    
    try {
      const { status, data } = await apiSignInEmail({
        email: values.email,
        password: values.password,
      })
      
      console.log('[LoginForm] Response:', { status, data })
      
      if (status === 200) {
        console.log('[LoginForm] Login riuscito, redirect a /dashboard')
        window.location.href = "/dashboard"
      } else {
        console.log('[LoginForm] Login fallito:', status)
        setServerError("Credenziali non valide. Riprova.")
      }
    } catch (error) {
      console.error('[LoginForm] Errore login:', error)
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    {...field}
                  />
                </FormControl>
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
            {loading ? "Accesso..." : "Accedi"}
          </Button>

          <FormDescription className="text-center">
            Non hai un account?{" "}
            <a
              href="/signup"
              className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
            >
              Registrati
            </a>
          </FormDescription>
        </form>
      </Form>
    </div>
  )
}
