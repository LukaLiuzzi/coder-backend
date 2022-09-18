const postRegister = (req, res) => {
	const user = req.user;
	user.password = undefined;
	res.json({
		user,
	});
};

export { postRegister };
