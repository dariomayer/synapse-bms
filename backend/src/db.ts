// backend/src/db.ts
import { Pool, PoolConfig } from 'pg';
import { env } from './env';

const pgConfig: PoolConfig = {
  host: env.PG_HOST,
  port: env.PG_PORT,
  user: env.PG_USER,
  password: env.PG_PASSWORD,
  database: env.PG_DATABASE,
  ssl: env.PG_SSL ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
};

export const pool = new Pool(pgConfig);

export async function initDb(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
    // ok
  } finally {
    client.release();
  }
}
