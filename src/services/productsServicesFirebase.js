import { ProductsDao } from '../daos/index.js';

const getProducts = () => {
	return ProductsDao.getAll();
};

const getProductById = (id) => {
	return ProductsDao.getById(id);
};

const saveProduct = (product) => {
	return ProductsDao.save(product);
};

const updateProduct = (id, product) => {
	return ProductsDao.updateById(id, product);
};

const deleteProduct = (id) => {
	return ProductsDao.deleteById(id);
};

export default {
	getProducts,
	saveProduct,
	updateProduct,
	deleteProduct,
	getProductById,
};
