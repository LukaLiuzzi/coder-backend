import dotenv from 'dotenv';
dotenv.config();

let ProductsDao;
let CartsDao;

switch (process.env.DATABASE) {
	case 'mongo':
		const { default: ProductsDaoMongo } = await import('./productsDaoMongo.js');
		const { default: CartsDaoMongo } = await import('./cartsDaoMongo.js');
		ProductsDao = new ProductsDaoMongo();
		CartsDao = new CartsDaoMongo();
		break;
	case 'firebase':
		const { default: ProductsDaoFirebase } = await import(
			'./productsDaoFirebase.js'
		);
		const { default: CartsDaoFirebase } = await import('./cartsDaoFirebase.js');
		ProductsDao = new ProductsDaoFirebase();
		CartsDao = new CartsDaoFirebase();
		break;
	default:
		throw new Error('Database not supported');
}

export { ProductsDao, CartsDao };
