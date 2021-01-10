const sequelize = require('../databases/postgresql');

const {
	Agent: AgentModel,
	Issue: IssueModel
} = require('../models');

const IssueConstants = require('../constants/issue');

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
	 * @memberof User
	 */
	static create(userId, text) {
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
	 * @description Get all user issues.
	 *
	 * @static
	 * @param {String} userId User id.
	 * @returns {Array} User Issues.
	 * @memberof User
	 */
	static listAllUserIssues(userId) {
		return IssueModel.findAll({
			where: {
				userId,
			}
		});
	}
}

module.exports = Issue;
