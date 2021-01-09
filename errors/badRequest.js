const BaseError = require('./base');

/**
 * @description Bad Request Error Class.
 *
 * @class BadRequestError
 * @extends {BaseError}
 */
class BadRequestError extends BaseError {
	constructor(message) {
		super(400, message);
	}
}

module.exports = BadRequestError;