// frontend/src/shared/ui/button-with-spinner.tsx
import * as React from "react"
import { Button, buttonVariants } from "@/shared/ui/button"
import { Spinner } from "@/shared/ui/spinner"
import { type VariantProps } from "class-variance-authority"

interface ButtonWithSpinnerProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  loadingText?: string
  asChild?: boolean
}

/**
 * Bottone con spinner integrato per gestire stati di loading.
 * 
 * @param loading - Se true, mostra lo spinner e disabilita il bottone
 * @param loadingText - Testo da mostrare durante il loading (opzionale)
 * @param children - Contenuto del bottone quando non è in loading
 */
function ButtonWithSpinner({
  loading = false,
  loadingText,
  children,
  disabled,
  ...props
}: ButtonWithSpinnerProps) {
  return (
    <Button disabled={loading || disabled} {...props}>
      {loading ? (
        <>
          <Spinner className="size-4" />
          {loadingText || children}
        </>
      ) : (
        children
      )}
    </Button>
  )
}

export { ButtonWithSpinner }
