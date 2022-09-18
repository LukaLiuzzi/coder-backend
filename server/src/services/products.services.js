import { ProductModel } from '../models/product.model.js';

const getProductsService = async () => {
	const products = await ProductModel.find();
	return products;
};

const postProductService = async (product) => {
	const newProduct = await ProductModel.create(product);
	return newProduct;
};

const getProductService = async (id) => {
	const product = await ProductModel.findById(id);
	return product;
};

const putProductService = async (id, product) => {
	const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, {
		new: true,
	});
	return updatedProduct;
};

const deleteProductService = async (id) => {
	const deletedProduct = await ProductModel.findByIdAndDelete(id);
	return deletedProduct;
};

export {
	getProductsService,
	postProductService,
	getProductService,
	putProductService,
	deleteProductService,
};
