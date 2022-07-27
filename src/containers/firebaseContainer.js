import config from '../config.js';
import admin from 'firebase-admin';

admin.initializeApp({
	credential: admin.credential.cert(config.firebase),
});
const db = admin.firestore();
console.log('Firebase connected');

export default class FirebaseContainer {
	constructor(collection) {
		this.collection = db.collection(collection);
	}

	async save(obj) {
		try {
			obj.createdAt = Date.now();
			obj.updatedAt = Date.now();
			const saved = this.collection.doc().create(obj);
			return saved;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async getById(id) {
		try {
			const obj = await this.collection.doc(id).get();
			const data = { ...obj.data(), id: obj.id };
			return data;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async getAll() {
		try {
			const obj = await this.collection.get();
			return obj.docs.map((doc) => {
				const data = { ...doc.data(), id: doc.id };
				return data;
			});
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async deleteById(id) {
		try {
			const deleted = await this.collection.doc(id).delete();
			return deleted;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async deleteAll() {
		try {
			const deleted = await this.collection.delete();
			return deleted;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async updateById(id, obj) {
		try {
			obj.updatedAt = Date.now();
			const updated = await this.collection.doc(id).update(obj);
			return updated;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async getProductsById(id) {
		try {
			const obj = (await this.collection.doc(id).get()).data();
			if (obj.products) {
				return obj.products;
			} else {
				return [];
			}
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async createCart() {
		try {
			const cart = await this.collection.add({
				products: [],
				createdAt: Date.now(),
				updatedAt: Date.now(),
			});
			return true;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async addProductToCart(cartId, productId) {
		try {
			const cart = (await this.collection.doc(cartId).get()).data();
			const product = (
				await db.collection('products').doc(productId).get()
			).data();

			cart.products.push(product);
			cart.updatedAt = Date.now();
			await this.collection.doc(cartId).update(cart);
			return cart;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async deleteProductFromCart(cartId, productId) {
		try {
			const cart = (await this.collection.doc(cartId).get()).data();
			const product = (
				await db.collection('products').doc(productId).get()
			).data();

			const index = cart.products.indexOf(product);
			cart.products.splice(index, 1);
			cart.updatedAt = Date.now();
			await this.collection.doc(cartId).update(cart);
			return cart;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
}
