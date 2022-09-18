import { UserModel } from '../models/user.model.js';

const checkRoleAuth = (roles) => async (req, res, next) => {
	try {
		const user = await UserModel.findById(req.user._id);
		if (roles.includes(user.role)) {
			next();
		} else {
			res.status(401).json({ message: 'Not authorized' });
		}
	} catch (error) {
		res.status(400).json({ message: 'ERROR_CHECK_ROLE_AUTH' });
	}
};

export { checkRoleAuth };
