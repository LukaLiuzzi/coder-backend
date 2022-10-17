import crypto from 'crypto';
import { Product } from '../classes/ProductsClass.js';

const productsMap = {};

const createProduct = ({ data }) => {
	const id = crypto.randomBytes(10).toString('hex');
	const newProduct = new Product(id, data);

	productsMap[id] = newProduct;

	return newProduct;
};

const getProduct = ({ id }) => {
	if (!productsMap[id]) throw new Error('Product not found');

	return productsMap[id];
};

const getProducts = ({ field, value }) => {
	const products = Object.values(productsMap);

	if (field && value) {
		return products.filter((product) => product[field] == value);
	} else {
		return products;
	}
};

const updateProduct = ({ id, data }) => {
	if (!productsMap[id]) throw new Error('Product not found');

	const updatedProduct = new Product(id, data);

	productsMap[id] = updatedProduct;

	return updatedProduct;
};

const deleteProduct = ({ id }) => {
	if (!productsMap[id]) throw new Error('Product not found');

	const deletedProduct = productsMap[id];

	delete productsMap[id];

	return deletedProduct;
};

export { createProduct, getProduct, getProducts, updateProduct, deleteProduct };
