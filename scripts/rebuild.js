const models = require('../models/index');
const fs = require('fs');
const exec = require('child_process').execSync;
const config = require('config');
const sequelize = require('../databases/postgresql');

(async function rebuild() {
	try {
		await sequelize.query(`
			DROP SCHEMA public CASCADE;
			CREATE SCHEMA public;
		`);

		// This drops all tables and recreates them. Only use once
		await models.sequelize.sync({ force: true });

		process.exit(0);
	} catch (err) {
		console.trace(err);
		process.exit(1);
	}
}());
