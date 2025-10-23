// backend/src/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/drizzle";

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret) {
  throw new Error("Missing BETTER_AUTH_SECRET environment variable");
}

export const auth = betterAuth({
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
