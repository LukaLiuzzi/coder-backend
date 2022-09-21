import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8080;
const ENVIROMENT = process.env.NODE_ENV || 'dev';
const MONGO_URI =
	process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

const MAIL_RECEIVER = 'lukaliuzzidev@gmail.com';
const ADMIN_NUMBER = process.env.ADMIN_NUMBER;
const CLUSTER = process.env.CLUSTER || true;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'localhost:5173';
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

export {
	PORT,
	ENVIROMENT,
	MONGO_URI,
	MAIL_RECEIVER,
	CLUSTER,
	CORS_ORIGIN,
	TWILIO_ACCOUNT_SID,
	TWILIO_AUTH_TOKEN,
	ADMIN_NUMBER,
};
