
const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const app = require('../index');

chai.use(chaiHttp);
const request = supertest(app);

module.exports = {
	chai,
	expect: chai.expect,
	request,
};
