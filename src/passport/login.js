const User = require('../models/users.js');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { logger } = require('../logger/index.js');

const isValidPassword = (plainPassword, hashedPassword) => {
	return bcrypt.compareSync(plainPassword, hashedPassword);
};

const loginStrategy = new LocalStrategy(async (username, password, done) => {
	try {
		const user = await User.findOne({ username });

		if (!user || !isValidPassword(password, user.password)) {
			return done(null, null, { message: 'Credenciales incorrectas' });
		}

		done(null, user);
	} catch (err) {
		logger.error('Error in user login', err);
		done('Error en login', null);
	}
});

module.exports = loginStrategy;
