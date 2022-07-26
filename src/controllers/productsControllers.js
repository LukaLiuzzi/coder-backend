import productsServicesMongo from '../services/productsServicesMongo.js';

export const getProducts = (req, res) => {
	const { id } = req.params;
	if (id) {
		productsServicesMongo
			.getProductById(id)
			.then((product) => {
				res.status(200).json(product);
			})
			.catch((err) => {
				res.status(500).json({ message: err });
			});
	} else {
		productsServicesMongo
			.getProducts()
			.then((products) => {
				res.status(200).json(products);
			})
			.catch((err) => {
				res.status(500).json({ message: err });
			});
	}
};

export const saveProduct = (req, res) => {
	const { name, price, description, code, image, stock, category, quantity } =
		req.body;

	productsServicesMongo
		.saveProduct({
			name,
			price,
			description,
			code,
			image,
			stock,
			category,
			quantity,
		})
		.then((product) => {
			res.status(201).json(product);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};

export const updateProduct = (req, res) => {
	const { id } = req.params;
	const { name, price, description, code, image, stock, category, quantity } =
		req.body;

	productsServicesMongo
		.updateProduct(id, {
			name,
			price,
			description,
			code,
			image,
			stock,
			category,
			quantity,
		})
		.then((product) => {
			res.status(200).json(product);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};

export const deleteProduct = (req, res) => {
	const { id } = req.params;

	productsServicesMongo
		.deleteProduct(id)
		.then((product) => {
			res.status(200).json(product);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};
