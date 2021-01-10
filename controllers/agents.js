const Router = require('express').Router();
const { v4: uuid, validate } = require('uuid');
const validator = require('email-validator');

const AgentService = require('../services/agent');
const BadRequestError = require('../errors/badRequest');

Router.get('/agents', async (req, res, next) => {
	try {
		const agents = await AgentService.listAllAgents();

		res.send(agents);
	} catch (err) {
		return next(err);
	}
});

Router.get('/agents/:agentId', async (req, res, next) => {
	try {
		const {
			params: { agentId, }
		} = req;

		if (!validate(agentId)) {
			throw new BadRequestError('AgentId must be a valid uuid.')
		}

		const agent = await AgentService.findById(agentId);
		res.send(agent);
	} catch (err) {
		return next(err);
	}
});

Router.post('/agents/sign-up', async (req, res, next) => {
	try {
		const {
			body: {
				email,
			}
		} = req;

		if (!email) {
			throw new BadRequestError('Email is required.');
		}

		if (!validator.validate(email)) {
			throw new BadRequestError('Email format is not valid.');
		}

		const agent = await AgentService.create(email);
		res.send(agent);
	} catch (err) {
		return next(err);
	}
});

module.exports = Router;