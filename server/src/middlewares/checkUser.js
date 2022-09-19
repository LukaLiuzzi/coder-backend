const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		console.log('User is authenticated');
		next();
	} else {
		console.log('User NOT authenticated');
		res.status(401).json({ message: 'Not authenticated' });
	}
};

export { checkAuthentication };
