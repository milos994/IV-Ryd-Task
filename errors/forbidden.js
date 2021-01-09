const BaseError = require('./base');

/**
 * @description Forbidden Error Class.
 *
 * @class ForbiddenError
 * @extends {BaseError}
 */
class ForbiddenError extends BaseError {
	constructor(message) {
		super(403, message);
	}
}

module.exports = ForbiddenError;