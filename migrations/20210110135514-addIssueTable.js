const IssueConstants = require('../constants/issue');

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(async (transaction) => {
		await queryInterface
			.createTable('issues', {
				id: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				text: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				status: {
					type: Sequelize.ENUM,
					values: [
						IssueConstants.STATUS.NEW,
						IssueConstants.STATUS.IN_PROGRESS,
						IssueConstants.STATUS.DONE,
					],
					defaultValue: IssueConstants.STATUS.NEW,
				},
				userId: {
					type: Sequelize.UUID,
					allowNull: false,
					references: {
						model: 'users',
					},
				},
				agentId: {
					type: Sequelize.UUID,
					allowNull: true,
					references: {
						model: 'agents',
					},
				},
				createdAt: Sequelize.DATE,
				updatedAt: Sequelize.DATE,
				deletedAt: Sequelize.DATE,
			}, { transaction });
	}),
	down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(async (transaction) => {
		await queryInterface.dropTable('issues', { transaction });
	}),
};
