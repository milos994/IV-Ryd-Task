const Sequelize = require('sequelize');
const sequelize = require('../databases/postgresql');

const IssueConstants = require('../constants/issue');

const Issue = sequelize.define('issue', {
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
});

Issue.associate = function associate({
	User,
	Agent,
}) {
	User.hasMany(Issue);
	Issue.belongsTo(User);

	Agent.hasMany(Issue);
	Issue.belongsTo(Agent);
};
module.exports = Issue;
