import multer from 'multer';
import path from 'path';

const __dirname = path.resolve();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'avatars');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const extension = file.originalname.split('.').pop();
		cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
	},
});

const upload = multer({ storage: storage });

export { upload };
