import { Router } from 'express';
import { getLogin, postLogin } from '../controllers/login.controllers.js';
import passport from 'passport';
const router = Router();

router.get('/', getLogin);

router.post('/', passport.authenticate('login'), postLogin);

export { router as loginRouter };
