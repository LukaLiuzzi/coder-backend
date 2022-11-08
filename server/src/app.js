import express from 'express';
import http from 'http';
import { Server as socketServer } from 'socket.io';
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
import { CORS_ORIGIN, SESSION_MAX_AGE } from './config/config.js';
import { checkoutRouter } from './routes/checkout.js';
import { handleError } from './middlewares/error.handle.js';
import { serverInfoRouter } from './routes/serverInfo.routes.js';
import { MessageModel } from './models/message.model.js';
import { chatRouter } from './routes/chat.routes.js';

const app = express();
const server = http.createServer(app);
const io = new socketServer(server, {
	cors: {
		origin: CORS_ORIGIN,
	},
});
// * MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: CORS_ORIGIN,
		credentials: true,
	})
);

app.use(express.static('avatars'));

app.use(
	session({
		secret: 'coderhouse',
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: SESSION_MAX_AGE,
		},
		rolling: true,
		resave: true,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	const user = await UserModel.findOne({ _id: id });
	done(null, user);
});

// * ROUTES
app.use('/api/auth/login', loginRouter);
app.use('/api/auth/register', registerRouter);
app.use('/api/auth/logout', logoutRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/serverinfo', serverInfoRouter);
app.use('/api/chat', chatRouter);
app.use(handleError);

// * SOCKET
io.on('connection', async (socket) => {
	socket.on('client:messages', async () => {
		socket.emit('server:messages', await MessageModel.find({}));
	});

	socket.on('client:message', async ({ user, message }) => {
		const userInfo = await UserModel.findOne({ email: user.email });
		if (!userInfo) {
			return;
		}

		const messageType = userInfo.role === 'admin' ? 'system' : 'user';

		const newMessage = new MessageModel({
			email: user.email,
			type: messageType,
			message,
		});

		await newMessage.save();

		io.sockets.emit('server:message', newMessage);
	});
});

export { server };
