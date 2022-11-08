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

const sendMailToAdminOnCheckout = async ({ user, cart }) => {
	console.log(cart.products);
	console.log(cart.products[0].productId);
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

const generateOrder = async ({ user, products }) => {
	const order = new OrderModel({
		user: user._id,
		products: products.map(({ productId, quantity }) => ({
			productId: productId._id,
			quantity,
		})),
	});

	await order.save();

	return order;
};

export {
	sendMailToAdminOnCheckout,
	sendWhatsappToAdminOnCheckout,
	sendMessageToUserOnCheckout,
	generateOrder,
};
