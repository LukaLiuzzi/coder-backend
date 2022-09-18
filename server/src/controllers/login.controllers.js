const getLogin = (req, res) => {
	if (req.isAuthenticated()) {
		const user = req.user;
		user.password = undefined;
		res.json({
			user,
		});
	} else {
		res.status(401).json({ message: 'Not authenticated' });
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
