import {
	sendMailToAdminOnCheckout,
	sendMessageToUserOnCheckout,
	sendWhatsappToAdminOnCheckout,
} from '../services/checkout.services.js';

const postCheckout = (req, res, next) => {
	const { user, cart } = req.body;
	if (!user) {
		return next(new Error('user is required'));
	}

	if (!cart) {
		return next(new Error('cart is required'));
	}

	try {
		sendMailToAdminOnCheckout({ user, cart });
		sendWhatsappToAdminOnCheckout({ user, cart });
		sendMessageToUserOnCheckout({ user });
		res.json({ message: 'Checkout done' });
	} catch (error) {
		next(error);
	}
};

export { postCheckout };
