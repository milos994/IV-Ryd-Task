const Sequelize = require('sequelize');
const sequelize = require('../databases/postgresql');

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user');
db.Issue = require('./issue');
db.Agent = require('./agent');

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

module.exports = db;
