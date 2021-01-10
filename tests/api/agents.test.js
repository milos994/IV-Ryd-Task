const { request, expect } = require('../index');

const testData = {
	agentId: '76944b4b-da2f-478b-8629-c618e1dd33aa',
	email: 'agent1@test.com',
};

const invalidUUID = 'AAA';
const randomUUID = '78673c12-e43a-4934-a647-e1ef3d3d7d36';

const randomEmail = `agent${Math.floor(Math.random() * 1000000)}@test.com`;

describe('Tests for agent routes', () => {
	describe('Get Agents', async () => {
		it('GET /agents - Should return list of agents', async () => {
			const { body: response } = await request
				.get(`/agents`)
				.expect(200);
			expect(response).to.be.an('array');

			const properties = [
				'id',
				'email',
				'isBusy',
			];
			response.forEach(agent => {
				expect(properties.every(prop => agent.hasOwnProperty(prop))).to.be.true;
			});
		});
	});

	describe('Get Agent By Id', async () => {
		it('GET /agents/:agentId - Should throw an error if agentId is not valid uuid', async () => {
			const { body: response } = await request
				.get(`/agents/${invalidUUID}`)
				.expect(400);
			expect(response.message).to.equal('AgentId must be a valid uuid.');
		});

		it('GET /agents/:agentId - Should throw an error if agentId is random uuid', async () => {
			const { body: response } = await request
				.get(`/agents/${randomUUID}`)
				.expect(404);
			expect(response.message).to.equal(`Agent with id: ${randomUUID} not found.`);
		});

		it('GET /agents/:agentId - Should return agent', async () => {
			const { body: response } = await request
				.get(`/agents/${testData.agentId}`)
				.expect(200);
			expect(response).to.be.an('Object');

			expect(response.email).to.equal(testData.email);
		});
	});

	describe('Sign Up Agent', async () => {
		it('POST /agents/sign-up - Should throw an error if email is not provided', async () => {
			const { body: response } = await request
				.post(`/agents/sign-up`)
				.send({})
				.expect(400);
			expect(response.message).to.equal('Email is required.');
		});

		it('POST /agents/sign-up - Should throw an error if email format is not valid', async () => {
			const { body: response } = await request
				.post(`/agents/sign-up`)
				.send({
					email: 'aaaa'
				})
				.expect(400);
			expect(response.message).to.equal('Email format is not valid.');
		});

		it('POST /agents/sign-up - Should throw an error if email already exists', async () => {
			const { body: response } = await request
				.post(`/agents/sign-up`)
				.send({
					email: testData.email,
				})
				.expect(403);
			expect(response.message).to.equal(`Agent with email: ${testData.email} already exists.`);
		});

		it('POST /agents/sign-up - Should create agent', async () => {
			const { body: response } = await request
				.post(`/agents/sign-up`)
				.send({
					email: randomEmail,
				})
				.expect(200);
			expect(response).to.be.an('Object');
			expect(response.email).to.equal(randomEmail);
		});
	});
});
