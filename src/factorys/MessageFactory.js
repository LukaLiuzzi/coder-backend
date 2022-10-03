class MessagesFactory {
	createMessage(data) {
		if (data.type === 'private') return new PrivateMessage(data);
		if (data.type === 'public') return new PublicMessage(data);
		if (data.type === 'group') return new GroupMessage(data);
	}

	static createInstance() {
		if (!MessagesFactory.instance) return new Container(knexConfig, table);
	}
}

module.exports = MessagesFactory;
