// Frontend/src/modules/auth/components/login-form.tsx
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/shared/lib/utils"
import { ButtonWithSpinner } from "@/shared/ui/button-with-spinner"
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
        setServerError("Invalid credentials. Please try again.")
      }
    } catch (error) {
      console.error('[LoginForm] Errore login:', error)
      setServerError("An error occurred. Please try again later.")
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
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your@email.com"
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
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                  />
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

          <ButtonWithSpinner
            type="submit"
            loading={loading}
            loadingText="Signing in..."
            className="w-full"
          >
            Sign In
          </ButtonWithSpinner>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign up
            </a>
          </div>
        </form>
      </Form>
    </div>
  )
}
