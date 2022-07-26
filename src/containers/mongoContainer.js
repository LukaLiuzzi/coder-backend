import config from '../config.js';
import mongoose from 'mongoose';

await mongoose.connect(config.mongodb.connectionString);
console.log('MongoDB connected');

export default class MongoContainer {
	constructor(collection, scheme) {
		this.collection = mongoose.model(collection, scheme);
	}

	async save(obj) {
		try {
			obj.createdAt = Date.now();
			obj.updatedAt = Date.now();
			const saved = await this.collection.create(obj);
			return saved;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async getById(id) {
		try {
			const obj = await this.collection.findById(id);
			return obj;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async getAll() {
		try {
			const obj = await this.collection.find();
			return obj;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async deleteById(id) {
		try {
			const deleted = await this.collection.findByIdAndDelete(id);
			return deleted;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async deleteAll() {
		try {
			const obj = await this.collection.deleteMany({});
			return obj;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async updateById(id, obj) {
		try {
			obj.updatedAt = Date.now();
			const updated = await this.collection.findByIdAndUpdate(id, obj);
			return updated;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async getProductsById(id) {
		try {
			const obj = await this.collection.findById(id);
			if (obj.products) {
				return obj.products;
			} else {
				return null;
			}
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async createCart() {
		try {
			const cart = await this.collection.create({
				products: [],
				createdAt: Date.now(),
				updatedAt: Date.now(),
			});
			return cart;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async addProductToCart(cartId, productId) {
		try {
			const cart = await this.collection.findById(cartId);
			const product = await mongoose.model('products').findById(productId);
			cart.products.push(product);
			cart.updatedAt = Date.now();
			await this.collection.findByIdAndUpdate(cartId, cart);
			return cart;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async deleteProductFromCart(cartId, productId) {
		try {
			const cart = await this.collection.findById(cartId);
			const product = await mongoose.model('products').findById(productId);

			if (cart.products) {
				cart.products.splice(cart.products.indexOf(product), 1);
			}
			cart.updatedAt = Date.now();
			await this.collection.findByIdAndUpdate(cartId, cart);
			return cart;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
}
