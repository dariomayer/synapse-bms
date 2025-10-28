# Struttura Moduli

Questa directory contiene tutti i moduli dell'applicazione, organizzati secondo il principio di **domain-driven design**.

## Organizzazione

### Moduli Pubblici
Accessibili senza autenticazione:

- **`landing/`** - Landing page e sezioni marketing
- **`auth/`** - Autenticazione (login, signup, password reset)

### Moduli Protetti
Richiedono autenticazione (usano `ProtectedRoute`):

- **`dashboard/`** - Dashboard principale e overview
- **`settings/`** - Impostazioni utente (profilo, preferenze)

### Modulo Core
Componenti condivisi tra moduli protetti:

- **`core/`** - Layout, ProtectedRoute, AppHeader, utilities comuni

## Struttura di un Modulo

Ogni modulo segue questa struttura standard:

```
module-name/
├── components/          # Componenti specifici del modulo
├── hooks/              # Custom hooks del modulo
├── pages/              # Pagine del modulo
├── lib/                # Utilities e helpers
├── types/              # TypeScript types
└── router.tsx          # Router del modulo
```

## Come Aggiungere un Nuovo Modulo Protetto

### 1. Crea la struttura del modulo

```bash
mkdir -p src/modules/nome-modulo/{components,hooks,pages,lib,types}
```

### 2. Crea le pagine con ProtectedRoute

```tsx
// src/modules/nome-modulo/pages/example-page.tsx
import { ProtectedRoute } from "@/modules/core/components/protected-route"
import { AppLayout } from "@/modules/core/components/app-layout"

export function ExamplePage() {
  return (
    <ProtectedRoute>
      <AppLayout>
        {/* Contenuto della pagina */}
      </AppLayout>
    </ProtectedRoute>
  )
}
```

### 3. Crea il router del modulo

```tsx
// src/modules/nome-modulo/router.tsx
import { ExamplePage } from "./pages/example-page"

export function NomeModuloRouter() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  
  if (path === '/nome-modulo') {
    return <ExamplePage />
  }
  
  return null
}

export function isNomeModuloPath(path: string): boolean {
  return path.startsWith('/nome-modulo')
}
```

### 4. Registra il modulo in app.tsx

```tsx
// src/modules/app.tsx
import { NomeModuloRouter, isNomeModuloPath } from '@/modules/nome-modulo/router'

export function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  
  // Aggiungi il check per il nuovo modulo
  if (isNomeModuloPath(path)) {
    return <NomeModuloRouter />
  }
  
  // ... altri moduli
}
```

## Best Practices

### ✅ DO

- Usa `ProtectedRoute` per tutte le pagine che richiedono autenticazione
- Usa `AppLayout` per mantenere consistenza tra le pagine protette
- Mantieni ogni modulo indipendente e auto-contenuto
- Usa il router del modulo per gestire le route interne
- Condividi componenti comuni tramite il modulo `core/`

### ❌ DON'T

- Non creare dipendenze circolari tra moduli
- Non importare componenti da altri moduli di dominio (usa `core/` invece)
- Non mettere logica di business nel modulo `core/`
- Non duplicare componenti - spostali in `core/` se servono a più moduli

## Componenti Core Disponibili

### ProtectedRoute
Protegge le route richiedendo autenticazione:

```tsx
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

### AppLayout
Layout comune con header e container:

```tsx
<AppLayout maxWidth="lg">
  {/* Contenuto */}
</AppLayout>
```

Opzioni `maxWidth`: `"sm" | "md" | "lg" | "xl" | "2xl" | "full"`

### AppHeader
Header con logo, info utente e logout (incluso automaticamente in `AppLayout`)

## Esempi

Consulta i moduli esistenti per esempi di implementazione:

- **Dashboard semplice**: `dashboard/pages/dashboard-page.tsx`
- **Modulo multi-pagina**: `settings/` (profile, preferences)
- **Router complesso**: `settings/router.tsx`

## Template

Usa `module-template/` come punto di partenza per nuovi moduli.
