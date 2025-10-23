// backend/src/api/README.md
# API: struttura e convenzioni

Questa directory contiene l'API HTTP del backend organizzata per moduli di dominio, con routing versionato e separazione chiara delle responsabilità.

## Struttura delle cartelle
```
backend/src/api/
  router.ts                # Router aggregatore montato in /api/v1
  modules/
    <module>/
      route.ts             # Definisce le rotte del modulo (Express Router)
      controller.ts        # Orchestrazione I/O HTTP (chiama services)
      service.ts           # Logica di business (facoltativo ma consigliato)
      validators.ts        # Validazioni input (es. zod) (opzionale)
      index.ts             # Barrel export (opzionale)
  middlewares/             # Middleware condivisi (auth, error handler, logging)
  utils/                   # Helper condivisi (asyncHandler, mappers, ecc.)
```

## Moduli: come crearli
1. Crea la cartella del modulo: `backend/src/api/modules/<nome-modulo>/`
2. Aggiungi i file minimi: `route.ts`, `controller.ts` (ed eventualmente `service.ts`, `validators.ts`)
3. Registra il router del modulo in `backend/src/api/router.ts`
4. Le rotte saranno esposte sotto il prefisso `/api/v1` (versioning centrale in `backend/src/index.ts`)

Esempio di registrazione in `router.ts`:
```ts
import { Router } from 'express';
import health from './modules/health/route';
// import devices from './modules/devices/route';

const api = Router();
api.use(health);
// api.use(devices);
export default api;
```

## Convenzioni di naming
- Directory e file modulo: kebab-case o lower-case semplice (es. `devices`, `points`).
- File per ruolo chiaro: `route.ts`, `controller.ts`, `service.ts`, `validators.ts`.
- Evita nomi puntati (es. `health.routes.ts`): la gerarchia di cartelle già "namespacizza" il modulo.
- Variabili/metodi: camelCase. Tipi/Classi: PascalCase. Costanti globali: UPPER_CASE.

## Separazione delle responsabilità
- `route.ts`: definisce gli endpoint e collega i controller.
- `controller.ts`: riceve Request/Response, valida input, chiama i services, struttura l'output; niente business complesso qui.
- `service.ts`: implementa la logica applicativa e accede al DB (`db` o `pool`). Facilita testing unitario.
- `validators.ts`: definisce gli schemi di validazione (es. zod) e middleware di validazione.
- `middlewares/`: cross-cutting concerns (auth, RBAC, error handling, rate limit, logging).

## Versioning e base path
- Il router aggregatore (`backend/src/api/router.ts`) è montato in `backend/src/index.ts` sotto `/api/v1`.
- Per introdurre una nuova versione, aggiungere un nuovo aggregatore o montare in `/api/v2` mantenendo compatibilità.

## Accesso al database
- Preferisci i services per interagire con il DB.
- Usa Drizzle `db` (`backend/src/db/drizzle.ts`) per query tipizzate (`schema.*`).
- Puoi usare anche query raw su `pool` quando serve prestazione/controllo (evitare nel controller).

## Validazione e error handling
- Usa `validators.ts` con zod (o simile) per validare `req.params`, `req.query`, `req.body`.
- Gestisci gli errori con middleware dedicato (es. `middlewares/error-handler.ts`) e wrapper `asyncHandler` per funzioni async.

## Esempio: scheletro modulo
```
modules/devices/
  route.ts
  controller.ts
  service.ts
  validators.ts
```
- `route.ts`: definire endpoints CRUD (`GET /devices`, `POST /devices`, `GET /devices/:id`, ...)
- `controller.ts`: mappa I/O HTTP ↔ service
- `service.ts`: usa `db.schema.devices` per CRUD/queries, gestisce transazioni se necessarie
- `validators.ts`: schemi zod e middleware per input sicuri

## Import e alias (opzionale)
- Se gli import relativi diventano profondi, valuta alias in `tsconfig.json` (es. `@api/*`, `@db/*`). Mantieni coerenza ed evita cicli.

## Testing (consigliato)
- Test unitari per `service.ts` (isolati dal web), test di integrazione per `route.ts` con supertest.
