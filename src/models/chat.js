const mongoose = require('mongoose');
const { dbConnectionMongo } = require('../dbConfig.js');

mongoose
	.connect(dbConnectionMongo)
	.then(() => console.log('MongoDB connected'))
	.catch((error) => console.log('error trying to connect MongoDB: ', error));

class Chat {
	constructor(collectionName, schema) {
		this.collection = mongoose.model(
			collectionName,
			new mongoose.Schema(schema, { timestamps: true })
		);
	}

	async save(mensaje) {
		const objectModel = new this.collection(mensaje);

		try {
			const res = await objectModel.save();
			return res;
		} catch (err) {
			console.log('Error saving chat: ', err);
			return false;
		}
	}

	async getAll() {
		try {
			const messages = await this.collection.find({}, { __v: 0 });
			return messages;
		} catch (err) {
			console.log('Error saving chat: ', err);
			return false;
		}
	}
}

module.exports = Chat;
