const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const BaseError = require('./errors/base');

const app = express();

const usersController = require('./controllers/users');
const issuesController = require('./controllers/issues');
const agentsController = require('./controllers/agents');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	optionsSuccessStatus: 204
}));

app.use(usersController);
app.use(issuesController);
app.use(agentsController);

app.use((err, req, res, next) => {
	if (err instanceof BaseError) {
		res.status(err.status).json({ message: err.message });
	} else {
		res.status(500).json({ message: 'Internal Server Error' });
	}
	next();
});

app.listen(8000);

module.exports = app;