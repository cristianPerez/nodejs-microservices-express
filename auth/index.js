const jwt = require('jsonwebtoken');

const config = require('../config');
const error = require('../utils/error');
const secret = config.jwt.secret;

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
    throw error('There is not token', 401);
  }

  if(auth.indexOf('Bearer ') === -1) {
    throw error('Invalid token', 403);
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
      throw error('You are not allowed to do this', 401);
    }
  },
};

module.exports = {
  sign,
  check,
};