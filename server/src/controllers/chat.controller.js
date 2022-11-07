import { getMessagesByEmailService } from '../services/chat.services.js';

const getMessagesByEmail = async (req, res, next) => {
	try {
		const { email } = req.params;
		const messages = await getMessagesByEmailService(email);
		res.json(messages);
	} catch (error) {
		next(error);
	}
};

export { getMessagesByEmail };
