const Message = require('./message');

class PrivateMessage extends Message {
	constructor(data) {
		super();
		this.type = 'private';
	}
}
class PublicMessage extends Message {
	constructor(data) {
		super();
		this.type = 'public';
	}
}
class GroupMessage extends Message {
	constructor(data) {
		super();
		this.type = 'group';
	}
}

module.exports = { PrivateMessage, PublicMessage, GroupMessage };
