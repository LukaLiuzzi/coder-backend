import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8080;
const ENVIROMENT = process.env.NODE_ENV || 'dev';
const MONGO_URI =
	process.env.MONGO_URI || 'mongodb+srv://luka:luka1234@cluster0.9slvdpx.mongodb.net/coderecommerce?retryWrites=true&w=majority';

const MAIL_RECEIVER = 'lukaliuzzidev@gmail.com';
const CLUSTER = process.env.CLUSTER || true;

export { PORT, ENVIROMENT, MONGO_URI, MAIL_RECEIVER, CLUSTER };
