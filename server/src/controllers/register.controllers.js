const postRegister = (req, res) => {
	const user = req.user;
	user.password = '*************';
	res.json({
		user,
	});
};

export { postRegister };
