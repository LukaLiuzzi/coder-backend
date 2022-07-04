import Products from '../models/products.js';
const products = new Products('products.txt');

export const getProducts = (req, res) => {
	const { id } = req.params;
	if (id) {
		products
			.getById(id)
			.then((product) => {
				if (product) {
					res.json(product);
				} else {
					res.json({
						message: 'No se encontró el producto con el id ' + id,
					});
				}
			})
			.catch((err) => {
				res.json(err);
			});
	} else {
		products
			.getAll()
			.then((products) => {
				if (products) {
					res.json(products);
				} else {
					res.json({
						message: 'No se encontraron productos',
					});
				}
			})
			.catch((err) => {
				res.json(err);
			});
	}
};

export const saveProduct = (req, res) => {
	const { name, price, description, code, img, stock } = req.body;

	products
		.save({ name, price, description, code, img, stock })
		.then((product) => {
			res.json({ message: 'Producto guardado correctamente' });
		})
		.catch((err) => {
			res.json(err);
		});
};

export const updateProduct = (req, res) => {
	const { id } = req.params;
	const { name, price, description, code, img, stock } = req.body;

	products
		.updateById(id, { name, price, description, code, img, stock })
		.then((product) => {
			res.json({ message: 'Producto actualizado correctamente' });
		})
		.catch((err) => {
			res.json(err);
		});
};

export const deleteProduct = (req, res) => {
	products
		.deleteById(req.params.id)
		.then((product) => {
			if (product) {
				res.json({ message: 'Producto eliminado correctamente' });
			} else {
				res.json({
					message: 'No se encontró el producto con el id ' + req.params.id,
				});
			}
		})
		.catch((err) => {
			res.json(err);
		});
};
