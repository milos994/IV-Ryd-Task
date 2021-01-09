const { Op } = require('sequelize');
const users = [
	{
		id: '7d7b95a5-0e3e-4523-9ca9-0863cb59a89d',
		name: 'Milos Nesovanovic',
		email: 'm.nesovanovic@hotmail.rs',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: '9b0ebcb4-88f7-4218-b058-e2c07434fcf1',
		name: 'Test User',
		email: 'user@test.com',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}
];

module.exports = {
	up: queryInterface => queryInterface.sequelize.transaction(transaction => queryInterface.bulkInsert(
		'users', users,
		{ transaction },
	)),

	down: queryInterface => queryInterface.sequelize.transaction(transaction => queryInterface.bulkDelete(
		'users',
		{
			id: {
				[Op.in]: users.map(user => user.id),
			},
		},
		{ transaction },
	)),
};
