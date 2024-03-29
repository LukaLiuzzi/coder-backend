import { Router } from 'express';
import {
	getProducts,
	postProduct,
	getProduct,
	putProduct,
	deleteProduct,
} from '../controllers/products.controllers.js';
import { checkRoleAuth } from '../middlewares/checkRoleAuth.js';
const router = Router();

router.get('/', getProducts);

router.post('/', checkRoleAuth(['admin']), postProduct);

router.get('/:id', getProduct);

router.put('/:id', checkRoleAuth(['admin']), putProduct);

router.delete('/:id', checkRoleAuth(['admin']), deleteProduct);

export { router as productsRouter };
