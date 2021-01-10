module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(async (transaction) => {
		await queryInterface
			.createTable('users', {
				id: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				email: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				name: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				createdAt: Sequelize.DATE,
				updatedAt: Sequelize.DATE,
				deletedAt: Sequelize.DATE,
			}, { transaction });
	}),
	down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(async (transaction) => {
		await queryInterface.dropTable('users', { transaction });
	}),
};
