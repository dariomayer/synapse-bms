// backend/src/api/routes/health.routes.ts
import { Router } from 'express';
import { health, dbHealth } from '../../api/controllers/health.controller';

const router = Router();

router.get('/health', health);
router.get('/db-health', dbHealth);

export default router;
