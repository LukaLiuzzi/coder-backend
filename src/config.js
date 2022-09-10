export default {
	mongodb: {
		connectionString:
			'mongodb+srv://luka:luka1234@cluster0.8axswah.mongodb.net/ecommercecoder?retryWrites=true&w=majority',
	},
	firebase: {
		type: process.env.TYPE,
		projectId: process.env.PROJECT_ID,
		private_key_id: process.env.PRIVATE_KEY_ID,
		privateKey: process.env.PRIVATE_KEY,
		clientEmail: process.env.CLIENT_EMAIL,
		clientId: process.env.CLIENT_ID,
		authUri: process.env.AUTH_URI,
		tokenUri: process.env.TOKEN_URI,
		authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
	},
};
