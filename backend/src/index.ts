// backend/src/index.ts
import http from 'http';
import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { env } from './env';
import { initDb, pool } from './db';
import healthRoutes from './api/routes/health.routes';

async function main() {
  await initDb();

  const app = express();
  app.use(cors());
  app.use(express.json());

  // Routers
  app.use('/', healthRoutes);

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

  const gracefulShutdown = (signal: string) => {
    // eslint-disable-next-line no-console
    console.log(`\n${signal} received. Shutting down gracefully...`);
    try {
      wss.close(() => {
        // eslint-disable-next-line no-console
        console.log('WebSocket server closed');
      });
      server.close(async () => {
        // eslint-disable-next-line no-console
        console.log('HTTP server closed');
        try {
          await pool.end();
          // eslint-disable-next-line no-console
          console.log('Postgres pool closed');
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Error closing Postgres pool', e);
        } finally {
          process.exit(0);
        }
      });
      // Force close lingering WS after timeout
      setTimeout(() => {
        wss.clients.forEach((client) => {
          try { client.terminate(); } catch { /* ignore */ }
        });
      }, 1_000).unref();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Graceful shutdown error', e);
      process.exit(1);
    }
  };

  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Fatal startup error', err);
  process.exit(1);
});
