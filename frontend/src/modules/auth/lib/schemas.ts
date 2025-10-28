// Frontend/src/modules/auth/lib/schemas.ts
import { z } from "zod"

/**
 * Schema di validazione per il form di login
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
})

export type LoginFormValues = z.infer<typeof loginSchema>

/**
 * Schema di validazione per il form di registrazione
 */
export const signupSchema = z
  .object({
    name: z.string().optional(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
  })

export type SignupFormValues = z.infer<typeof signupSchema>
