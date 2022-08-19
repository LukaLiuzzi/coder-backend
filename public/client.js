const socket = io();
const productForm = document.getElementById('productForm');
const productTitle = document.getElementById('productTitle');
const productPrice = document.getElementById('productPrice');
const productThumbnail = document.getElementById('productThumbnail');
const chatForm = document.getElementById('chatForm');
const chatEmail = document.getElementById('chatEmail');
const chatMessage = document.getElementById('chatMessage');
const chatName = document.getElementById('chatName');
const optimizationPercentaje = document.getElementById(
	'optimizationPercentaje'
);
const login = document.getElementById('login');
const loginForm = document.getElementById('loginForm');
const usernameForm = document.getElementById('usernameForm');
const app = document.getElementById('app');
const chat = document.getElementById('chat');
const root = document.getElementById('root');
const userUsername = document.getElementById('userUsername');
const userName = document.getElementById('userName');
const userSurname = document.getElementById('userSurname');
const userEmail = document.getElementById('userEmail');
const userLogout = document.getElementById('userLogout');

async function renderProducts(products) {
	const response = await fetch('/template.hbs');
	const plantilla = await response.text();

	products.forEach((product) => {
		const template = Handlebars.compile(plantilla);
		const html = template(product);
		if (root) {
			root.innerHTML += html;
		}
	});
}

socket.on('server:products-test', async (products) => {
	if (root) {
		root.innerHTML = '';
	}
	const data = await fetch('http://localhost:8080/api/productos-test'); // * Hago el fetch porque la consigna pide que consuma la ruta /api/productos-test
	const json = await data.json();
	renderProducts(json);
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
			if (chat) {
				chat.innerHTML += html;
			}
		});
	}
}

socket.on('server:messages', (messages) => {
	if (chat) {
		chat.innerHTML = '';
	}
	const denormalizedMessages = denormalizeMensajes(messages);
	optimizationPercentaje.innerHTML =
		denormalizedMessages.optimizationPercentage + '%';

	const messagesFormated = denormalizedMessages.denormalizedMessages.map(
		(message) => {
			return {
				text: message.text,
				name: message.author.name,
				avatar: message.author.avatar,
			};
		}
	);

	renderMessages(messagesFormated);
});

chatForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// * Los valores los puse por default para que no sea un embole probarlo
	const message = {
		author: {
			id: Math.random(),
			name: chatName.value,
			surname: 'Prueba',
			age: 20,
			alias: 'lukita',
			avatar: 'https://i.pravatar.cc/30',
		},
		text: chatMessage.value,
	};

	socket.emit('client:newMessage', message);
});

function denormalizeMensajes(messagesObj) {
	const author = new normalizr.schema.Entity('author');

	const message = new normalizr.schema.Entity(
		'message',
		{ author: author },
		{ idAttribute: '_id' }
	);

	const messagesSchema = new normalizr.schema.Entity('messages', {
		messages: [message],
	});

	const denormalized = normalizr.denormalize(
		messagesObj.result,
		messagesSchema,
		messagesObj.entities
	);

	const normalizedLength = JSON.stringify(messagesSchema).length;
	const denormalizedLength = JSON.stringify(denormalized).length;
	const optimizationPercentage = (
		100 -
		(normalizedLength * 100) / denormalizedLength
	).toFixed(2);

	const denormalizedMessages = denormalized.messages.map(
		(message) => message._doc
	);

	return { denormalizedMessages, optimizationPercentage };
}

// * Login
loginForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const username = usernameForm.value;

	fetch(`/login?username=${username}`).then((response) => {
		if (response.status === 200) {
			window.location.href = '/';
		} else {
			console.log('Usuario no encontrado');
		}
	});
});

fetch(`/logged`)
	.then((response) => response.json())
	.then((data) => {
		if (data.status === 'ok') {
			login.innerHTML = `<h1>Bienvenido ${data.user}</h1>`;

			const button = document.createElement('button');
			button.innerHTML = 'Cerrar Sesión';
			button.addEventListener('click', () => {
				fetch(`/logout`).then((response) => {
					if (response.status === 200) {
						app.innerHTML = '';
						login.innerHTML = `<h1>Hasta luego ${data.user} </h1>`;
						setTimeout(() => {
							window.location.href = '/';
						}, 2000);
					}
				});
			});
			login.appendChild(button);
		}
	});

fetch(`/logged`)
	.then((response) => response.json())
	.then((data) => {
		if (data.status !== 'ok') {
			app.innerHTML = '';
		}
	});

// * LOGIN WITH PASSPORT
fetch(`/login`)
	.then((response) => response.json())
	.then((data) => {
		if (data.status === 200) {
			console.log(data);
			userUsername.innerHTML = data.user;
			userName.innerHTML = data.name;
			userSurname.innerHTML = data.surname;
			userEmail.innerHTML = data.email;

			userLogout.addEventListener('click', () => {
				fetch(`/logout`);
			});
		}
	});
