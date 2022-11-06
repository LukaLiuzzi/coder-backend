import mongoose from 'mongoose';
import { server } from './app.js';
import { CLUSTER, MONGO_URI, PORT } from './config/config.js';
import { Logger } from './logger/index.js';
import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length;
if (cluster.isPrimary && CLUSTER !== 'false') {
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		Logger.error(`Worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	mongoose
		.connect(MONGO_URI)
		.then(() => {
			Logger.debug('Connected to DB');
			server.listen(PORT, (error) => {
				if (error) {
					Logger.error(error);
				} else {
					Logger.debug(`Server is running on port ${PORT}`);
				}
			});
		})
		.catch((err) => Logger.error(err));
}
