const Router = require('express').Router();
const { v4: uuid, validate } = require('uuid');
const validator = require('email-validator');

const UserService = require('../services/user');
const BadRequestError = require('../errors/badRequest');

Router.get('/users', async (req, res, next) => {
	try {
		const users = await UserService.listAllUsers();

		res.send(users);
	} catch (err) {
		return next(err);
	}
});

Router.get('/users/:userId', async (req, res, next) => {
	try {
		const {
			params: { userId, }
		} = req;

		if (!validate(userId)) {
			throw new BadRequestError('UserId must be a valid uuid.')
		}

		const user = await UserService.findById(userId);
		res.send(user);
	} catch (err) {
		return next(err);
	}
});

Router.post('/users/sign-up', async (req, res, next) => {
	try {
		const {
			body: {
				email,
				name,
			}
		} = req;

		if (!email) {
			throw new BadRequestError('Email is required.');
		}

		if (!validator.validate(email)) {
			throw new BadRequestError('Email format is not valid.');
		}

		const user = await UserService.create(email, name);
		res.send(user);
	} catch (err) {
		return next(err);
	}
});

Router.patch('/users/:userId', async (req, res, next) => {
	try {
		const {
			params: {
				userId,
			},
			body: {
				name,
			}
		} = req;

		if (!validate(userId)) {
			throw new BadRequestError('UserId must be a valid uuid.')
		}

		if (!name) {
			throw new BadRequestError('Name is required.');
		}

		const user = await UserService.findById(userId);
		await user.update({ name });

		res.send(user);
	} catch (err) {
		return next(err);
	}
});

module.exports = Router;