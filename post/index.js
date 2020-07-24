const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config.js');

const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();
const  { log } = console;

app.use(bodyParser.json())

// Router
app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port, () => {
  log('Posts service listen on port', config.post.port);
});