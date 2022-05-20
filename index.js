'use strict';
console.clear();
class User {
	constructor(name, lastName, books, pets) {
		this.name = name;
		this.lastName = lastName;
		this.books = books;
		this.pets = pets;
	}
	getFullName() {
		return `${this.name} ${this.lastName}`;
	}
	addPet() {
		this.pets.push('dog');
	}
	countPets() {
		return this.pets.length;
	}
	addBook(book) {
		this.books.push(book);
	}
	getBooksNames() {
		return this.books.map((book) => book.title);
	}
}
const books = [
	{
		title: 'Harry Potter',
		author: 'J.K. Rowling',
	},
	{
		title: 'The best book',
		author: 'John Doe',
	},
];
const user = new User('Bill', 'Gates', books, ['cat']);
console.log('Name:', user.getFullName());
user.addPet();
console.log('Pets after add:', user.pets);
console.log('Pets count:', user.countPets());
user.addBook({
	title: 'Alice in Wonderland',
	author: 'Lewis Carroll',
});
console.log('Books after add:', user.getBooksNames());
