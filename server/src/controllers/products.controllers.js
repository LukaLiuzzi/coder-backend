import {
	getProductsService,
	postProductService,
	getProductService,
	putProductService,
	deleteProductService,
} from '../services/products.services.js';

const getProducts = async (req, res, next) => {
	const { category } = req.query;
	try {
		const products = await getProductsService(category);
		res.json(products);
	} catch (error) {
		next(error);
	}
};

const postProduct = async (req, res, next) => {
	if (!req.body.name) {
		return next(new Error('name is required'));
	}

	if (!req.body.price) {
		return next(new Error('price is required'));
	}

	if (!req.body.stock) {
		return next(new Error('stock is required'));
	}

	if (!req.body.category) {
		return next(new Error('category is required'));
	}

	if (!req.body.image) {
		return next(new Error('image is required'));
	}

	try {
		const product = await postProductService(req.body);
		res.json(product);
	} catch (error) {
		next(error);
	}
};

const getProduct = async (req, res, next) => {
	if (!req.params.id) {
		return next(new Error('id is required'));
	}

	try {
		const product = await getProductService(req.params.id);
		res.json(product);
	} catch (error) {
		next(error);
	}
};

const putProduct = async (req, res, next) => {
	if (!req.params.id) {
		return next(new Error('id is required'));
	}

	try {
		const product = await putProductService(req.params.id, req.body);
		res.json(product);
	} catch (error) {
		next(error);
	}
};

const deleteProduct = async (req, res, next) => {
	if (!req.params.id) {
		return next(new Error('id is required'));
	}

	try {
		const product = await deleteProductService(req.params.id);
		res.json(product);
	} catch (error) {
		next(error);
	}
};

export { getProducts, postProduct, getProduct, putProduct, deleteProduct };
