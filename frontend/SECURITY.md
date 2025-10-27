# 🔒 Security Implementation - Synapse BMS

## Architettura di Autenticazione

### Backend (Better Auth)
- **Session-based authentication** con cookie HTTP-only
- **CSRF protection** integrata in Better Auth
- **Password hashing** automatico con bcrypt
- **Trusted origins** configurati per CORS sicuro
- **Credentials mode** con cookie sicuri

### Frontend (React + Better Auth Client)

#### 1. Session Management
**File**: `frontend/src/modules/auth/hooks/use-session.ts`
- Hook React per gestire lo stato della sessione utente
- Fetch automatico della sessione all'avvio
- Refetch manuale disponibile per aggiornamenti
- Type-safe con interfacce TypeScript per User e Session

#### 2. Protected Routes
**File**: `frontend/src/modules/auth/components/protected-route.tsx`
- Componente wrapper per proteggere route sensibili
- Verifica presenza sessione prima del render
- Redirect automatico a `/login` se non autenticato
- Loading state con spinner durante verifica sessione
- Fallback personalizzabile per UI di caricamento

#### 3. Logout Sicuro
**File**: `frontend/src/modules/app/components/app-header.tsx`
- Bottone logout con chiamata API a Better Auth
- Invalidazione sessione lato server
- Redirect a `/login` dopo logout completato
- Loading state durante il processo
- Error handling per fallimenti di rete

#### 4. Dashboard Protetta
**File**: `frontend/src/modules/app/pages/dashboard-page.tsx`
- Pagina accessibile solo ad utenti autenticati
- Wrapped in `<ProtectedRoute>`
- Mostra informazioni utente dalla sessione
- Layout con header e logout integrato

## Best Practices Implementate

### 🔐 Security
1. **No token in localStorage**: sessioni gestite con cookie HTTP-only
2. **CORS configurato**: solo origin fidati possono fare richieste
3. **Credentials mode**: cookie inviati automaticamente con ogni richiesta
4. **Server-side session validation**: ogni richiesta verifica la sessione
5. **Automatic redirect**: utenti non autenticati vengono reindirizzati
6. **No sensitive data in client**: solo dati necessari esposti al frontend

### 🎯 UX
1. **Loading states**: feedback visivo durante operazioni async
2. **Error handling**: messaggi chiari per errori di rete/auth
3. **Smooth redirects**: transizioni fluide tra pagine pubbliche/protette
4. **Session persistence**: sessione mantenuta tra refresh (cookie)
5. **User info display**: nome/email visibili nell'header

### 🏗️ Architecture
1. **Separation of concerns**: auth logic separata da UI
2. **Reusable components**: `ProtectedRoute` riutilizzabile
3. **Custom hooks**: `useSession` per accesso sessione ovunque
4. **Type safety**: TypeScript per User/Session interfaces
5. **Centralized API**: tutte le chiamate auth passano per `modules/auth/lib/api.ts`

## Flow di Autenticazione

### Login/Signup
```
1. User compila form (email + password)
2. Frontend chiama POST /api/auth/sign-in/email o /sign-up/email
3. Backend valida credenziali e crea sessione
4. Backend imposta cookie HTTP-only con session token
5. Frontend riceve status 200
6. Redirect automatico a /dashboard
```

### Accesso a Route Protette
```
1. User naviga a /dashboard
2. <ProtectedRoute> chiama useSession()
3. useSession() fa GET /api/auth/session (cookie inviato automaticamente)
4. Backend valida session token dal cookie
5. Se valido: restituisce user + session data
6. Se invalido: status 401, redirect a /login
7. Se valido: render dashboard con user info
```

### Logout
```
1. User clicca bottone Logout
2. Frontend chiama POST /api/auth/sign-out
3. Backend invalida sessione e cancella cookie
4. Frontend riceve conferma
5. Redirect automatico a /login
```

## File Struttura

```
frontend/src/
├── modules/
│   ├── auth/
│   │   ├── hooks/
│   │   │   └── use-session.ts          # Hook per gestione sessione
│   │   ├── components/
│   │   │   ├── protected-route.tsx     # Wrapper per route protette
│   │   │   ├── login-form.tsx          # Form login (redirect a /dashboard)
│   │   │   └── signup-form.tsx         # Form signup (redirect a /dashboard)
│   │   └── lib/
│   │       └── api.ts                  # API calls (signIn, signUp, signOut, session)
│   └── app/
│       ├── components/
│       │   └── app-header.tsx          # Header con logout
│       ├── pages/
│       │   └── dashboard-page.tsx      # Dashboard protetta
│       └── app.tsx                     # Router principale
└── shared/
    └── lib/
        └── http.ts                     # Client HTTP con credentials

backend/src/
├── auth.ts                             # Better Auth config (trustedOrigins)
└── index.ts                            # Express + CORS config
```

## Variabili d'Ambiente

### Frontend (.env)
```bash
VITE_BACKEND_URL=http://localhost:4000
```

### Backend (.env)
```bash
# Server
PORT=4000
HOST=0.0.0.0

# Auth
BETTER_AUTH_SECRET=your-secret-key-here
FRONTEND_ORIGIN=http://localhost:5173

# Postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
POSTGRES_DB=synapse_bms
```

## Testing della Sicurezza

### Test Manuali
1. **Accesso non autenticato**: Naviga a `/dashboard` senza login → redirect a `/login`
2. **Login valido**: Login con credenziali corrette → redirect a `/dashboard`
3. **Logout**: Click su logout → redirect a `/login`, sessione invalidata
4. **Session persistence**: Refresh pagina su `/dashboard` → rimani autenticato
5. **Cookie inspection**: DevTools > Application > Cookies → verifica HTTP-only flag

### Test CORS
1. Apri DevTools > Network
2. Fai login
3. Verifica header risposta:
   - `Access-Control-Allow-Origin: http://localhost:5173`
   - `Access-Control-Allow-Credentials: true`
4. Verifica che cookie sia impostato con `SameSite` e `Secure` (in prod)

## Miglioramenti Futuri

### Security Enhancements
- [ ] Rate limiting su endpoint auth
- [ ] Email verification obbligatoria
- [ ] 2FA (Two-Factor Authentication)
- [ ] Password reset flow
- [ ] Session timeout configurabile
- [ ] Audit log per azioni sensibili

### UX Improvements
- [ ] Remember me checkbox
- [ ] Social login (Google, GitHub)
- [ ] Profile page per modifica dati
- [ ] Session management (vedi tutte le sessioni attive)
- [ ] Notifiche per login da nuovi dispositivi

### Architecture
- [ ] React Context per sessione globale (evitare prop drilling)
- [ ] React Query per caching sessione
- [ ] Middleware per route protection
- [ ] Refresh token rotation
- [ ] WebSocket authentication

## Riferimenti

- [Better Auth Documentation](https://www.better-auth.com/docs)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [MDN: HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
