import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const ProductModel = model('products', ProductSchema);

export { ProductModel };