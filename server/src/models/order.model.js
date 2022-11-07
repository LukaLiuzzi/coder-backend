import { Schema, model } from 'mongoose';

const OrderSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
		products: [
			{
				productId: { type: Schema.Types.ObjectId, ref: 'products' },
				quantity: { type: Number, required: true },
			},
		],
		state: {
			type: String,
			enum: ['generated', 'delivered'],
			default: 'generated',
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const OrderModel = model('orders', OrderSchema);

export { OrderModel };
