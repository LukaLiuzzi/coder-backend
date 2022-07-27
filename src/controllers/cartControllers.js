import cartsServicesMongo from '../services/cartsServicesMongo.js';

export const postCart = (req, res) => {
	cartsServicesMongo
		.postCart()
		.then((cart) => {
			res.status(201).json({ message: 'Cart created successfully' });
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};

export const deleteCart = (req, res) => {
	const { id } = req.params;

	cartsServicesMongo
		.deleteCart(id)
		.then((json) => {
			res.status(200).json(json);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};

export const getProductsById = (req, res) => {
	const { id } = req.params;

	cartsServicesMongo
		.getProductsById(id)
		.then((cart) => {
			res.json(cart);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};

export const deleteProductFromCart = (req, res) => {
	const { id, id_prod } = req.params;

	cartsServicesMongo
		.deleteProductFromCart(id, id_prod)
		.then((cart) => {
			res.json(cart);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};

export const addProductToCart = (req, res) => {
	const { id } = req.params;
	const { product } = req.body;

	cartsServicesMongo
		.addProductToCart(id, product)
		.then((cart) => {
			res.json(cart);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};
