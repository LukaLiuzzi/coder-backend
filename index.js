const express = require('express');
const app = express();
const PORT = 8080;
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routes);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/html/index.html');
});

app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Server is running on port ${PORT}`);
	}
});
