// backend/src/env.ts
import dotenv from 'dotenv';

dotenv.config();

const parseBoolean = (val: string | undefined, fallback = false): boolean => {
  if (val === undefined) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(val.toLowerCase());
};

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 4000),
  HOST: process.env.HOST ?? '0.0.0.0',
  APP_NAME: process.env.APP_NAME ?? 'synapse-bms-backend',
  // Postgres external connection
  PG_HOST: process.env.POSTGRES_HOST ?? process.env.PGHOST ?? 'localhost',
  PG_PORT: Number(process.env.POSTGRES_PORT ?? process.env.PGPORT ?? 5432),
  PG_USER: process.env.POSTGRES_USER ?? process.env.PGUSER ?? 'postgres',
  PG_PASSWORD: process.env.POSTGRES_PASSWORD ?? process.env.PGPASSWORD ?? '',
  PG_DATABASE: process.env.POSTGRES_DB ?? process.env.PGDATABASE ?? 'postgres',
  PG_SSL: parseBoolean(process.env.POSTGRES_SSL ?? process.env.PGSSL, false),
  // DB session timeouts (milliseconds)
  DB_STATEMENT_TIMEOUT_MS: Number(process.env.DB_STATEMENT_TIMEOUT_MS ?? 60_000),
  DB_IDLE_IN_TX_TIMEOUT_MS: Number(process.env.DB_IDLE_IN_TX_TIMEOUT_MS ?? 120_000),
  DB_LOCK_TIMEOUT_MS: Number(process.env.DB_LOCK_TIMEOUT_MS ?? 5_000),
};
