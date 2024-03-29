import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			lowercase: true,
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
			lowercase: true,
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
