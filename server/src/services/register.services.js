import { MAIL_RECEIVER } from '../config/config.js';
import { transporter } from '../config/mailer.js';

const sendMailToAdmin = async (user) => {
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
