import { Logger } from '../logger/index.js';

export const handleError = (err, errorCode, req, res, next) => {
	if (err) {
		res.status(errorCode || 500).json({ message: err.message });
		Logger.error(`Error: ${err.message} - User: ${req.user?.email}`);
	}
};
