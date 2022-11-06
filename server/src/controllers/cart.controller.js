import {
	getCartService,
	postCartService,
	deleteCartService,
	putCartService,
} from '../services/cart.services.js';

const getCart = async (req, res, next) => {
	try {
		const cart = await getCartService(req.user._id);
		res.json(cart);
	} catch (error) {
		next(error);
	}
};

const postCart = async (req, res, next) => {
	if (!req.body.productId) {
		return next(new Error('productId is required'));
	}

	if (!req.body.quantity) {
		return next(new Error('quantity is required'));
	}

	try {
		const cart = await postCartService(req.user._id, req.body);
		res.json(cart);
	} catch (error) {
		next(error);
	}
};

const deleteCart = async (req, res, next) => {
	if (!req.body.productId) {
		return next(new Error('productId is required'));
	}

	if (!req.body.quantity) {
		return next(new Error('quantity is required'));
	}

	try {
		const cart = await deleteCartService(req.user._id, req.body);
		res.json(cart);
	} catch (error) {
		next(error);
	}
};

const putCart = async (req, res, next) => {
	try {
		const cart = await putCartService(req.user._id, req.body);
		res.json(cart);
	} catch (error) {
		next(error);
	}
};

export { getCart, postCart, deleteCart, putCart };
