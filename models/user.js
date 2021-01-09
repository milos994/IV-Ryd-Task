const Sequelize = require('sequelize');
const sequelize = require('../databases/postgresql');

const User = sequelize.define('user', {
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
});

module.exports = User;
