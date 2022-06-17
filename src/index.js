const express = require('express');
const app = express();
const PORT = 8080;
const routes = require('./routes');
const path = require('path');
const { engine } = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		defaultLayout: path.join(__dirname, './views/layout/main.hbs'),
		layoutsDir: path.join(__dirname, './views/layout'),
		partialsDir: path.join(__dirname, './views/partials'),
	})
);

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs');

app.use('/', routes);

app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Server is running on port ${PORT}`);
	}
});
