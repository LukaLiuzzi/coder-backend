import {
	getProductsService,
	postProductService,
	getProductService,
	putProductService,
	deleteProductService,
} from '../services/products.services.js';

const getProducts = async (req, res) => {
	try {
		const products = await getProductsService();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const postProduct = async (req, res) => {
	try {
		const product = await postProductService(req.body);
		res.json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getProduct = async (req, res) => {
	try {
		const product = await getProductService(req.params.id);
		res.json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const putProduct = async (req, res) => {
	try {
		const product = await putProductService(req.params.id, req.body);
		res.json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteProduct = async (req, res) => {
	try {
		const product = await deleteProductService(req.params.id);
		res.json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export { getProducts, postProduct, getProduct, putProduct, deleteProduct };
