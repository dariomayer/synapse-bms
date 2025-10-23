// backend/src/api/router.ts
import { Router } from 'express';
import health from './modules/health/route';

const api = Router();

api.use(health);

export default api;
