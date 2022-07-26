import fs from 'fs';

export default class Products {
	constructor(name) {
		this.name = name;
	}

	async save(obj) {
		const exists = fs.existsSync(this.name);
		let file;
		let id;
		try {
			file = exists ? await fs.promises.readFile(this.name, 'utf-8') : '';
			file = file && file.length > 0 ? file : '[]';
			const parsedFile = JSON.parse(file);
			id = parsedFile[parsedFile.length - 1]?.id + 1 || 1;
			parsedFile.push({ id, ...obj, date: Date.now() });
			file = JSON.stringify(parsedFile, null, 2);
			await fs.promises.writeFile(this.name, file);
		} catch (err) {
			console.error(err);
			return null;
		}
		return id;
	}

	async getById(id) {
		try {
			const file = await fs.promises.readFile(this.name, 'utf-8');
			const parsedFile = JSON.parse(file);
			const result = parsedFile.find((item) => item.id === Number(id));
			return result;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	async getAll() {
		try {
			const file = await fs.promises.readFile(this.name, 'utf-8');
			const parsedFile = JSON.parse(file);
			return parsedFile;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	async deleteById(id) {
		try {
			const file = await fs.promises.readFile(this.name, 'utf-8');
			const parsedFile = JSON.parse(file);
			const objIndex = parsedFile.findIndex((item) => item.id === Number(id));
			if (objIndex > -1) {
				parsedFile.splice(objIndex, 1);
			} else {
				throw new Error('No se encontró el producto con el id ' + id);
			}
			const newFile = JSON.stringify(parsedFile, null, 2);
			await fs.promises.writeFile(this.name, newFile);
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	async deleteAll() {
		try {
			fs.promises.writeFile(this.name, '');
		} catch (err) {
			console.error(err);
		}
	}

	async updateById(id, obj) {
		try {
			const file = await fs.promises.readFile(this.name, 'utf-8');
			const parsedFile = JSON.parse(file);
			const objIndex = parsedFile.findIndex((item) => item.id === Number(id));
			parsedFile[objIndex] = { ...parsedFile[objIndex], ...obj };
			const newFile = JSON.stringify(parsedFile, null, 2);
			await fs.promises.writeFile(this.name, newFile);
		} catch (err) {
			console.error(err);
		}
	}
}
