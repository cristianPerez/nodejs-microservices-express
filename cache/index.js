const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const data = require('./network');
const errors = require('../network/errors');

const app = express();
const  { log } = console;

app.use(bodyParser.json())

// Router
app.use('/', data);

app.use(errors);

app.listen(config.cacheService.port, () => {
  log('Redis service listening on port', config.cacheService.port);
});