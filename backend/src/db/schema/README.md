// backend/src/db/schema/README.md
# Schema DB (Drizzle): struttura e convenzioni

Questa directory contiene lo schema del database organizzato per moduli/domini, con migrazioni gestite da drizzle‑kit.

## Struttura delle cartelle
```
backend/src/db/schema/
  devices.ts        # tabella dispositivi
  points.ts         # tabella punti/variabili legate ai device
  trends.ts         # tabella storicizzazione valori
  index.ts          # barrel export (riesporta tutte le tabelle)
```

Puoi estendere con sottocartelle per domini più complessi (es. `auth/`, `integrations/`); in tal caso aggiorna il glob in `drizzle.config.ts` a `./src/db/schema/**/*.ts`.

## Convenzioni di naming
- Tabelle/colonne in `snake_case` (es. `created_at`).
- PK primaria `id` (`uuid` per entità, `serial` per time‑series/append‑only).
- Timestamp: `created_at` (e `updated_at` se necessario).
- Indici e vincoli definiti nel file della tabella (es. unique e index in `points.ts`, index temporale in `trends.ts`).

## Relazioni e vincoli
- Definisci FK con `references(..., { onDelete })` vicino alla tabella figlia.
- Aggiungi indici per i pattern di query reali:
  - `points(device_id, key)` unique per evitare duplicati dello stesso punto per device.
  - `trends(point_id, ts)` index per query temporali per punto.

## Migrazioni (drizzle‑kit)
- Genera SQL da schema TS: `pnpm run db:generate` (root monorepo)
- Applica le migrazioni al DB: `pnpm run db:migrate`
- Sincronizza (generate + migrate): `pnpm run db:sync`
- Le migrazioni sono salvate in `backend/drizzle/` e tracciate per ambiente.

## Linee guida di modifica
- Piccoli cambi atomici con descrizione chiara nel commit.
- Evita breaking changes non necessari; se servono, prevedi script di data‑migration.
- Mantieni i vincoli (FK/unique) aderenti al modello dati e ai casi d’uso delle API.

## Accesso ai tipi/DB in runtime
- Client Drizzle: `backend/src/db/drizzle.ts`
- Import tipizzato nei servizi:
  ```ts
  import { db, schema } from '../../db/drizzle';
  const rows = await db.select().from(schema.devices);
  ```

## QA e test
- Verifica sempre la generazione delle migrazioni prima dell’applicazione.
- Integrazione con CI: eseguire `db:generate` (diff check) e `db:migrate` su ambienti di test.
