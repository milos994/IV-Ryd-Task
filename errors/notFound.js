const BaseError = require('./base');

/**
 * @description Not Found Error Class.
 *
 * @class BadRequestError
 * @extends {BaseError}
 */
class NotFoundError extends BaseError {
	constructor(message) {
		super(404, message);
	}
}

module.exports = NotFoundError;