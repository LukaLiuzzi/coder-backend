const { Router } = require('express');
const router = Router();

const {
	renderForm,
	getProducts,
	saveProducts,
} = require('../controllers/productsControllers');

router.get('/', renderForm);

router.get('/productos', getProducts);

router.post('/productos', saveProducts);

module.exports = router;
