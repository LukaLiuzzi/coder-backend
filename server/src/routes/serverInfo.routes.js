import { Router } from 'express';
import { serverInfo } from '../controllers/serverInfo.controller.js';
import { checkRoleAuth } from '../middlewares/checkRoleAuth.js';
const router = Router();

router.get('/', checkRoleAuth(['admin']), serverInfo);

export { router as serverInfoRouter };
