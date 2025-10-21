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

// Imposta parametri di sessione su ogni nuova connessione
pool.on('connect', async (client) => {
  try {
    const appName = env.APP_NAME.replace(/'/g, "''");
    await client.query(`SET application_name TO '${appName}'`);
    await client.query(`SET statement_timeout TO ${env.DB_STATEMENT_TIMEOUT_MS}`);
    await client.query(
      `SET idle_in_transaction_session_timeout TO ${env.DB_IDLE_IN_TX_TIMEOUT_MS}`
    );
    await client.query(`SET lock_timeout TO ${env.DB_LOCK_TIMEOUT_MS}`);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to SET session parameters', e);
  }
});

pool.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('Unexpected PG pool error', err);
});

export async function initDb(maxRetries = 5): Promise<void> {
  let attempt = 0;
  let lastErr: unknown;
  while (attempt <= maxRetries) {
    try {
      const client = await pool.connect();
      try {
        await client.query('SELECT 1');
        client.release();
        return; // ok
      } catch (e) {
        client.release();
        throw e;
      }
    } catch (err) {
      lastErr = err;
      const delay = Math.min(1000 * 2 ** attempt, 10_000);
      // eslint-disable-next-line no-console
      console.warn(
        `DB connection attempt ${attempt + 1} failed. Retrying in ${delay}ms...`
      );
      await new Promise((res) => setTimeout(res, delay));
      attempt += 1;
    }
  }
  // eslint-disable-next-line no-console
  console.error('DB initialization failed after retries', lastErr);
  throw lastErr instanceof Error ? lastErr : new Error('DB init failed');
}
