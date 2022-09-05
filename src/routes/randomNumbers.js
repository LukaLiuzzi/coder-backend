const { Router } = require('express');
const router = Router();
const { fork } = require('child_process');
const path = require('path');

router.get('/', (req, res) => {
	// const forked = fork(path.join(__dirname, '../childProcess/randomNumbers.js'));

	const cant = isNaN(req.query.cant) ? 100000000 : Number(req.query.cant);

	// forked.send(cant);

	// forked.on('message', (data) => {
	// 	res.json(data);
	// });

	res.json({ message: 'Ruta desactivada temporalmente' });
});

module.exports = router;
