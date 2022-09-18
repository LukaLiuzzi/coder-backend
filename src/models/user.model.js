import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	avatar: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: 'user',
	},
});

const UserModel = model('users', UserSchema);

export { UserModel };
