// backend/src/index.ts
import http from 'http';
import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { env } from './env';
import { initDb, pool } from './db';
import apiRouter from './api/router';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth';

async function main() {
  await initDb();

  const app = express();
  app.use(cors());

  // Better Auth handler MUST be mounted before express.json
  // to avoid hanging requests from the client API
  app.all('/api/auth/*', toNodeHandler(auth));

  // Apply JSON parser after Better Auth or only to non-auth routes
  app.use(express.json());

  // Routers
  app.use('/api/v1', apiRouter);

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
