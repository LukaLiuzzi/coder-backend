import { Router } from 'express';
import passport from 'passport';
import { postRegister } from '../controllers/register.controllers.js';
const router = Router();

router.post('/', passport.authenticate('register'), postRegister);

export { router as registerRouter };
