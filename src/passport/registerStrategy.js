import { UserModel } from '../models/user.model.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { hashPassword } from '../utils/handlePassword.js';
import { Logger } from '../logger/index.js';

const registerStrategy = new LocalStrategy(
	{ passReqToCallback: true, usernameField: 'email' },
	async (req, email, password, done) => {
		try {
			const existingUser = await UserModel.findOne({ email });

			if (existingUser) {
				return done(null, null);
			}

			const newUser = {
				password: hashPassword(password),
				email: email,
				name: req.body.name,
				address: req.body.address,
				phone: req.body.phone,
				age: req.body.age,
				avatar: req.body.avatar,
			};

			const createdUser = await UserModel.create(newUser);
			req.user = email;
			done(null, createdUser);
		} catch (err) {
			Logger.error(err);
			done('Error en registro', null);
		}
	}
);

export { registerStrategy };
