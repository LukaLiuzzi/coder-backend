import { UserModel } from '../models/user.model.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { isValidPassword } from '../utils/handlePassword.js';
import { Logger } from '../logger/index.js';

const loginStrategy = new LocalStrategy(
	{ usernameField: 'email' },
	async (email, password, done) => {
		try {
			const user = await UserModel.findOne({ email });
			console.log(user)

			if (!user || !isValidPassword(password, user.password)) {
				return done(null, null);
			}

			done(null, user);
		} catch (err) {
			Logger.error(err);
			done('Error login', null);
		}
	}
);

export { loginStrategy };
