import MongoContainer from '../containers/mongoContainer.js';

export default class ProductsDaoMongo extends MongoContainer {
	constructor() {
		super('products', {
			name: { type: String, required: true },
			price: { type: Number, required: true },
			description: { type: String, required: true },
			image: { type: String, required: true },
			code: { type: String, required: true },
			stock: { type: Number, required: true },
			category: { type: String, required: true },
			quantity: { type: Number, required: true },
			createdAt: { type: Date, required: true },
			updatedAt: { type: Date, required: true },
		});
	}
}
