import express from 'express';
import passport from 'passport';
import { registerStrategy } from './passport/registerStrategy.js';
import { loginStrategy } from './passport/loginStrategy.js';
import { UserModel } from './models/user.model.js';
import session from 'express-session';
import { loginRouter } from './routes/login.routes.js';
import { registerRouter } from './routes/register.routes.js';
import cors from 'cors';

const app = express();
// * MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
	session({
		secret: 'coderhouse',
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 20000,
		},
		rolling: true,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	UserModel.findById(id, done);
});

function checkAuthentication(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).json({ message: 'Not authenticated' });
	}
}

app.use('/api/auth/login', loginRouter);
app.use('/api/auth/register', registerRouter);

export { app };
