import MongoContainer from '../containers/mongoContainer.js';

export default class CartsDaoMongo extends MongoContainer {
	constructor() {
		super('carts', {
			products: { type: Array, required: true },
			createdAt: { type: Date, required: true },
			updatedAt: { type: Date, required: true },
		});
	}
}
