const express = require('express');

const security = require('./secure');
const response  = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

const { log } = console;

/**
 * Method to list users
 * @param {*} req 
 * @param {*} res 
 */
const list = async (req, res, next) => {
  try {
    const list = await controller.list();
    response.success(req, res, list, 200);
  } catch (error) {
    log('[error]', error);
    // We handle the error in other middleware
    next(error);
  }
};

/**
 * Method to get a single user.
 * @param {*} req 
 * @param {*} res  
 */
const get = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const user = await controller.get(id);
    response.success(req, res, user, 200);
  } catch (error) { 
    log('[error]', error);
    // We handle the error in other middleware
    next(error);
  } 
};

/**
 * Method to insert or put a user.
 * @param {*} req 
 * @param {*} res 
 */
const upsert = async (req, res, next) => {
   try {
      const { body } = req;
    const user = await controller.upsert(body);
    response.success(req, res, user, 200);
  } catch (error) {
    log('[error]', error);
    // We handle the error in other middleware
    next(error);
  }
};

/**
 * Function to follow another user.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const follow = async (req, res, next) => {
  try {
    const { user: { id }, params } = req;
    const followAnswer = await controller.follow(id, params.id);
    response.success(req, res, followAnswer, 201);
  } catch (error) {
    log('[error]', error);
    // We handle the error in other middleware
    next(error);
  }
};

// Router
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert); 
router.put('/', security('update'), upsert); 
router.post('/follow/:id', security('follow'), follow);

module.exports = router;