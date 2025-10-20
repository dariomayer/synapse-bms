// backend/src/index.ts
import http from 'http';
import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { env } from './env';
import { initDb, pool } from './db';

async function main() {
  await initDb();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'backend', env: env.NODE_ENV });
  });

  app.get('/db-health', async (_req, res) => {
    try {
      const r = await pool.query('SELECT NOW() as now');
      res.json({ ok: true, now: r.rows[0]?.now });
    } catch (err: any) {
      res.status(500).json({ ok: false, error: err?.message ?? 'db error' });
    }
  });

  const server = http.createServer(app);

  const wss = new WebSocketServer({ server, path: '/ws' });
  wss.on('connection', (socket) => {
    socket.send(JSON.stringify({ type: 'welcome', ts: Date.now() }));
    socket.on('message', (data) => {
      // echo for now
      socket.send(data);
    });
  });

  server.listen(env.PORT, env.HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://${env.HOST}:${env.PORT}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Fatal startup error', err);
  process.exit(1);
});
