const getLogout = (req, res) => {
	req.logout(() => {
		res.status(200).json({ message: 'Logout successful' });
	});
};

export { getLogout };
