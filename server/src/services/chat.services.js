import { MessageModel } from '../models/message.model.js';

const getMessagesByEmailService = async (email) => {
	const messages = await MessageModel.find({ email });
	return messages;
};

export { getMessagesByEmailService };
