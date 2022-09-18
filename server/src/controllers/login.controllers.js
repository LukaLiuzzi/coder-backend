const getLogin = (req, res) => {
	if (req.isAuthenticated()) {
		const user = req.user;
		delete user.password;
		console.log('user logueado');
		res.json({
			user,
		});
	} else {
		console.log('user NO logueado');
		res.status(401).json({ message: 'Not authenticated' });
	}
};

const postLogin = (req, res) => {
	const user = req.user;
	delete user.password;
	res.json({
		user,
	});
};

export { getLogin, postLogin };
