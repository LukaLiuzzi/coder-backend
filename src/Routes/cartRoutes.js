import { Router } from 'express';
const router = Router();
import {
	deleteCart,
	getProductsById,
	postCart,
	deleteProductFromCart,
	addProductToCart,
} from '../controllers/cartControllers.js';

router.post('/', postCart);

router.delete('/:id', deleteCart);

router.get('/:id/productos', getProductsById);

router.post('/:id/productos', addProductToCart);

router.delete('/:id/productos/:id_prod', deleteProductFromCart);

export default router;
