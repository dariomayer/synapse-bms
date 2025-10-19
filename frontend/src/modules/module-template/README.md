# Module Template

Struttura base per creare un nuovo modulo con i18n per-modulo e lazy loading.

## Struttura

```
src/modules/module-template/
├─ i18n/
│  ├─ en.json
│  ├─ it.json
│  └─ index.ts   # ensureModuleTemplateI18n()
```

## Come usarlo

1. Copia la cartella `module-template` e rinominala con il nome del tuo modulo, ad esempio `projects`.
2. Aggiorna il namespace in `i18n/index.ts`:
   ```ts
   // src/modules/projects/i18n/index.ts
   import { createModuleI18nLoader } from '@/shared/i18n/module-loader'
   export const ensureProjectsI18n = createModuleI18nLoader(
     'projects',
     (lang: string) => import(`./${lang}.json`),
     () => import('./en.json'),
   )
   ```
3. Aggiorna i contenuti di `en.json` e `it.json` con le stringhe del tuo modulo.
4. Nel componente/pagina principale del modulo, invoca il loader in mount:
   ```tsx
   import { useEffect } from 'react'
   import { useTranslation } from 'react-i18next'
   import { ensureProjectsI18n } from '@/modules/projects/i18n'

   export function ProjectsPage() {
     useEffect(() => { void ensureProjectsI18n() }, [])
     const { t } = useTranslation('projects')
     return <div>{t('title')}</div>
   }
   ```

## Note
- I file JSON non supportano commenti.
- Il fallback lingua predefinito è `en`.
- Mantieni il namespace coerente (es. `'projects'`) e usalo in `useTranslation('<ns>')`.
