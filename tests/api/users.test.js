const { request, expect } = require('../index');

const testData = {
	userId: '7d7b95a5-0e3e-4523-9ca9-0863cb59a89d',
	name: 'Milos Nesovanovic',
	email: 'm.nesovanovic@hotmail.rs',
};

const invalidUUID = 'AAA';
const randomUUID = '78673c12-e43a-4934-a647-e1ef3d3d7d36';

const randomEmail = `user${Math.floor(Math.random() * 1000000)}@test.com`;

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
		it('GET /users/:userId - Should throw an error if userId is not valid uuid', async () => {
			const { body: response } = await request
				.get(`/users/${invalidUUID}`)
				.expect(400);
			expect(response.message).to.equal('UserId must be a valid uuid.');
		});

		it('GET /users/:userId - Should throw an error if userId is random uuid', async () => {
			const { body: response } = await request
				.get(`/users/${randomUUID}`)
				.expect(404);
			expect(response.message).to.equal(`User with id: ${randomUUID} not found.`);
		});

		it('GET /users/:userId - Should return user', async () => {
			const { body: response } = await request
				.get(`/users/${testData.userId}`)
				.expect(200);
			expect(response).to.be.an('Object');

			expect(response.email).to.equal(testData.email);
			expect(response.name).to.equal(testData.name);
		});
	});

	describe('Sign Up User', async () => {
		it('POST /users/sign-up - Should throw an error if email is not provided', async () => {
			const { body: response } = await request
				.post(`/users/sign-up`)
				.send({})
				.expect(400);
			expect(response.message).to.equal('Email is required.');
		});

		it('POST /users/sign-up - Should throw an error if email format is not valid', async () => {
			const { body: response } = await request
				.post(`/users/sign-up`)
				.send({
					email: 'aaaa'
				})
				.expect(400);
			expect(response.message).to.equal('Email format is not valid.');
		});

		it('POST /users/sign-up - Should throw an error if email already exists', async () => {
			const { body: response } = await request
				.post(`/users/sign-up`)
				.send({
					email: testData.email,
				})
				.expect(403);
			expect(response.message).to.equal(`User with email: ${testData.email} already exists.`);
		});

		it('POST /users/sign-up - Should create user', async () => {
			const { body: response } = await request
				.post(`/users/sign-up`)
				.send({
					email: randomEmail,
					name: testData.name
				})
				.expect(200);
			expect(response).to.be.an('Object');

			expect(response.email).to.equal(randomEmail);
			expect(response.name).to.equal(testData.name);
		});
	});

	describe('Update User', () => {
		it('PATCH /users/:userId - Should throw an error if userId is not valid uuid', async () => {
			const { body: response } = await request
				.patch(`/users/${invalidUUID}`)
				.send({
					name: 'aaa',
				})
				.expect(400);
			expect(response.message).to.equal('UserId must be a valid uuid.');
		});

		it('PATCH /users/:userId - Should throw an error if userId is random uuid', async () => {
			const { body: response } = await request
				.patch(`/users/${randomUUID}`)
				.send({
					name: 'aaa',
				})
				.expect(404);
			expect(response.message).to.equal(`User with id: ${randomUUID} not found.`);
		});

		it('PATCH /users/:userId - Should throw an error if name is not provided', async () => {
			const { body: response } = await request
				.patch(`/users/${testData.userId}`)
				.send({})
				.expect(400);
			expect(response.message).to.equal('Name is required.');
		});

		it('PATCH /users/:userId - Should update user name', async () => {
			const newName = 'Milos 7';
			const { body: response } = await request
				.patch(`/users/${testData.userId}`)
				.send({
					name: newName,
				})
				.expect(200);
			expect(response).to.be.an('Object');

			expect(response.id).to.equal(testData.userId);
			expect(response.name).to.equal(newName);
		});
	})
});
