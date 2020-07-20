const jwt = require('jsonwebtoken');

const sign = (data) => jwt.sign(data, 'secreto');

module.exports = {
  sign,
};