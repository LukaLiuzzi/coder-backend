import nodemailer from 'nodemailer';
import { MAILER_PASS, MAILER_USER } from './config.js';

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: MAILER_USER,
		pass: MAILER_PASS,
	},
});

export { transporter };
