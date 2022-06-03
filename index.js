const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 8080;
class Container {
	constructor(name) {
		this.name = name;
	}

	async save(obj) {
		const exists = fs.existsSync(this.name);
		let file;
		let id;
		try {
			file = exists ? await fs.promises.readFile(this.name, 'utf-8') : '';
			file = file && file.length > 0 ? file : '[]';
			const parsedFile = JSON.parse(file);
			id = parsedFile[parsedFile.length - 1]?.id + 1 || 1;
			parsedFile.push({ id, ...obj });
			file = JSON.stringify(parsedFile, null, 2);
			await fs.promises.writeFile(this.name, file);
		} catch (err) {
			console.error(err);
			return null;
		}
		return id;
	}

	async getbyId(id) {
		try {
			const file = await fs.promises.readFile(this.name, 'utf-8');
			const parsedFile = JSON.parse(file);
			const result = parsedFile.find((item) => item.id === id);
			return result;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	async getAll() {
		try {
			const file = await fs.promises.readFile(this.name, 'utf-8');
			const parsedFile = JSON.parse(file);
			return parsedFile;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	async deleteById(id) {
		try {
			const file = await fs.promises.readFile(this.name, 'utf-8');
			const parsedFile = JSON.parse(file);
			const objIndex = parsedFile.findIndex((item) => item.id === id);
			parsedFile.splice(objIndex, 1);
			const newFile = JSON.stringify(parsedFile, null, 2);
			await fs.promises.writeFile(this.name, newFile);
		} catch (err) {
			console.error(err);
		}
	}

	async deleteAll() {
		try {
			fs.promises.writeFile(this.name, '');
		} catch (err) {
			console.error(err);
		}
	}
}

const container = new Container('products.txt');

let visits = 0;

app.use((req, res, next) => {
	visits++;
	console.log('Visits ', visits);
	next();
});

app.get('/products', (req, res) => {
	container.getAll().then((data) => {
		res.send(data);
	});
});

app.get('/productrandom', (req, res) => {
	container.getAll().then((data) => {
		const random = Math.floor(Math.random() * data.length);
		res.send(data[random]);
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// (async () => {
// 	const products = new Container('products.txt');
// 	products.deleteAll();
// 	await products.save({
// 		title: 'Pelota de futbol',
// 		price: 10000,
// 		thumbnail:
// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/%D0%A4%D0%9A_%22%D0%9A%D0%BE%D0%BB%D0%BE%D1%81%22_%28%D0%97%D0%B0%D1%87%D0%B5%D0%BF%D0%B8%D0%BB%D0%BE%D0%B2%D0%BA%D0%B0%2C_%D0%A5%D0%B0%D1%80%D1%8C%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%29_-_%D0%A4%D0%9A_%22%D0%91%D0%B0%D0%BB%D0%BA%D0%B0%D0%BD%D1%8B%22_%28%D0%97%D0%B0%D1%80%D1%8F%2C_%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%29_%2818790931100%29.jpg/800px-thumbnail.jpg',
// 	});
// 	await products.save({
// 		title: 'Botines de futbol',
// 		price: 40000,
// 		thumbnail:
// 			'https://www.rossettideportes.com/media/catalog/product/cache/201bb9304c5ba5aaf8080b8ff3bbb6ff/b/o/botines-futbol-ninio-puma-future-z-4-2-fg-ag-jr-adp-p-106792_01-4.jpg',
// 	});
// 	await products.save({
// 		title: 'Camiseta de futbol',
// 		price: 7000,
// 		thumbnail:
// 			'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/eb11816534c6473bb164adaa01691fc4_9366/camiseta-titular-boca-juniors-21-22.jpg',
// 	});
// 	await products.save({
// 		title: 'Pantalon de futbol',
// 		price: 3500,
// 		thumbnail:
// 			'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/1a58b0c277784ec0b1abad7f01889779_9366/shorts-local-boca-juniors-21-22.jpg',
// 	});
// 	await products.save({
// 		title: 'Medias de futbol',
// 		price: 1000,
// 		thumbnail:
// 			'https://redsport.vteximg.com.br/arquivos/ids/1040513-1000-1000/GA050008239.jpg?v=637306094080800000',
// 	});
// 	await products
// 		.getbyId(2)
// 		.then((product) => console.log('Product ID[2]:', product));
// 	await products
// 		.getAll()
// 		.then((allProducts) => console.log('All products:', allProducts));
// 	await products.deleteById(2);
// 	products
// 		.getAll()
// 		.then((allProducts) =>
// 			console.log('All products after delete ID[2]:', allProducts)
// 		);
// })();
