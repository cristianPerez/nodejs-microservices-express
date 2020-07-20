const jwt = require('jsonwebtoken');

const config = require('../config');
const secret = config.jwt.secret;

const { log } = console;

/**
 * Function to generate a jwt
 * @param {*} data 
 */
const sign = (data) => jwt.sign(data, secret);

/**
 * Function to verify the token
 * @param {*} token 
 */
const verify = (token) => jwt.verify(token, secret);

/**
 * Function to get tge token from headers.
 * @param {*} auth 
 */
const getToken = (auth) => {
  // Bearer saadsgsdgasdgasgas
  if(!auth) {
    throw new Error('There is not token');
  }

  if(auth.indexOf('Bearer ') === -1) {
    throw new Error('Invalid token');
  }

  return auth.replace('Bearer ', '');

};

const decodeHeader = (req) => {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
};

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);
    if(decoded.id !== owner) {
      throw new Error('You are not allowed to do this');
    }
  },
};

module.exports = {
  sign,
  check,
};