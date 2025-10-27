// backend/src/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/drizzle";
import { env } from "./env";

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret) {
  throw new Error("Missing BETTER_AUTH_SECRET environment variable");
}

export const auth = betterAuth({
  // Consenti richieste da questi origin (necessario con credenziali e CORS)
  trustedOrigins: [
    process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    // Calcola automaticamente l'origin del backend per scenari same-origin
    (() => {
      const host = env.HOST && env.HOST !== "0.0.0.0" ? env.HOST : "localhost"
      return `http://${host}:${env.PORT}`
    })(),
  ],
  // Abilita email & password
  emailAndPassword: {
    enabled: true,
  },
  // Drizzle adapter su Postgres
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret,
});
