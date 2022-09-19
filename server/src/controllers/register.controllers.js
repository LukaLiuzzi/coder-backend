import { sendMailToAdmin } from '../services/register.services.js';

const postRegister = (req, res) => {
	const user = req.user;
	user.password = undefined;
	res.json({
		user,
	});
	sendMailToAdmin(user);
};

export { postRegister };
