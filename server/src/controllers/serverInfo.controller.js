import { CLUSTER, CORS_ORIGIN, ENVIROMENT, PORT } from '../config/config.js';

export const serverInfo = (req, res) => {
	res.json({
		serverPort: PORT,
		cluster: CLUSTER,
		enviroment: ENVIROMENT,
		corsOrigin: CORS_ORIGIN,
		serverOS: process.platform,
		serverArch: process.arch,
		serverCPUs: process.cpuUsage(),
		serverMemory: process.memoryUsage(),
		serverVersion: process.version,
		serverDisk: process.cwd(),
		serverUptime: process.uptime(),
	});
};
