// tailwind.config.js
/**
 * Stub per compatibilità CLI Shadcn con Tailwind v4.
 * Tailwind v4 funziona tramite @import, @plugin e @theme inline nel CSS (vedi src/styles/index.css).
 * I colori e dark mode sono gestiti tramite @theme inline, non servono configurazioni qui.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,css}"],
  theme: {},
  plugins: [],
}
