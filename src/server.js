const express = require('express');
const app = express();
const session = require('express-session');
const compression = require('compression');
const productsTest = require('./routes/productsTest');
const randomNumbers = require('./routes/randomNumbers');
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const infoRoutes = require('./routes/infoRoutes');
const Chat = require('./models/chat.js');
const path = require('path');
const normalizeMsg = require('./normalizr');
require('dotenv').config();
const { Server: IOServer } = require('socket.io');
const Container = require('./daos/container');
const { dbConnectionMySQL, dbConnectionSQLite } = require('./dbConfig');
const passport = require('passport');
const User = require('./models/users.js');
const registerStrategy = require('./passport/register');
const loginStrategy = require('./passport/login');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv))
	.default({ port: 8080, mode: 'fork' })
	.alias({
		p: 'port',
		m: 'mode',
	}).argv;
const cluster = require('cluster');
const os = require('os');
const {
	logRequests,
	logInexistentRoutes,
} = require('./middlewares/logRequests');
const { logger } = require('./logger');

let expressServer;

if (argv.mode === 'cluster' && cluster.isPrimary) {
	const threads = os.cpus();

	threads.map(() => cluster.fork());

	cluster.on('exit', (worker, code, signal) => {
		logger.info(`worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	expressServer = app.listen(argv.port, () =>
		logger.info(
			`Server is running on port ${argv.port} - worker: ${process.pid}`
		)
	);
}

const io = new IOServer(expressServer);
const products = Container.createInstance(dbConnectionMySQL, 'products');

// * Cookies and Sessions
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

// * Middlewares
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logRequests);

// * Routes
app.use('/api/productos-test', productsTest);
app.use('/api/randoms', randomNumbers);
app.use('/', loginRoutes);
app.use('/', registerRoutes);
app.use('/info', infoRoutes);
app.get('/', (req, res) => {
	if (req.isAuthenticated()) {
		res.sendFile(path.join(__dirname, '../public/userinfo.html'));
	} else {
		res.sendFile(path.join(__dirname, '../public/login.html'));
	}
});

app.get('*', logInexistentRoutes);

// * Passport
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

// * Socket
io.on('connection', async (socket) => {
	logger.info('New user conected ' + socket.id);

	const normalizedMessages = normalizeMsg(await chat.getAll());

	socket.emit('server:messages', normalizedMessages);
	socket.emit('server:products-test', { products: [] });

	socket.on('client:addProduct', async (product) => {
		await products.save(product);
		io.emit('server:products', await products.getAll());
	});

	socket.on('client:newMessage', async (message) => {
		await chat.save(message);
		const normalizedMessages = normalizeMsg(await chat.getAll());
		io.emit('server:messages', normalizedMessages);
	});
});
