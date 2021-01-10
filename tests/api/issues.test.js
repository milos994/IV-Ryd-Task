const { request, expect } = require('../index');
const IssueConstants = require('../../constants/issue');

const testData = {
	userId: '7d7b95a5-0e3e-4523-9ca9-0863cb59a89d',
	agentId: '76944b4b-da2f-478b-8629-c618e1dd33aa',
	text: 'text'
};

const invalidUUID = 'AAA';
const randomUUID = '78673c12-e43a-4934-a647-e1ef3d3d7d36';

let issueId;

const {
	Agent: AgentModel,
} = require('../../models');

describe('Tests for issue routes', () => {
	describe('Create Issue', async () => {
		it('POST /users/:userId/issues - Should throw an error if userId is not valid uuid', async () => {
			const { body: response } = await request
				.post(`/users/${invalidUUID}/issues`)
				.send({
					text: testData.text
				})
				.expect(400);
			expect(response.message).to.equal('UserId must be a valid uuid.');
		});

		it('POST /users/:userId/issues - Should throw an error if userId is random uuid', async () => {
			const { body: response } = await request
				.post(`/users/${randomUUID}/issues`)
				.send({
					text: testData.text
				})
				.expect(404);
			expect(response.message).to.equal(`User with id: ${randomUUID} not found.`);
		});

		it('POST /users/:userId/issues - Should throw an error if text is not provided', async () => {
			const { body: response } = await request
				.post(`/users/${testData.userId}/issues`)
				.send({})
				.expect(400);
			expect(response.message).to.equal('Text is required.');
		});

		it('POST /users/:userId/issues - Should create issue and assign to agent', async () => {
			const { body: response } = await request
				.post(`/users/${testData.userId}/issues`)
				.send({
					text: testData.text
				})
				.expect(200);
			expect(response).to.be.an('Object');

			expect(response.userId).to.equal(testData.userId);
			expect(response.text).to.equal(testData.text);
			expect(response.status).to.equal(IssueConstants.STATUS.IN_PROGRESS);
		});

		it('POST /users/:userId/issues - Should create one more issue and assign to second agent', async () => {
			const { body: response } = await request
				.post(`/users/${testData.userId}/issues`)
				.send({
					text: testData.text
				})
				.expect(200);
			expect(response).to.be.an('Object');

			expect(response.userId).to.equal(testData.userId);
			expect(response.text).to.equal(testData.text);
			expect(response.status).to.equal(IssueConstants.STATUS.IN_PROGRESS);
		});
	});

	describe('Get User Issues', async () => {
		it('GET /users/:userId/issues - Should throw an error if userId is not valid uuid', async () => {
			const { body: response } = await request
				.get(`/users/${invalidUUID}/issues`)
				.expect(400);
			expect(response.message).to.equal('UserId must be a valid uuid.');
		});

		it('GET /users/:userId/issues - Should throw an error if userId is random uuid', async () => {
			const { body: response } = await request
				.get(`/users/${randomUUID}/issues`)
				.expect(404);
			expect(response.message).to.equal(`User with id: ${randomUUID} not found.`);
		});

		it('GET /users/:userId/issues - Should return list of user issues', async () => {
			const { body: response } = await request
				.get(`/users/${testData.userId}/issues`)
				.expect(200);
			expect(response).to.be.an('array');
			const properties = [
				'id',
				'text',
				'status',
				'userId',
				'agentId',
			];
			response.forEach(issue => {
				expect(properties.every(prop => issue.hasOwnProperty(prop))).to.be.true;
				expect(issue.userId).to.equal(testData.userId);
			});
		});
	});

	describe('Get Agent Issues', async () => {
		it('GET /agents/:agentId/issues - Should throw an error if agentId is not valid uuid', async () => {
			const { body: response } = await request
				.get(`/agents/${invalidUUID}/issues`)
				.expect(400);
			expect(response.message).to.equal('AgentId must be a valid uuid.');
		});

		it('GET /agents/:agentId/issues - Should throw an error if agentId is random uuid', async () => {
			const { body: response } = await request
				.get(`/agents/${randomUUID}/issues`)
				.expect(404);
			expect(response.message).to.equal(`Agent with id: ${randomUUID} not found.`);
		});

		it('GET /agents/:agentId/issues - Should return list of user issues', async () => {
			const { body: response } = await request
				.get(`/agents/${testData.agentId}/issues`)
				.expect(200);
			expect(response).to.be.an('array');

			issueId = response[0].id;

			const properties = [
				'id',
				'text',
				'status',
				'userId',
				'agentId',
			];
			response.forEach(issue => {
				expect(properties.every(prop => issue.hasOwnProperty(prop))).to.be.true;
				expect(issue.agentId).to.equal(testData.agentId);
			});
		});
	});

	describe('Close Agent Issue', async () => {
		it('PATCH /agents/:agentId/issues/:issueId - Should throw an error if agentId is not valid uuid', async () => {
			const { body: response } = await request
				.patch(`/agents/${invalidUUID}/issues/${issueId}`)
				.expect(400);
			expect(response.message).to.equal('AgentId must be a valid uuid.');
		});

		it('PATCH /agents/:agentId/issues/:issued - Should throw an error if agentId is random uuid', async () => {
			const { body: response } = await request
				.patch(`/agents/${randomUUID}/issues/${issueId}`)
				.expect(404);
			expect(response.message).to.equal(`Agent with id: ${randomUUID} not found.`);
		});

		it('PATCH /agents/:agentId/issues/:issueId - Should throw an error if issueId is not valid uuid', async () => {
			const { body: response } = await request
				.patch(`/agents/${testData.agentId}/issues/${invalidUUID}`)
				.expect(400);
			expect(response.message).to.equal('IssueId must be a valid uuid.');
		});

		it('PATCH /agents/:agentId/issues/:issueId - Should throw an error if issueId is random uuid', async () => {
			const { body: response } = await request
				.patch(`/agents/${testData.agentId}/issues/${randomUUID}`)
				.expect(404);
			expect(response.message).to.equal(`Issue with id: ${randomUUID} not found.`);
		});

		it('PATCH /agents/:agentId/issues/:issueId - Should close issue', async () => {
			const { body: response } = await request
				.patch(`/agents/${testData.agentId}/issues/${issueId}`)
				.expect(200);
			expect(response).to.be.an('object');
			expect(response.agentId).to.equal(testData.agentId);
			expect(response.status).to.equal(IssueConstants.STATUS.DONE);

			const agent = await AgentModel.findByPk(testData.agentId);
			expect(agent.isBusy).to.equal(false);
		});
	});
});
