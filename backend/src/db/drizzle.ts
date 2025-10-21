// backend/src/db/drizzle.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema/index';
import { pool } from '../db';

export const db = drizzle(pool, { schema });
export { schema };
