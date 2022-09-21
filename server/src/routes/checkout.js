import { Router } from 'express';
import { postCheckout } from '../controllers/checkout.controller.js';
import { checkAuthentication } from '../middlewares/checkUser.js';
const router = Router();

router.post('/', checkAuthentication, postCheckout);

export { router as checkoutRouter };
