import { Router } from 'express';
import {
	deleteProduct,
	getProducts,
	saveProduct,
	updateProduct,
} from '../controllers/productsControllers.js';
const router = Router();
import auth from '../server.js';

router.get('/:id?', getProducts);

router.post('/', auth, saveProduct);

router.put('/:id', auth, updateProduct);

router.delete('/:id', auth, deleteProduct);

export default router;
