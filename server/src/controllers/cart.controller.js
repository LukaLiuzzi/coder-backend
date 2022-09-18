import {
	getCartService,
	postCartService,
	deleteCartService,
	putCartService,
} from '../services/cart.services.js';

const getCart = async (req, res) => {
	try {
		const cart = await getCartService(req.user._id);
		res.json(cart);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

const postCart = async (req, res) => {
	try {
		const cart = await postCartService(req.user._id, req.body);
		res.json(cart);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

const deleteCart = async (req, res) => {
	try {
		const cart = await deleteCartService(req.user._id, req.body);
		res.json(cart);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

const putCart = async (req, res) => {
	try {
		const cart = await putCartService(req.user._id, req.body);
		res.json(cart);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

export { getCart, postCart, deleteCart, putCart };
