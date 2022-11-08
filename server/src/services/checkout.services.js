import {
	ADMIN_NUMBER,
	MAIL_RECEIVER,
	TWILIO_ACCOUNT_SID,
	TWILIO_AUTH_TOKEN,
} from '../config/config.js';
import twilio from 'twilio';
import { Logger } from '../logger/index.js';
import { transporter } from '../config/mailer.js';
import { OrderModel } from '../models/order.model.js';
import { ProductModel } from '../models/product.model.js';
import { CartModel } from '../models/cart.model.js';

const generateOrder = async ({ user, products }) => {
	const session = await OrderModel.startSession();
	session.startTransaction();
	try {
		// * Check if products has stock
		const productsWithStock = await Promise.all(
			products.map(async (product) => {
				const productInDB = await ProductModel.findById(product.productId);
				if (productInDB.stock >= product.quantity) {
					return {
						...product,
						stock: productInDB.stock,
					};
				} else {
					throw new Error(`Product ${productInDB.name} has not enough stock`);
				}
			})
		);

		// * Create order
		const order = await OrderModel.create(
			[
				{
					user: user._id,
					products: productsWithStock.map((product) => ({
						productId: product.productId,
						quantity: product.quantity,
					})),
				},
			],
			{ session }
		);

		// * Update stock
		await Promise.all(
			productsWithStock.map(async (product) => {
				await ProductModel.findByIdAndUpdate(product.productId, {
					stock: product.stock - product.quantity,
				});
			})
		);

		// * Clear cart from user
		const cart = await CartModel.findOne({ userId: user._id });
		cart.products = [];
		await cart.save();

		await session.commitTransaction();

		return order;
	} catch (error) {
		Logger.error(`Error on generateOrder: ${error}`);
		throw error;
	} finally {
		session.endSession();
	}
};

const getOrdersByUserService = async (userId) => {
	// * Get orders by user
	const orders = await OrderModel.find({ user: userId }).populate(
		'products.productId'
	);
	if (!orders) {
		throw new Error('No orders found');
	}
	return orders;
};

const sendMailToAdminOnCheckout = async ({ user, cart }) => {
	const mailOptions = {
		from: 'smtp.ethereal.email',
		to: MAIL_RECEIVER,
		subject: `Nuevo pedido de ${user.name} - ${user.email} 😁`,
		html: `<h1>El usuario ${user.email} Compro los productos:</h1>
            ${cart.products.map(
							({ productId, quantity }) =>
								`<p>${productId.name} - ${productId.price} - ${quantity}</p>`
						)}
        `,
	};

	try {
		await transporter.sendMail(mailOptions);
		Logger.info('Mail sent to', MAIL_RECEIVER);
	} catch (error) {
		Logger.error(error);
	}
};

const sendWhatsappToAdminOnCheckout = async ({ user, cart }) => {
	const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
	try {
		const message = `Nuevo pedido de ${user.name} - ${user.email} 😁
            ${cart.products.map(
							({ productId, quantity }) =>
								`${productId.name} - ${productId.price} - ${quantity}`
						)}
        `;
		console.log(message);
		const info = await client.messages.create({
			body: message,
			from: 'whatsapp:+14155238886',
			to: `whatsapp:${ADMIN_NUMBER}`,
		});
		Logger.info('WhatsApp sent: to', info.to);
	} catch (error) {
		Logger.error(error);
	}
};

const sendMessageToUserOnCheckout = async ({ user }) => {
	const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
	try {
		const info = await client.messages.create({
			body: `Hola ${user.name}! Gracias por tu compra! Tu pedido se encuentra en proceso!`,
			from: '+18104280287',
			to: user.phone,
		});
		Logger.info('Message sent: %s', info.to);
	} catch (error) {
		Logger.error(error);
	}
};

export {
	sendMailToAdminOnCheckout,
	sendWhatsappToAdminOnCheckout,
	sendMessageToUserOnCheckout,
	generateOrder,
	getOrdersByUserService,
};
