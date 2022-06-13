const { Router } = require('express');
const router = Router();
const container = require('../Container');

router.get('/', (req, res) => {
	container.getAll().then((data) => {
		if (data === null) {
			return res.status(404).json({ error: 'No se encontraron productos' });
		}
		res.status(200).json(data);
	});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;

	container
		.getbyId(id)
		.then((data) => {
			res.status(200).res.json(data);
		})
		.catch((err) => {
			res.status(404).json({ error: 'Producto no encontrado' });
		});
});

router.post('/', (req, res) => {
	const { title, price, thumbnail } = req.body;

	container.save({ title, price, thumbnail }).then((id) => {
		res.status(201).json({ id });
	});
});

router.put('/:id', (req, res) => {
	const { title, price, thumbnail } = req.body;
	const { id } = req.params;

	container
		.updateById(id, { title, price, thumbnail })
		.then(() => {
			res.status(200);
		})
		.catch((err) => {
			res.status(404).json({ error: 'Producto no encontrado' });
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;

	container
		.deleteById(id)
		.then(() => {
			res.status(200);
		})
		.catch((err) => {
			res.status(404).json({ error: 'Producto no encontrado' });
		});
});

module.exports = router;
