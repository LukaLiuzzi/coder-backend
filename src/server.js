const express = require('express');
const app = express();
const path = require('path');
const { Server: IOServer } = require('socket.io');
const Container = require('./container');
const Chat = require('./chat');
const expressServer = app.listen(8080, () =>
	console.log('Server is running on port 8080')
);
const io = new IOServer(expressServer);
const products = new Container('products.txt');
const chat = new Chat('chat.txt');

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', async (socket) => {
	console.log('New user conected ' + socket.id);

	socket.emit('server:products', await products.getAll());
	socket.emit('server:messages', await chat.getAll());

	socket.on('client:addProduct', async (product) => {
		await products.save(product);
		io.emit('server:products', await products.getAll());
	});

	socket.on('client:newMessage', async (message) => {
		chat.save(message);

		io.emit('server:messages', await chat.getAll());
	});
});
