const express = require('express');
const app = express();
const session = require('express-session');
const productsTest = require('./routes/productsTest');
const randomNumbers = require('./routes/randomNumbers');
const Chat = require('./models/chat.js');
const path = require('path');
require('dotenv').config();
const { normalize, schema } = require('normalizr');
const { Server: IOServer } = require('socket.io');
const Container = require('./container');
const { dbConnectionMySQL, dbConnectionSQLite } = require('./dbConfig');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/users.js');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).default({ port: 8080 }).alias({
	p: 'port',
}).argv;

const expressServer = app.listen(argv.port, () =>
	console.log('Server is running on port ' + argv.port)
);

const io = new IOServer(expressServer);
const products = new Container(dbConnectionMySQL, 'products');

// * Cookies and Sessions
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: process.env.SECRET,
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 600000,
		},
		rolling: true,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

// * Render views
// app.use(express.static(path.join(__dirname, '../public')));

// * Main routes
app.use('/api/productos-test', productsTest);
app.use('/api/randoms', randomNumbers);

// * Passport

const checkIsAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};

const hashPassword = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const isValidPassword = (plainPassword, hashedPassword) => {
	return bcrypt.compareSync(plainPassword, hashedPassword);
};

const registerStrategy = new LocalStrategy(
	{ passReqToCallback: true },
	async (req, username, password, done) => {
		try {
			const existingUser = await User.findOne({ username });

			if (existingUser) {
				return done(null, null, { message: 'El usuario ya existe' });
			}

			const newUser = {
				username,
				password: hashPassword(password),
				email: req.body.email,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
			};

			const createdUser = await User.create(newUser);

			done(null, createdUser);
		} catch (err) {
			console.log('Error in user register', err);
			done('Error en registro', null);
		}
	}
);

const loginStrategy = new LocalStrategy(async (username, password, done) => {
	try {
		const user = await User.findOne({ username });

		if (!user || !isValidPassword(password, user.password)) {
			return done(null, null, { message: 'Credenciales incorrectas' });
		}

		done(null, user);
	} catch (err) {
		console.log('Error in user login', err);
		done('Error en login', null);
	}
});

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, done);
});

// * Chat model
const chat = new Chat('chats', {
	author: {
		id: { type: String, required: true },
		name: { type: String, required: true },
		surname: { type: String, required: true },
		age: { type: Number, required: true },
		alias: { type: String, required: true },
		avatar: { type: String, required: true },
	},
	text: { type: String, required: true },
});

// * Login routes
app.get('/login', (req, res) => {
	if (req.isAuthenticated()) {
		const user = req.user;
		res.status(200).json({ user, status: 'ok' });
	} else {
		res.sendFile(path.join(__dirname, '../public/login.html'));
	}
});

app.post(
	'/login',
	passport.authenticate('login', { failureRedirect: '/faillogin' }),
	(req, res) => {
		const user = req.user;
		res.redirect('/');
	}
);

app.get('/faillogin', (req, res) => {
	res.send('Error en login');
});

// * Register routes
app.get('/register', (req, res) => {
	if (req.isAuthenticated()) {
		const user = req.user;
	} else {
		res.sendFile(path.join(__dirname, '../public/register.html'));
	}
});

app.post(
	'/register',
	passport.authenticate('register', { failureRedirect: '/failregister' }),
	(req, res) => {
		const user = req.user;
		res.redirect('/');
	}
);

app.get('/failregister', (req, res) => {
	res.send('Error en registro');
});

// * Logout routes
app.get('/logout', (req, res) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
	});
	res.json({ status: 'ok' });
});

// * ==============
app.get('/', (req, res) => {
	if (req.isAuthenticated()) {
		res.sendFile(path.join(__dirname, '../public/userinfo.html'));
	} else {
		res.sendFile(path.join(__dirname, '../public/login.html'));
	}
});

app.get('/info', (req, res) => {
	res.json({
		input_arguments: process.argv,
		so: process.platform,
		node_version: process.version,
		total_memory_reserved: process.memoryUsage().rss,
		execution_path: process.execPath,
		process_id: process.pid,
		process_folder: process.cwd(),
	});
});

app.get('*', (req, res) => {
	res.status(404).send('404 - No encontrado');
});

// * Socket
io.on('connection', async (socket) => {
	console.log('New user conected ' + socket.id);

	const normalizedMessages = normalizeMensajes(await chat.getAll());

	socket.emit('server:messages', normalizedMessages);
	socket.emit('server:products-test', { products: [] });

	socket.on('client:addProduct', async (product) => {
		await products.save(product);
		io.emit('server:products', await products.getAll());
	});

	socket.on('client:newMessage', async (message) => {
		const savedMsg = await chat.save(message);
		const normalizedMessages = normalizeMensajes(await chat.getAll());
		io.emit('server:messages', normalizedMessages);
	});
});

// * Normalizr
function normalizeMensajes(messages) {
	const author = new schema.Entity('author');

	const message = new schema.Entity(
		'message',
		{ author: author },
		{ idAttribute: '_id' }
	);

	const messagesSchema = new schema.Entity('messages', {
		messages: [message],
	});

	const normalizedPost = normalize(
		{ id: 'messages', messages },
		messagesSchema
	);

	return normalizedPost;
}
