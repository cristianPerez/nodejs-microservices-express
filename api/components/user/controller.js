const { nanoid } = require('nanoid');

const auth = require('../auth');

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
    const { id, name, userName, password } = body;
    const user = {
      id: id || nanoid(),
      name,
      userName, 
    };

    if(password || userName){
      await auth.upsert({
        id: user.id,
        userName,
        password,
      });
    }

    return store.upsert(TABLE, user);
  };

  return  {
    list,
    get,
    upsert,
  };
};