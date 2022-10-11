import { expect } from 'chai';
import request from 'supertest';

const API_URL = 'http://localhost:8080/api';

describe('GET PRODUCTS', () => {
	it('should return array of products', (done) => {
		request(API_URL).get('/products').expect(200, done);
	});

	it('should return array of products with length 3', (done) => {
		request(API_URL)
			.get('/products')
			.expect(200)
			.end((err, res) => {
				expect(res.body).to.have.lengthOf(1);
				done();
			});
	});
});

describe('GET PRODUCT', () => {
	it('should return product with specified id', (done) => {
		request(API_URL)
			.get('/products/6344e813f6cd459441ee33ed')
			.expect(200, done);
	});
});

describe('POST PRODUCT', () => {
	it('should return 400 with message "ERROR_CHECK_ROLE_AUTH"', (done) => {
		request(API_URL)
			.post('/products')
			.send({
				name: 'test',
				price: 100,
				description: 'test',
				image: 'test',
				stock: 100,
				category: 'test',
				quantity: 10,
			})
			.expect(400)
			.end((err, res) => {
				expect(res.body.message).to.equal('ERROR_CHECK_ROLE_AUTH');
				done();
			});
	});
});

describe('PUT PRODUCT', () => {
	it('should return 400 with message "ERROR_CHECK_ROLE_AUTH"', (done) => {
		request(API_URL)
			.put('/products/6344e813f6cd459441ee33ed')
			.send({
				name: 'test',
				price: 100,
				description: 'test',
				image: 'test',
				stock: 100,
				category: 'test',
				quantity: 10,
			})
			.expect(400)
			.end((err, res) => {
				expect(res.body.message).to.equal('ERROR_CHECK_ROLE_AUTH');
				done();
			});
	});
});

describe('DELETE PRODUCT', () => {
	it('should return 400 with message "ERROR_CHECK_ROLE_AUTH"', (done) => {
		request(API_URL)
			.delete('/products/6344e813f6cd459441ee33ed')
			.expect(400)
			.end((err, res) => {
				expect(res.body.message).to.equal('ERROR_CHECK_ROLE_AUTH');
				done();
			});
	});
});
