const mysql = require('mysql');

const config = require('../config');

const dbConfig = {
  ... config.mysql
};

const { log } = console;

// Connect
let connection;

const handleConn = () => {
  connection = mysql.createConnection(dbConfig);

  connection.connect(err => {
    if(err) {
      log('[bd error]', err);
      setTimeout(handleConn, 2000);
    } else {
      log('[db connected]');
    }
  });

  connection.on('error', err => {
    log('[bd error]', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConn();
    } else {
      throw err;
    }
  });
};

handleConn();

/**
 * Function to list all users by limit
 * @param {*} table 
 * @param {*} limit 
 */
const list = (table, limit = 12) => {
  return new Promise ((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} LIMIT ${limit}`, (err, data) => {
      if(err) return reject(err);
      resolve(data)
    });
  });
};

/**
 * Function to get an user by id. 
 * @param {*} table 
 * @param {*} id 
 */
const get = (table, id) => {
  return new Promise ((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
      if(err) return reject(err);
      resolve(data)
    });
  });
};

const insert = (table, row) => {
  return new Promise ((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, row, (err, data) => {
      if(err) return reject(err);
      resolve(data)
    });
  });
};

const upsert = (table, row) => insert(table, row);


module.exports = {
  list,
  get,
  upsert,
};
