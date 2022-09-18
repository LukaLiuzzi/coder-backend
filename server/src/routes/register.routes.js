import { Router } from 'express';
import passport from 'passport';
import { postRegister } from '../controllers/register.controllers.js';
import { upload } from '../multer/index.js';
const router = Router();

router.post(
	'/',
	upload.single('avatar'),
	passport.authenticate('register'),
	postRegister
);

export { router as registerRouter };
