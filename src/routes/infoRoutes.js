const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.json({
		input_arguments: process.argv,
		so: process.platform,
		node_version: process.version,
		total_memory_reserved: process.memoryUsage().rss,
		execution_path: process.execPath,
		process_id: process.pid,
		process_folder: process.cwd(),
	});
});

module.exports = router;
