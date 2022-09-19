import express from 'express';
import passport from 'passport';
import { registerStrategy } from './passport/registerStrategy.js';
import { loginStrategy } from './passport/loginStrategy.js';
import { UserModel } from './models/user.model.js';
import session from 'express-session';
import { loginRouter } from './routes/login.routes.js';
import { registerRouter } from './routes/register.routes.js';
import cors from 'cors';
import { logoutRouter } from './routes/logout.routes.js';
import { productsRouter } from './routes/products.routes.js';
import { cartRouter } from './routes/cart.routes.js';

const app = express();
// * MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('avatars'));

app.use(
	session({
		secret: 'coderhouse',
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 1000 * 60 * 60 * 24 * 7,
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

app.use('/api/auth/login', loginRouter);
app.use('/api/auth/register', registerRouter);
app.use('/api/auth/logout', logoutRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

export { app };
