import {
	sendMailToAdminOnCheckout,
	sendMessageToUserOnCheckout,
	sendWhatsappToAdminOnCheckout,
} from '../services/checkout.services.js';

const postCheckout = (req, res) => {
	const { user, cart } = req.body;
	try {
		sendMailToAdminOnCheckout({ user, cart });
		sendWhatsappToAdminOnCheckout({ user, cart });
		sendMessageToUserOnCheckout({ user });
		res.json({ message: 'Checkout done' });
	} catch (error) {
		res.status(500).json({ message: 'Internal error on checkout' });
	}
};

export { postCheckout };
