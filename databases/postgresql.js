const Sequelize = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(
	config.get('database.postgresql.database'),
	config.get('database.postgresql.user'),
	config.get('database.postgresql.password'),
	{
		logging: false,
		dialect: 'postgres',
		host: config.get('database.postgresql.host'),
		port: config.get('database.postgresql.port'),
		define: {
			paranoid: true,
		},
	}
);

module.exports = sequelize;
