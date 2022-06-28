const fs = require('fs');

class Chat {
	constructor(name) {
		this.name = name;
	}

	save(obj) {
		const exists = fs.existsSync(this.name);
		let file;
		try {
			file = exists ? fs.readFileSync(this.name, 'utf-8') : '';
			file = file && file.length > 0 ? file : '[]';
			const parsedFile = JSON.parse(file);
			parsedFile.push(obj);
			file = JSON.stringify(parsedFile, null, 2);
			fs.writeFileSync(this.name, file);
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	getAll() {
		try {
			const file = fs.readFileSync(this.name, 'utf-8');
			const parsedFile = JSON.parse(file);
			return parsedFile;
		} catch (err) {
			console.error(err);
			return null;
		}
	}
}

module.exports = Chat;
