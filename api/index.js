const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi  =require('swagger-ui-express');

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const errors = require('../network/errors');
const swaggerDoc = require('./swagger.json');

const app = express();
const  { log } = console;

app.use(bodyParser.json())

// Router
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);

app.listen(config.api.port, () => {
  log('Listen on port', config.api.port);
});