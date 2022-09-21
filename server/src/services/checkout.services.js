import nodemailer from 'nodemailer';
import {
	ADMIN_NUMBER,
	MAIL_RECEIVER,
	TWILIO_ACCOUNT_SID,
	TWILIO_AUTH_TOKEN,
} from '../config/config.js';
import twilio from 'twilio';
import { Logger } from '../logger/index.js';

const sendMailToAdminOnCheckout = async ({ user, cart }) => {
	const testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass,
		},
	});

	const mailOptions = {
		from: 'smtp.ethereal.email',
		to: MAIL_RECEIVER,
		subject: `Nuevo pedido de ${user.name} - ${user.email} 😁`,
		html: `<h1>Compro los productos:</h1>
            ${cart.products.map(
							(product) => `<p>${product.name} - ${product.price}</p>`
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
							({ productId }) => `${productId.name} - ${productId.price}`
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
};
