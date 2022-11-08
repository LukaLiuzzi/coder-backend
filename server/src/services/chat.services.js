import { MessageModel } from '../models/message.model.js';

const getMessagesByEmailService = async (email) => {
	const messages = await MessageModel.find({ email });
	if (!messages) {
		throw new Error('Messages not found');
	}
	return messages;
};

export { getMessagesByEmailService };
