const { Router } = require('express');
const router = Router();
const { faker } = require('@faker-js/faker');

router.get('/', (req, res) => {
	res.json(generateFakeData());
});

function generateFakeData() {
	// * Uso avatar para las imagenes para que no sean las mismas en todos los productos
	return (fakeProducts = [
		{
			title: faker.commerce.productName(),
			price: faker.commerce.price(),
			thumbnail: faker.image.avatar(),
		},
		{
			title: faker.commerce.productName(),
			price: faker.commerce.price(),
			thumbnail: faker.image.avatar(),
		},
		{
			title: faker.commerce.productName(),
			price: faker.commerce.price(),
			thumbnail: faker.image.avatar(),
		},
		{
			title: faker.commerce.productName(),
			price: faker.commerce.price(),
			thumbnail: faker.image.avatar(),
		},
		{
			title: faker.commerce.productName(),
			price: faker.commerce.price(),
			thumbnail: faker.image.avatar(),
		},
	]);
}

module.exports = router;
