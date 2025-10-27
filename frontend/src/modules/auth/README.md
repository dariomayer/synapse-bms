# Modulo Autenticazione

## Panoramica

Il modulo di autenticazione implementa le best practices enterprise utilizzando:
- **React Hook Form** per la gestione dei form
- **Zod** per la validazione type-safe degli schemi
- **Design System centralizzato** per consistenza visiva

## Struttura

```
auth/
├── components/
│   ├── auth-shell.tsx      # Container layout per pagine auth
│   ├── login-form.tsx       # Form di login con validazione
│   └── signup-form.tsx      # Form di registrazione con validazione
├── lib/
│   ├── api.ts              # API calls per autenticazione
│   └── schemas.ts          # Schema Zod per validazione form
└── README.md               # Questa documentazione
```

## Design System

### Colori Utilizzati

Tutti i componenti utilizzano i token CSS del design system globale (`/src/styles/index.css`):

- **Primary (Arancione)**: Colore principale per CTA e azioni importanti (bottoni submit, link)
- **Secondary (Nero/Bianco)**: Accenti e elementi secondari
- **Accent (Grigio)**: Background alternativo per sezioni
- **Muted**: Testo secondario e background sottili
- **Destructive**: Messaggi di errore
- **Border/Input**: Bordi e campi input

**Filosofia**: Ispirato a Butlr.com - alto contrasto nero/bianco con arancione per CTA

### Componenti Form

I form utilizzano i componenti wrapper in `/src/shared/ui/form.tsx` che integrano:
- `FormField`: Controller per campi con validazione
- `FormItem`: Container per singolo campo
- `FormLabel`: Label accessibile
- `FormControl`: Wrapper per input con aria-attributes
- `FormDescription`: Testo di aiuto
- `FormMessage`: Messaggi di errore automatici

## Schema di Validazione

### Login Schema

```typescript
{
  email: string (required, valid email)
  password: string (required, min 8 chars)
}
```

### Signup Schema

```typescript
{
  name: string (optional)
  email: string (required, valid email)
  password: string (required, min 8 chars, must contain uppercase, lowercase, number)
  confirmPassword: string (required, must match password)
}
```

## UX Features

### Validazione Real-time
- Validazione on-blur per feedback immediato
- Messaggi di errore specifici per ogni campo
- Validazione cross-field (es. password match)

### Stati UI
- Loading state durante submit
- Disabled state per prevenire doppi submit
- Errori server separati da errori validazione

### Accessibilità
- Label associate correttamente agli input
- Aria-attributes per screen reader
- Focus management automatico
- Messaggi di errore annunciati

## Modifiche Future

Per modificare lo stile globalmente:

1. **Colori**: Modifica i token CSS in `/src/styles/index.css`
2. **Radius**: Modifica `--radius` in `/src/styles/index.css`
3. **Spacing**: Usa le classi Tailwind standard (già responsive)
4. **Typography**: Modifica font-family in `/src/styles/index.css`

Tutti i componenti auth si aggiorneranno automaticamente! 🎨

## Best Practices Implementate

✅ Type-safe validation con Zod  
✅ Gestione errori robusta (client + server)  
✅ Design system centralizzato  
✅ Componenti riutilizzabili  
✅ Accessibilità WCAG compliant  
✅ Performance ottimizzate (meno re-render)  
✅ UX moderna con feedback real-time  
