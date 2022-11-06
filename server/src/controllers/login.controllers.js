const getLogin = (req, res, next) => {
	if (req.isAuthenticated()) {
		const user = req.user;
		user.password = undefined;
		res.json({
			user,
		});
	} else {
		next({ message: 'Not logged in' });
	}
};

const postLogin = (req, res) => {
	const user = req.user;
	user.password = undefined;
	res.json({
		user,
	});
};

export { getLogin, postLogin };
