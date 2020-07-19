const { log } = console;

const db = {
  users: [
    { id: '1', name: 'Cristian' },
  ],
};

const list = (table) => {
  return db[table];
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

const remove = (table, id) => {
  return true;
};

module.exports = {
  list,
  get,
  upsert,
  remove,
};