db.mensajes.insertMany([
	{ email: 'juanp@gmail.com', message: 'Hola', date: '13/7/2022 15:01:18' },
	{
		email: 'pedro@gmail.com',
		message: 'como estas',
		date: '14/7/2022 15:01:18',
	},
	{
		email: 'juanp@gmail.com',
		message: 'bien y vos',
		date: '14/7/2022 15:01:45',
	},
	{
		email: 'pedro@gmail.com',
		message: 'todo bien',
		date: '14/7/2022 15:02:18',
	},
	{
		email: 'juanp@gmail.com',
		message: 'en que andas',
		date: '14/7/2022 15:03:45',
	},
	{
		email: 'pedro@gmail.com',
		message: 'trabajando y vos',
		date: '14/7/2022 15:10:18',
	},
	{
		email: 'juanp@gmail.com',
		message: 'Ah yo tambien',
		date: '14/7/2022 15:12:45',
	},
	{
		email: 'pedro@gmail.com',
		message: 'de que laburas',
		date: '14/7/2022 15:15:18',
	},
	{
		email: 'juanp@gmail.com',
		message: 'soy programador',
		date: '14/7/2022 15:18:45',
	},
	{
		email: 'pedro@gmail.com',
		message: 'ahh que bien!',
		date: '14/7/2022 15:25:18',
	},
]);

db.productos.insertMany([
	{
		title: 'Producto 1',
		price: 140,
		thumbnail: 'https://picsum.photos/200/300',
	},
	{
		title: 'Producto 2',
		price: 500,
		thumbnail: 'https://picsum.photos/200/300',
	},
	{
		title: 'Producto 3',
		price: 770,
		thumbnail: 'https://picsum.photos/200/300',
	},
	{
		title: 'Producto 4',
		price: 900,
		thumbnail: 'https://picsum.photos/200/300',
	},
	{
		title: 'Producto 5',
		price: 1340,
		thumbnail: 'https://picsum.photos/200/300',
	},
	{
		title: 'Producto 6',
		price: 1850,
		thumbnail: 'https://picsum.photos/200/300',
	},
	{
		title: 'Producto 7',
		price: 2600,
		thumbnail: 'https://picsum.photos/200/300',
	},
	{
		title: 'Producto 8',
		price: 4200,
		thumbnail: 'https://picsum.photos/200/300',
	},
	{
		title: 'Producto 9',
		price: 390,
		thumbnail: 'https://picsum.photos/200/300',
	},
	{
		title: 'Producto 10',
		price: 4440,
		thumbnail: 'https://picsum.photos/200/300',
	},
]);

db.mensajes.find();
db.productos.find();
db.mensajes.estimatedDocumentCount();
db.productos.estimatedDocumentCount();

db.productos.insertOne({
	title: 'Producto 11',
	price: 4570,
	thumbnail: 'https://picsum.photos/200/300',
});

db.productos.find({ title: 'Producto 3' });
db.productos.find({ price: { $lt: 1000 } });
db.productos.find({
	$and: [{ price: { $gte: 1000 } }, { price: { $lte: 3000 } }],
});
db.productos.find({ price: { $gt: 3000 } });
db.productos.find({}, { title: 1, _id: 0 }).sort({ price: 1 }).skip(2).limit(1);

db.productos.updateMany({}, { $set: { stock: 100 } });

db.productos.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } });

db.productos.deleteMany({ price: { $lt: 1000 } });

db.createUser({
	user: 'pepe',
	pwd: 'asd456',
	roles: [{ role: 'read', db: 'ecommerce' }],
});
