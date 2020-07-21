const response = require('./response');

const { log } = console;

/**
 * Function to middleware the errors.
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const errors = (err, req, res, next) => {
  log('[error of errors]', err);
  const message = err.message || 'Intern error';
  const status = err.statusCode || 500;
  response.error(req, res, message, status);
};

module.exports = errors;