// Start api with Koa
const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('koa-router')();
const app = new Koa();

// * MIDDLEWARES
app.use(koaBody());

const Products = [];

// * ROUTES
router.get('/api/products', (ctx) => {
	ctx.status = 200;
	ctx.body = Products;
});

router.post('/api/products', (ctx) => {
	const { name, price } = ctx.request.body;
	const product = { name, price };
	Products.push(product);
	ctx.status = 201;
	ctx.body = product;
});

router.get('/api/products/:id', (ctx) => {
	const { id } = ctx.params;
	const product = Products[id - 1];
	if (product) {
		ctx.status = 200;
		ctx.body = product;
	} else {
		ctx.status = 404;
		ctx.body = { message: 'Product not found' };
	}
});

router.put('/api/products/:id', (ctx) => {
	const { id } = ctx.params;
	const { name, price } = ctx.request.body;
	const product = Products[id - 1];
	if (product) {
		product.name = name;
		product.price = price;
		ctx.status = 200;
		ctx.body = product;
	} else {
		ctx.status = 404;
		ctx.body = { message: 'Product not found' };
	}
});

router.delete('/api/products/:id', (ctx) => {
	const { id } = ctx.params;
	const product = Products[id];
	if (product) {
		Products.splice(id, 1);
		ctx.status = 200;
		ctx.body = product;
	} else {
		ctx.status = 404;
		ctx.body = { message: 'Product not found' };
	}
});

app.use(router.routes());

// * START SERVER
app.listen(8080, () => {
	console.log('Server running on port 8080');
});
