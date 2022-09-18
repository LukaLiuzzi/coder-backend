import { Router } from 'express';
import {
	getCart,
	postCart,
	deleteCart,
	putCart,
} from '../controllers/cart.controller.js';
import { checkAuthentication } from '../middlewares/checkUser.js';
const router = Router();

router.get('/', checkAuthentication, getCart);

router.post('/', checkAuthentication, postCart);

router.delete('/', checkAuthentication, deleteCart);

router.put('/', checkAuthentication, putCart);

export { router as cartRouter };
