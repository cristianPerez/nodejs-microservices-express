const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi  =require('swagger-ui-express');


const config = require('../config');
const data = require('./network');
const errors = require('../network/errors');
const swaggerDoc = require('./swagger.json');

const app = express();
const  { log } = console;

app.use(bodyParser.json())

// Router
app.use('/', data);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);

app.listen(config.mysqlService.port, () => {
  log('Mysql service listening on port', config.mysqlService.port);
});