const { request, expect } = require('../index');

const userId = '7d7b95a5-0e3e-4523-9ca9-0863cb59a89d';

describe('Tests for user routes', () => {
	describe('Get Users', async () => {
		it('GET /users - Should return list of users', async () => {
			const { body: response } = await request
				.get(`/users`)
				.expect(200);
			expect(response).to.be.an('array');

			const properties = [
				'id',
				'email',
				'name',
			];
			response.forEach(user => {
				expect(properties.every(prop => user.hasOwnProperty(prop))).to.be.true;
			});
		});
	});

	describe('Get User By Id', async () => {
		it('GET /users/:userId - Should return user', async () => {
			const { body: response } = await request
				.get(`/users/${userId}`)
				.expect(200);
			expect(response).to.be.an('Object');

			expect(response.name).to.equal(body.name);
			expect(response.text).to.equal(body.text);
		});
	});
});
