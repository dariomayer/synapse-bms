// backend/src/api/modules/health/route.ts
import { Router } from 'express';
import { health, dbHealth } from './controller';

const router = Router();

router.get('/health', health);
router.get('/db-health', dbHealth);

export default router;
