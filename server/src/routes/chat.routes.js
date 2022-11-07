import { Router } from 'express';
import { getMessagesByEmail } from '../controllers/chat.controller.js';
import { checkAuthentication } from '../middlewares/checkUser.js';
const router = Router();

router.get('/:email', checkAuthentication, getMessagesByEmail);

export { router as chatRouter };
