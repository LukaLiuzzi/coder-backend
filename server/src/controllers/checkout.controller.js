import { Logger } from '../logger/index.js';
import {
	generateOrder,
	getOrdersByUserService,
	sendMailToAdminOnCheckout,
	sendMessageToUserOnCheckout,
	sendWhatsappToAdminOnCheckout,
} from '../services/checkout.services.js';

const postCheckout = async (req, res, next) => {
	const { user, cart } = req.body;
	// * Check if data exists
	if (!user) {
		return next(new Error('user is required'));
	}

	if (!cart) {
		return next(new Error('cart is required'));
	}

	try {
		await generateOrder({ user, products: cart.products });
		sendMailToAdminOnCheckout({ user, cart });
		sendWhatsappToAdminOnCheckout({ user, cart });
		sendMessageToUserOnCheckout({ user });
		res.json({ message: 'Checkout done' });
	} catch (error) {
		next(error);
	}
};

const getOrdersByUser = async (req, res, next) => {
	// * Check if data exists
	if (!req.user._id) {
		return next(new Error('user is required'));
	}

	try {
		const orders = await getOrdersByUserService(req.user._id);
		res.json(orders);
	} catch (error) {
		Logger.error(`Error on getOrdersByUser: ${error}`);
		next(error);
	}
};

export { postCheckout, getOrdersByUser };
