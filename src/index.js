const express = require('express');
const app = express();
const PORT = 8080;
const routes = require('./routes');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.use('/', routes);

app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Server is running on port ${PORT}`);
	}
});
