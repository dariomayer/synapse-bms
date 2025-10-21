// backend/src/api/controllers/health.controller.ts
import { Request, Response } from 'express';
import { env } from '../../env';
import { pool } from '../../db';

export async function health(req: Request, res: Response) {
  res.json({ status: 'ok', service: 'backend', env: env.NODE_ENV });
}

export async function dbHealth(req: Request, res: Response) {
  try {
    const r = await pool.query('SELECT NOW() as now');
    res.json({ ok: true, now: r.rows[0]?.now });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err?.message ?? 'db error' });
  }
}
