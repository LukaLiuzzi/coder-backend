const postRegister = (req, res) => {
	const user = req.user;
	console.log(req.user);
	delete user.password;
	res.json({
		user,
	});
};

export { postRegister };
