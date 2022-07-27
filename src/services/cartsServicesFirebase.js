import { CartsDao } from '../daos/index.js';

const postCart = () => {
	return CartsDao.createCart();
};

const deleteCart = (id) => {
	return CartsDao.deleteById(id);
};

const getProductsById = (id) => {
	return CartsDao.getProductsById(id);
};

const deleteProductFromCart = (id, id_prod) => {
	return CartsDao.deleteProductFromCart(id, id_prod);
};

const addProductToCart = (cartId, productId) => {
	return CartsDao.addProductToCart(cartId, productId);
};

export default {
	postCart,
	deleteCart,
	getProductsById,
	deleteProductFromCart,
	addProductToCart,
};
