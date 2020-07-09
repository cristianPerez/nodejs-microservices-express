const express = require('express');

const response  = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

const { log } = console;

/**
 * Method to list users
 * @param {*} req 
 * @param {*} res 
 */
const list = async (req, res) => {
  try {
    const list = await controller.list();
    response.success(req, res, list, 200);
  } catch (error) {
    log(error);
    response.error(req, res, err.message, 500);
  }
};

/**
 * Method to get a single user.
 * @param {*} req 
 * @param {*} res  
 */
const get = async (req, res) => {
  try {
    const { id } = req.params; 
    const user = await controller.get(id);
    response.success(req, res, user, 200);
  } catch (error) { 
    log(error); 
    response.error(req, res, err.message, 500);
  } 
};

/**
 * Method to insert or put a user.
 * @param {*} req 
 * @param {*} res 
 */
const upsert = async (req, res) => {
   try {
      const { body } = req;
    const user = await controller.upsert(body);
    response.success(req, res, user, 200);
  } catch (error) {
    log(error);
    response.error(req, res, err.message, 500);
  }
};

// Router
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert); 
router.put('/', upsert); 

module.exports = router;