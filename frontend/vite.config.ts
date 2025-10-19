// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // __dirname non esiste in ESM: lo ricaviamo da import.meta.url
      '@': resolve(dirname(fileURLToPath(import.meta.url)), 'src'),
    },
  },
})
