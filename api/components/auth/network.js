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
const login = async (req, res) => {
  try {
    const { body: { username, password } } = req;
    const token = await controller.login(username, password);
    response.success(req, res, token, 200);
  } catch (error) {
    log(error);
    response.error(req, res, error.message, 500);
  }
};

// Router
router.post('/login', login);

module.exports = router;