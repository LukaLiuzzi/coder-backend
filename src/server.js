import express from 'express';
const app = express();
import productsRouter from './Routes/productsRoutes.js';
import cartRouter from './Routes/cartRoutes.js';
import * as dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);

export default function auth(req, res, next) {
	const admin = true;
	if (admin) {
		next();
	} else {
		console.log(req);
		res.status(401).json({
			route: req.originalUrl,
			method: req.method,
			message: 'Sin autorizacion',
		});
	}
}

app.listen(port, (e) => {
	if (e) {
		console.log(e);
	} else {
		console.log(`Server is running on port ${port}`);
	}
});
