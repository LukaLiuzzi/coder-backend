const Container = require('./Container');

const container = new Container('products.txt');

const renderForm = (req, res) => {
	res.render('form.ejs', {});
};

const getProducts = (req, res) => {
	container
		.getAll()
		.then((products) => {
			res.render('products.ejs', { products });
		})
		.catch((err) => {
			console.error(err);
		});
};

const saveProducts = (req, res) => {
	container.save(req.body);
	res.redirect('/');
};

module.exports = { renderForm, getProducts, saveProducts };
