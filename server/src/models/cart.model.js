import { Schema, model } from 'mongoose';

const CartSchema = new Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		products: [
			{
				productId: { type: Schema.Types.ObjectId, ref: 'products' },
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const CartModel = model('carts', CartSchema);

export { CartModel };
