import { getMessagesByEmailService } from '../services/chat.services.js';

const getMessagesByEmail = async (req, res, next) => {
	if (!req.params.email) {
		return next(new Error('Email is required'));
	}
	try {
		const { email } = req.params;
		const messages = await getMessagesByEmailService(email);
		res.json(messages);
	} catch (error) {
		next(error);
	}
};

export { getMessagesByEmail };
