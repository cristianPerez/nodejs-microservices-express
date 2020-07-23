const express = require('express');

/* const security = require('./secure'); */
const response  = require('../network/response');
const store  = require('../store/mysql');
/* const controller = require('./index'); */

const router = express.Router();

const { log } = console;

/**
 * Method to list the rows in a table
 * @param {*} req 
 * @param {*} res 
 */
const list = async (req, res, next) => {
  try {
    const datos = await store.list(req.params.table);
    response.success(req, res, datos, 200);
  } catch (error) {
    log('[error]', error);
    // We handle the error in other middleware
    next(error);
  }
};

/**
 * Method to get a single row.
 * @param {*} req 
 * @param {*} res  
 */
const get = async (req, res, next) => {
  try {
    const datos = await store.get(req.params.table, req.params.id);
    response.success(req, res, datos, 200);
  } catch (error) { 
    log('[error]', error);
    // We handle the error in other middleware
    next(error);
  } 
};

/**
 * Method to insert in a table.
 * @param {*} req 
 * @param {*} res  
 */
const insert = async (req, res, next) => {
  try {
    const datos = await store.insert(req.params.table, req.body);
    response.success(req, res, datos, 200);
  } catch (error) { 
    log('[error]', error);
    // We handle the error in other middleware
    next(error);
  } 
};

/**
 * Method to insert or put a row.
 * @param {*} req 
 * @param {*} res 
 */
const upsert = async (req, res, next) => {
   try {
    const datos = await store.upsert(req.params.table, req.body);
    response.success(req, res, datos, 200);
  } catch (error) {
    log('[error]', error);
    // We handle the error in other middleware
    next(error);
  }
};


// Router
router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert); 
router.put('/:table', upsert);

module.exports = router;