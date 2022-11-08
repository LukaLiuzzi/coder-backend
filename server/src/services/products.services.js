import { ProductModel } from '../models/product.model.js';
import { CartModel } from '../models/cart.model.js';

const getProductsService = async (category) => {
	if (category) {
		category = category.toLowerCase();
		const products = await ProductModel.find({ category });
		if (!products) {
			throw new Error('Products not found');
		}
		return products;
	}
	const products = await ProductModel.find();
	if (!products) {
		throw new Error('Products not found');
	}
	return products;
};

const postProductService = async (product) => {
	const newProduct = await ProductModel.create(product);
	return newProduct;
};

const getProductService = async (id) => {
	const product = await ProductModel.findById(id);
	if (!product) {
		throw new Error('Product not found');
	}
	return product;
};

const putProductService = async (id, product) => {
	// * Check if product exists
	const productInDB = await ProductModel.findById(id);
	if (!productInDB) {
		throw new Error('Product not found');
	}

	// * Update product
	const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, {
		new: true,
	});

	return updatedProduct;
};

const deleteProductService = async (id) => {
	// * Check if product exists
	const productInDB = await ProductModel.findById(id);
	if (!productInDB) {
		throw new Error('Product not found');
	}

	// * Delete product
	const deletedProduct = await ProductModel.findByIdAndDelete(id);

	// * Delete product from carts
	await CartModel.updateMany(
		{},
		{
			$pull: {
				products: {
					productId: id,
				},
			},
		}
	);

	return deletedProduct;
};

export {
	getProductsService,
	postProductService,
	getProductService,
	putProductService,
	deleteProductService,
};
