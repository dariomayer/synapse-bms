// Frontend/src/modules/auth/lib/schemas.ts
import { z } from "zod"

/**
 * Schema di validazione per il form di login
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "L'email è obbligatoria")
    .email("Inserisci un'email valida"),
  password: z
    .string()
    .min(1, "La password è obbligatoria")
    .min(8, "La password deve essere di almeno 8 caratteri"),
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
      .min(1, "L'email è obbligatoria")
      .email("Inserisci un'email valida"),
    password: z
      .string()
      .min(1, "La password è obbligatoria")
      .min(8, "La password deve essere di almeno 8 caratteri")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "La password deve contenere almeno una lettera maiuscola, una minuscola e un numero"
      ),
  })


export type SignupFormValues = z.infer<typeof signupSchema>
