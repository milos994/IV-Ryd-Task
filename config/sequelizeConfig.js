const config = require('config');

module.exports = {
	[process.env.NODE_ENV]: {
		username: config.get('database.postgresql.user'),
		password: config.get('database.postgresql.password'),
		database: config.get('database.postgresql.database'),
		host: config.get('database.postgresql.host'),
		port: config.get('database.postgresql.port'),
		dialect: 'postgresql',
		seederStorage: 'sequelize',
	},
};
