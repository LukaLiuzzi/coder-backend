import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8080;
const ENVIROMENT = process.env.NODE_ENV || 'dev';
const MONGO_URI =
	process.env.MONGO_URI || 'mongodb://localhost:27017/coderhouse';

export { PORT, ENVIROMENT, MONGO_URI };
