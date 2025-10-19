// src/main.tsx
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { initPromise } from './shared/i18n/config'
import { App } from './modules/app/app'

// Aspetta che i18n sia completamente inizializzato prima di renderizzare
initPromise.then(() => {
  const root = createRoot(document.getElementById('root')!)
  root.render(<App />)
})
