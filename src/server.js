const express = require('express');
const app = express();
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

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/productos-test', productsTest);

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
