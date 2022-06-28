const socket = io();
const productForm = document.getElementById('productForm');
const productTitle = document.getElementById('productTitle');
const productPrice = document.getElementById('productPrice');
const productThumbnail = document.getElementById('productThumbnail');
const chatForm = document.getElementById('chatForm');
const chatEmail = document.getElementById('chatEmail');
const chatMessage = document.getElementById('chatMessage');

async function renderProducts(products) {
	const response = await fetch('/template.hbs');
	const plantilla = await response.text();

	products.forEach((product) => {
		const template = Handlebars.compile(plantilla);
		const html = template(product);
		document.getElementById('root').innerHTML += html;
	});
}

socket.on('server:products', (products) => {
	document.getElementById('root').innerHTML = '';
	renderProducts(products);
});

productForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const product = {
		title: productTitle.value,
		price: productPrice.value,
		thumbnail: productThumbnail.value,
	};

	console.log(product);

	socket.emit('client:addProduct', product);
});

async function renderMessages(messages) {
	const response = await fetch('/templateChat.hbs');
	const plantilla = await response.text();

	if (messages) {
		messages.forEach((message) => {
			const template = Handlebars.compile(plantilla);
			const html = template(message);
			document.getElementById('chat').innerHTML += html;
		});
	}
}

socket.on('server:messages', (messages) => {
	document.getElementById('chat').innerHTML = '';
	renderMessages(messages);
});

chatForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const message = {
		email: chatEmail.value,
		date:
			new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
		message: chatMessage.value,
	};

	socket.emit('client:newMessage', message);

	chatMessage.value = '';
});
