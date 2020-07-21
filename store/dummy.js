const { log } = console;

const db = {
  user: [
    { id: '1', name: 'Cristian' },
  ],
};

/**
 * Function to list a table
 * @param {*} table 
 */
const list = (table) => {
  return db[table] || [];
};

const get = (table, id) => {
  const col = list(table);
  return col.filter(item => item.id === id)[0] || null;
};

const upsert = (table, data) => {
  if(!db[table]){
    db[table] = [];
  }

  db[table].push(data);
  log(db);
};

/**
 * Function to query a table
 * @param {*} table 
 * @param {*} query 
 */
const query = async (table, query) => {
  const listStub = await list(table);
  const key = Object.keys(query)[0];
  return listStub.filter(item => item[key] === query[key])[0] || null;
};

const remove = (table, id) => {
  return true;
};

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};