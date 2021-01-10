const Router = require('express').Router();
const { v4: uuid, validate } = require('uuid');

const IssueService = require('../services/issue');
const UserService = require('../services/user');
const AgentService = require('../services/agent');

const BadRequestError = require('../errors/badRequest');

Router.post('/users/:userId/issues', async (req, res, next) => {
	try {
		const {
			params: {
				userId,
			},
			body: {
				text,
			}
		} = req;

		if (!validate(userId)) {
			throw new BadRequestError('UserId must be a valid uuid.')
		}

		const user = await UserService.findById(userId);
		const issue = await IssueService.create(userId, text)

		res.send(issue);
	} catch (err) {
		return next(err);
	}
});

Router.get('/users/:userId/issues', async (req, res, next) => {
	try {
		const {
			params: {
				userId,
			},
		} = req;

		if (!validate(userId)) {
			throw new BadRequestError('UserId must be a valid uuid.')
		}

		const user = await UserService.findById(userId);
		const issues = await IssueService.listAllUserIssues(user.id)

		res.send(issues);
	} catch (err) {
		return next(err);
	}
});

Router.get('/agents/:agentId/issues', async (req, res, next) => {
	try {
		const {
			params: {
				agentId,
			},
		} = req;

		if (!validate(agentId)) {
			throw new BadRequestError('AgentId must be a valid uuid.')
		}

		const agent = await AgentService.findById(agentId);
		const issues = await IssueService.listAllAgentIssues(agent.id)

		res.send(issues);
	} catch (err) {
		return next(err);
	}
});

Router.patch('/agents/:agentId/issues/:issueId', async (req, res, next) => {
	try {
		const {
			params: {
				agentId,
				issueId,
			},
		} = req;

		if (!validate(agentId)) {
			throw new BadRequestError('AgentId must be a valid uuid.')
		}

		if (!validate(issueId)) {
			throw new BadRequestError('IssueId must be a valid uuid.')
		}

		const agent = await AgentService.findById(agentId);
		const issue = await IssueService.getAgentIssue(agentId, issueId)

		const updatedIssue = await IssueService.closeIssue(agent, issue)
		await IssueService.assignNewIssueToAgent(agent);

		res.send(updatedIssue);
	} catch (err) {
		return next(err);
	}
});

module.exports = Router;