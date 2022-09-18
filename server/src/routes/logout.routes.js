import { Router } from 'express';
import { getLogout } from '../controllers/logout.controllers.js';
const router = Router();

router.get('/', getLogout);

export { router as logoutRouter };
