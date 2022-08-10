const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const productsTest = require('./routes/productsTest');
const Chat = require('./models/chat.js');
const path = require('path');
const { normalize, schema } = require('normalizr');
const { Server: IOServer } = require('socket.io');
const Container = require('./container');
const { dbConnectionMySQL, dbConnectionSQLite } = require('./dbConfig');

const expressServer = app.listen(8080, () =>
	console.log('Server is running on port 8080')
);

const io = new IOServer(expressServer);
const products = new Container(dbConnectionMySQL, 'products');

// * Cookies and Sessions
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(cookieParser());
app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
				'mongodb+srv://luka:luka1234@cluster0.9slvdpx.mongodb.net/codersocket?retryWrites=true&w=majority',
			mongoOptions,
		}),
		secret: 'coderhouse',
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			maxAge: 60000,
		},
	})
);

// * Render views
app.use(express.static(path.join(__dirname, '../public')));

// * Main routes
app.use('/api/productos-test', productsTest);

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

// * Login and logout routes
app.get('/logged', (req, res) => {
	if (req.session.admin === true) {
		res.json({ status: 'ok', user: req.session.user });
	} else {
		res.status(401).json({ status: 401, code: 'no credentials' });
	}
});

app.get('/login', (req, res) => {
	const { username } = req.query;
	req.session.user = username;
	req.session.admin = true;

	res.json({ status: 'ok', user: req.session.user });
});

app.get('/logout', (req, res) => {
	const user = req.session.user;
	req.session.destroy((err) => {
		if (err) {
			res.status(500).json({ status: 'error', body: err });
		} else {
			res.json({ status: 'ok', user });
		}
	});
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
