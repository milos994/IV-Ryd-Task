const Sequelize = require('sequelize');
const sequelize = require('../databases/postgresql');

const Agent = sequelize.define('agent', {
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
	}
});

module.exports = Agent;
