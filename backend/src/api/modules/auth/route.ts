// backend/src/api/modules/auth/route.ts
import { Router } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from '../../../auth';

/**
 * Modulo Auth (Better Auth)
 *
 * Questo router incapsula l'handler di Better Auth esponendo le rotte sotto il prefisso /api/auth/*.
 * Va montato prima di express.json() per evitare richieste bloccate (hanging) lato client.
 *
 * Rotte principali utilizzate (namespace: /api/auth):
 * - POST /sign-up/email
 * - POST /sign-in/email
 * - POST /sign-out
 * - GET  /get-session
 *
 * Riferimento schema DB (Drizzle) generato per Better Auth:
 * - user          → gestione profili utente (id, name, email, emailVerified, image, createdAt, updatedAt)
 * - session       → sessioni applicative (id, token, expiresAt, ipAddress, userAgent, userId, timestamps)
 * - account       → account/provider social e credenziali (providerId, accountId, token, password, ecc.)
 * - verification  → token/verifiche temporanee (identifier, value, expiresAt, timestamps)
 */

const router = Router();

// Espone tutte le route Better Auth sotto /api/auth/*
// Importante: questo router deve essere montato PRIMA di express.json()
router.all('/auth/*', toNodeHandler(auth));

export default router;
