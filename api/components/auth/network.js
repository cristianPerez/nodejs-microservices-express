const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

const { log } = console;

/**
 * Method to insert or put a user.
 * @param {*} req 
 * @param {*} res 
 */
const login = async (req, res, next) => {
  try {
    const { body: { username, password } } = req;
    const token = await controller.login(username, password);
    response.success(req, res, token, 200);
  } catch (error) {
    log('[error]', error);
    // We handle the error in other middleware
    next(error);
  }
};

// Router
router.post('/login', login);

module.exports = router;