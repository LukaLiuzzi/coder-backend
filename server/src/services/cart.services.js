import { CartModel } from '../models/cart.model.js';

const getCartService = async (userId) => {
	const cart = await CartModel.findOne({ userId });
	return cart;
};

const postCartService = async (userId, { productId, quantity }) => {
	const cart = await CartModel.findOne({ userId });
	if (cart) {
		const productIndex = cart.products.findIndex(
			(p) => p.productId === productId
		);
		if (productIndex >= 0) {
			cart.products[productIndex].quantity += quantity;
		} else {
			cart.products.push({ productId, quantity });
		}
		return await cart.save();
	} else {
		const newCart = await CartModel.create({
			userId,
			products: [{ productId, quantity }],
		});
		return newCart;
	}
};

const deleteCartService = async (userId, { productId }) => {
	const cart = await CartModel.findOne({ userId });
	if (cart) {
		cart.products = cart.products.filter((p) => p.productId !== productId);
		return await cart.save();
	} else {
		return null;
	}
};

const putCartService = async (userId, { productId, quantity }) => {
	const cart = await CartModel.findOne({ userId });
	if (cart) {
		const productIndex = cart.products.findIndex(
			(p) => p.productId === productId
		);
		if (productIndex >= 0) {
			cart.products[productIndex].quantity = quantity;
		} else {
			cart.products.push({ productId, quantity });
		}
		return await cart.save();
	} else {
		const newCart = await CartModel.create({
			userId,
			products: [{ productId, quantity }],
		});
		return newCart;
	}
};

export { getCartService, postCartService, deleteCartService, putCartService };
