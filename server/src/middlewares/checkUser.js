const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		console.log('User is authenticated', req.isAuthenticated());
		return next();
	} 
	else {
		console.log('User NOT authenticated', req.isAuthenticated());
		res.status(401).json({ message: 'Not authenticated' });
	}
};


export { checkAuthentication };
