// backend/drizzle.config.ts
import type { Config } from 'drizzle-kit';
import { config as loadEnv } from 'dotenv';

// Quando eseguito da backend/, carica .env locale
loadEnv({ path: '.env' });

const useSSL = (process.env.POSTGRES_SSL ?? 'false').toLowerCase() === 'true';

export default {
  schema: './src/db/schema/*.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: Number(process.env.POSTGRES_PORT ?? 5432),
    user: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? '',
    database: process.env.POSTGRES_DB ?? 'postgres',
    ssl: useSSL ? { rejectUnauthorized: false } : undefined,
  },
} satisfies Config;
