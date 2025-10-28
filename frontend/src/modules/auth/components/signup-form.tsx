// Frontend/src/modules/auth/components/signup-form.tsx
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
        setServerError("Error during registration. Please try again.")
      }
    } catch (error) {
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="••••••••"
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
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  We'll use this email to contact you. We won't share it with anyone.
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
                  <FormLabel>Create a password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            

          <FormDescription>
            Use at least 8 characters, one uppercase letter, one number, and one special character.
          </FormDescription>

          {serverError && (
            <FormDescription className="text-destructive">
              {serverError}
            </FormDescription>
          )}

          <ButtonWithSpinner
            type="submit"
            loading={loading}
            loadingText="Creating account..."
            className="w-full"
          >
            Create account
          </ButtonWithSpinner>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </a>
          </div>
        </form>
      </Form>
    </div>
  )
}
