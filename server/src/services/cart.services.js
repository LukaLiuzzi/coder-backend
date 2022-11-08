import { CartModel } from '../models/cart.model.js';
import { ProductModel } from '../models/product.model.js';

const getCartService = async (userId) => {
	const cart = await CartModel.findOne({ userId })
		.populate('products.productId')
		.exec();
	if (!cart) {
		throw new Error('Cart not found');
	}
	return cart;
};

const postCartService = async (userId, { productId, quantity }) => {
	// * Get cart
	const cart = await CartModel.findOne({ userId });
	if (cart) {
		// * Check if product exists
		const productIndex = cart.products.findIndex(
			(p) => p.productId === productId
		);
		// * If product exists, update quantity
		if (productIndex >= 0) {
			cart.products[productIndex].quantity += quantity;
		} else {
			// * If product doesn't exist, add product to cart
			cart.products.push({ productId, quantity });
		}
		return await cart.save();
	} else {
		// * If cart doesn't exist, create new cart
		const newCart = await CartModel.create({
			userId,
			products: [{ productId, quantity }],
		});
		return newCart;
	}
};

const deleteCartService = async (userId, { productId }) => {
	// * Get cart
	const cart = await CartModel.findOne({ userId });
	if (cart) {
		// * Delete product from cart
		cart.products = cart.products.filter((p) => p.productId !== productId);
		return await cart.save();
	} else {
		throw new Error('Cart not found');
	}
};

const putCartService = async (userId, { productId, quantity }) => {
	// * Get cart
	const cart = await CartModel.findOne({ userId });
	if (cart) {
		// * Check if product exists
		const productIndex = cart.products.findIndex(
			(p) => p.productId === productId
		);
		// * If product exists, update quantity
		if (productIndex >= 0) {
			cart.products[productIndex].quantity = quantity;
		} else {
			// * If product doesn't exist, add product to cart
			cart.products.push({ productId, quantity });
		}
		return await cart.save();
	} else {
		// * If cart doesn't exist, create new cart
		const newCart = await CartModel.create({
			userId,
			products: [{ productId, quantity }],
		});
		return newCart;
	}
};

export { getCartService, postCartService, deleteCartService, putCartService };
