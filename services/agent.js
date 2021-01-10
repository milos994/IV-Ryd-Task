const { Agent: AgentModel } = require('../models');

const NotFoundError = require('../errors/notFound');
const ForbiddenError = require('../errors/forbidden');

/**
 * @description Agent Service.
 *
 * @class Agent
 */
class Agent {
	/**
	 * @description Create agent method.
	 *
	 * @static
	 * @param {string} email Agent email.
	 * @returns {Object} New agent.
	 * @memberof Agent
	 */
	static async create(email, name) {
		await this.findByEmail(email); // will throw an error if email already exists

		const newAgent = await AgentModel.create({ email });

		return newAgent;
	}

	/**
	 * @description Get agent by id.
	 *
	 * @static
	 * @param {String} id Agent id.
	 * @returns {Object} Agent.
	 * @memberof Agent
	 */
	static async findById(id) {
		const agent = await AgentModel.findByPk(id);

		if (!agent) {
			throw new NotFoundError(`Agent with id: ${id} not found.`)
		}

		return agent;
	}

	/**
	 * @description Get agent by email.
	 *
	 * @static
	 * @param {String} email Agent email.
	 * @returns {Object} Agent.
	 * @memberof Agent
	 */
	static async findByEmail(email) {
		const agent = await AgentModel.findOne({
			where: {
				email,
			}
		});

		if (agent) {
			throw new ForbiddenError(`Agent with email: ${email} already exists.`)
		}

		return agent;
	}

	/**
	 * @description Get all agents.
	 *
	 * @static
	 * @returns {Array} Agents.
	 * @memberof Agent
	 */
	static listAllAgents() {
		return AgentModel.findAll();
	}
}

module.exports = Agent;
