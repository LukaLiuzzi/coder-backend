import CartsDaoMongo from '../daos/cartsDaoMongo.js';

const cartsDaoMongo = new CartsDaoMongo();

const postCart = () => {
	return cartsDaoMongo.createCart();
};

const deleteCart = (id) => {
	return cartsDaoMongo.deleteById(id);
};

const getProductsById = (id) => {
	return cartsDaoMongo.getProductsById(id);
};

const deleteProductFromCart = (id, id_prod) => {
	return cartsDaoMongo.deleteProductFromCart(id, id_prod);
};

const addProductToCart = (cartId, productId) => {
	return cartsDaoMongo.addProductToCart(cartId, productId);
};

export default {
	postCart,
	deleteCart,
	getProductsById,
	deleteProductFromCart,
	addProductToCart,
};
