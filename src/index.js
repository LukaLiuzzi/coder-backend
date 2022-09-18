import mongoose from 'mongoose';
import { app } from './app.js';
import { MONGO_URI, PORT } from './config/config.js';
import { Logger } from './logger/index.js';

mongoose
	.connect(MONGO_URI)
	.then(() => {
		Logger.debug('Connected to DB');
		app.listen(PORT, (error) => {
			if (error) {
				Logger.error(error);
			} else {
				Logger.debug(`Server is running on port ${PORT}`);
			}
		});
	})
	.catch((err) => Logger.error(err));
