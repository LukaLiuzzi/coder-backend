import { Router } from 'express';
import {
	getOrdersByUser,
	postCheckout,
} from '../controllers/checkout.controller.js';
import { checkAuthentication } from '../middlewares/checkUser.js';
const router = Router();

router.post('/', checkAuthentication, postCheckout);

router.get('/orders', checkAuthentication, getOrdersByUser);

export { router as checkoutRouter };
