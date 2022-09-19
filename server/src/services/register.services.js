import nodemailer from 'nodemailer';
import { MAIL_RECEIVER } from '../config/config.js';

const sendMailToAdmin = async (user) => {
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
		from: 'Lukita 😁',
		to: MAIL_RECEIVER,
		subject: 'Nuevo usuario registrado 👌',
		html: `<h1>Un nuevo usuario se ha registrado</h1>
        <p>Nombre: ${user.name}</p>
        <p>Email: ${user.email}</p>
        <p>Edad: ${user.age}</p>
        <p>Dirección: ${user.address}</p>
        <p>Teléfono: ${user.phone}</p>
        `,
	};

	await transporter.sendMail(mailOptions);
};

export { sendMailToAdmin };
