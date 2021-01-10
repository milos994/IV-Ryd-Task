module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(async (transaction) => {
		await queryInterface
			.createTable('agents', {
				id: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				email: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				isBusy: {
					type: Sequelize.BOOLEAN,
					defaultValue: false,
				},
				createdAt: Sequelize.DATE,
				updatedAt: Sequelize.DATE,
				deletedAt: Sequelize.DATE,
			}, { transaction });
	}),
	down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(async (transaction) => {
		await queryInterface.dropTable('agents', { transaction });
	}),
};
