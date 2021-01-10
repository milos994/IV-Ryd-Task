const sequelize = require('../databases/postgresql');

const {
	Agent: AgentModel,
	Issue: IssueModel
} = require('../models');

const IssueConstants = require('../constants/issue');
const NotFoundError = require('../errors/notFound');

/**
 * @description Issue Service.
 *
 * @class Issue
 */
class Issue {
	/**
	 * @description Create issue.
	 *
	 * @static
	 * @param {string} userId User id.
	 * @param {string} text Issue text.
	 * @returns {Object} New issue.
	 * @memberof Issue
	 */
	static async create(userId, text) {
		return sequelize.transaction(async (transaction) => {
			// It will returns free agent with the least number of finished issues
			const agentToAssign = await AgentModel.findOne({
				where: {
					isBusy: false,
				},
				attributes: {
					include: [[sequelize.fn("COUNT", sequelize.col("issues.id")), "issueCount"]]
				},
				include: [
					{
						model: IssueModel,
						attributes: []
					}
				],
				group: ['agent.id'],
				order: [[sequelize.literal('"issueCount"'), 'ASC']],
				subQuery: false,
			}, { transaction });

			const agentId = agentToAssign ? agentToAssign.id : null;
			const status = agentToAssign ? IssueConstants.STATUS.IN_PROGRESS : IssueConstants.STATUS.NEW;

			const newIssue = await IssueModel.create({
				userId,
				text,
				agentId,
				status
			}, { transaction });

			if (agentToAssign) {
				await agentToAssign.update({
					isBusy: true,
				}, { transaction });
			}

			return newIssue;
		})
	}

	/**
	 * @description Close agent issue.
	 * 
	 * @param {Object} agent Agent model.
	 * @param {Object} issue Issue model.
	 */
	static closeIssue(agent, issue) {
		return sequelize.transaction(async (transaction) => {
			await agent.update({
				isBusy: false,
			}, { transaction });

			return issue.update({
				status: IssueConstants.STATUS.DONE,
			}, { transaction });
		})
	}

	/**
	 * @description Assigne open issues to agent.
	 *
	 * @static
	 * @param {Object} agent Agent Model.
	 * @returns {Object} Issue.
	 * @memberof Issue
	 */
	static assignNewIssueToAgent(agent) {
		return sequelize.transaction(async (transaction) => {
			const issueToAssign = await this.getOpenIssue();

			if (issueToAssign) {
				await agent.update({
					isBusy: true,
				}, { transaction });

				return issueToAssign.update({
					status: IssueConstants.STATUS.IN_PROGRESS,
					agentId: agent.id,
				}, { transaction });
			}
		})
	}

	/**
	 * @description Get all user issues.
	 *
	 * @static
	 * @param {String} userId User id.
	 * @returns {Array} User Issues.
	 * @memberof Issue
	 */
	static listAllUserIssues(userId) {
		return IssueModel.findAll({
			where: {
				userId,
			}
		});
	}

	/**
	 * @description Get issue by id.
	 *
	 * @static
	 * @param {String} id Issue id.
	 * @returns {Object} Issue.
	 * @memberof Issue
	 */
	static async findById(id) {
		const issue = await IssueModel.findByPk(id);

		if (!issue) {
			throw new NotFoundError(`Issue with id: ${id} not found.`)
		}

		return issue;
	}

	/**
	 * @description Get Agent issue.
	 *
	 * @static
	 * @param {String} agentId Agent id.
	 * @param {String} issueId Isue id.
	 * @returns {Object} Issue.
	 * @memberof Issue
	 */
	static async getAgentIssue(agentId, issueId) {
		const issue = await IssueModel.findOne({
			where: {
				agentId,
				id: issueId,
			}
		});

		if (!issue) {
			throw new NotFoundError(`Issue with id: ${issueId} not found.`)
		}

		return issue;
	}


	/**
	 * @description Get all agent issues.
	 *
	 * @static
	 * @param {String} agentId Agent id.
	 * @returns {Array} Agent Issues.
	 * @memberof Issue
	 */
	static listAllAgentIssues(agentId) {
		return IssueModel.findAll({
			where: {
				agentId,
			}
		});
	}

	/**
	 * @description Get open issue.
	 *
	 * @static
	 * @returns {Object} Issue.
	 * @memberof Issue
	 */
	static getOpenIssue() {
		return IssueModel.findOne({
			where: {
				status: IssueConstants.STATUS.NEW,
			},
			order: [
				['createdAt', 'asc'],
			],
		})
	};
}

module.exports = Issue;
