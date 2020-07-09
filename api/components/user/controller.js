const nanoid = require('nanoid');

const TABLE = 'users';

module.exports = (injectedStore) => {
  let store = injectedStore;

  if(!store) {
    store = require('../../../store/dummy');
  }

  const list = async () => {
    return store.list(TABLE);
  };

  const get = async (id) => {
    return store.get(TABLE, id);
  };

  const upsert =  async (body) => {
    const user = {
      id: body.id ? body.id : nanoid(),
      name: body.name,
    };
    return store.upsert(TABLE, user);
  };

  return  {
    list,
    get,
    upsert,
  };
};