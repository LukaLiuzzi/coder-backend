import ProductsDaoMongo from '../daos/productsDaoMongo.js';
const productsDaoMongo = new ProductsDaoMongo();
const getProducts = () => {
	return productsDaoMongo.getAll();
};

const getProductById = (id) => {
	return productsDaoMongo.getById(id);
};

const saveProduct = (product) => {
	return productsDaoMongo.save(product);
};

const updateProduct = (id, product) => {
	return productsDaoMongo.updateById(id, product);
};

const deleteProduct = (id) => {
	return productsDaoMongo.deleteById(id);
};

export default {
	getProducts,
	saveProduct,
	updateProduct,
	deleteProduct,
	getProductById,
};
