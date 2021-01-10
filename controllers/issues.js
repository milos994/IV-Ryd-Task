const Router = require('express').Router();
const { v4: uuid, validate } = require('uuid');

const IssueService = require('../services/issue');
const UserService = require('../services/user');
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

module.exports = Router;