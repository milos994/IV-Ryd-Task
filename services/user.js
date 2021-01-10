const { User: UserModel } = require('../models');

const NotFoundError = require('../errors/notFound');
const ForbiddenError = require('../errors/forbidden');

/**
 * @description User Service.
 *
 * @class User
 */
class User {
	/**
	 * @description Create user method.
	 *
	 * @static
	 * @param {string} email User email.
	 * @param {string} name User name.
	 * @returns {Object} New user.
	 * @memberof User
	 */
	static async create(email, name) {
		await this.findByEmail(email); // will throw an error if email already exists

		const newUser = await UserModel.create({ email, name });

		return newUser;
	}

	/**
	 * @description Get user by id.
	 *
	 * @static
	 * @param {String} id User id.
	 * @returns {Object} User.
	 * @memberof User
	 */
	static async findById(id) {
		const user = await UserModel.findByPk(id);

		if (!user) {
			throw new NotFoundError(`User with id: ${id} not found.`)
		}

		return user;
	}

	/**
	 * @description Get user by email.
	 *
	 * @static
	 * @param {String} email User email.
	 * @returns {Object} User.
	 * @memberof User
	 */
	static async findByEmail(email) {
		const user = await UserModel.findOne({
			where: {
				email,
			}
		});

		if (user) {
			throw new ForbiddenError(`User with email: ${email} already exists.`)
		}

		return user;
	}

	/**
	 * @description Get all users.
	 *
	 * @static
	 * @returns {Array} Users.
	 * @memberof User
	 */
	static listAllUsers() {
		return UserModel.findAll();
	}
}

module.exports = User;
