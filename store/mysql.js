const mysql = require('mysql');

const config = require('../config');

const dbConfig = {
  ... config.mysql
};

const { log } = console;

// Connect
let connection;

/**
 * Function to handle the connection with mysql.
 */
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

/**
 * Function to insert one row in a table.
 * @param {*} table 
 * @param {*} row 
 */
const insert = (table, row) => {
  return new Promise ((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, row, (err, data) => {
      if(err) return reject(err);
      resolve(data)
    });
  });
};

/**
 * Function to update a row.
 * @param {*} table 
 * @param {*} row 
 */
const update = (table, row) => {
  return new Promise ((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [row, row.id], (err, data) => {
      if(err) return reject(err);
      resolve(data)
    });
  });
};

/**
 * Function to update or insert one row.
 * @param {*} table 
 * @param {*} row 
 */
const upsert = (table, row) => {
  if(row && row.id) {
    return update(table, row);
  } else {
    return insert(table, row);
  }
};

/**
 * Function to query any table.
 * @param {*} table 
 * @param {*} query 
 */
const query = (table, query, join) => {
  let joinQuery = '';
  if(join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, query, (err, data) => {
      if(err) return reject(err);
      resolve(data[0] || null)
    });
  });
};


module.exports = {
  list,
  get,
  insert,
  upsert,
  query,
};
