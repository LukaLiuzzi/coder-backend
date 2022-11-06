import { Schema, model } from 'mongoose';

const MessageSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			lowercase: true,
		},
		type: {
			type: String,
			required: true,
			lowercase: true,
			enum: ['user', 'system'],
		},
		message: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const MessageModel = model('messages', MessageSchema);

export { MessageModel };
