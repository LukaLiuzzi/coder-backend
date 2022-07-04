import Cart from '../models/carts.js';
const cart = new Cart('carts.txt');

export const postCart = (req, res) => {
	cart
		.save()
		.then((id) => {
			res.json({ message: 'Carrito creado correctamente con el id ' + id });
		})
		.catch((err) => {
			res.json(err);
		});
};

export const deleteCart = (req, res) => {
	cart
		.deleteById(req.params.id)
		.then((cart) => {
			if (cart) {
				res.json({ message: 'Carrito eliminado correctamente' });
			} else {
				res.json({
					message: 'No se encontró el carrito con el id ' + req.params.id,
				});
			}
		})
		.catch((err) => {
			res.json(err);
		});
};

export const getProductsById = (req, res) => {
	cart
		.getProductsById(req.params.id)
		.then((products) => {
			if (products) {
				res.json(products);
			} else {
				res.json({
					message:
						'No se encontraron productos en el carrito con el id ' +
						req.params.id,
				});
			}
		})
		.catch((err) => {
			res.json(err);
		});
};

export const deleteProductFromCart = (req, res) => {
	cart
		.deleteProductFromCart(req.params.id, req.params.id_prod)
		.then((product) => {
			if (product) {
				res.json({ message: 'Producto eliminado correctamente' });
			} else {
				res.json({
					message:
						'No se encontró el producto con el id ' +
						req.params.id_prod +
						' en el carrito con id ' +
						req.params.id,
				});
			}
		})
		.catch((err) => {
			res.json(err);
		});
};

export const addProductToCart = (req, res) => {
	cart
		.addProductToCart(req.params.id, req.body.productId)
		.then((cart) => {
			if (cart) {
				res.json({ message: 'Producto agregado correctamente' });
			} else {
				res.json({
					message: 'Hubo un error al agregar el producto al carrito',
				});
			}
		})
		.catch((err) => {
			res.json(err);
		});
};
