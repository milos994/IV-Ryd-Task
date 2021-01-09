const { Op } = require('sequelize');

const agents = [
  {
    id: '76944b4b-da2f-478b-8629-c618e1dd33aa',
    email: 'agent1@test.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9b0ebcb4-88f7-4218-b058-e2c07434fcf1',
    email: 'agent2@test.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

module.exports = {
  up: queryInterface => queryInterface.sequelize.transaction(transaction => queryInterface.bulkInsert(
    'agents', agents,
    { transaction },
  )),

  down: queryInterface => queryInterface.sequelize.transaction(transaction => queryInterface.bulkDelete(
    'agents',
    {
      id: {
        [Op.in]: agents.map(agent => agent.id),
      },
    },
    { transaction },
  )),
};
