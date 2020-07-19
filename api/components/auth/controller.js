const TABLE = 'auth';

module.exports = (injectedStore) => {
    let store = injectedStore;
  
    if(!store) {
      store = require('../../../store/dummy');
    }

    const upsert = (data) => {
      const { id, userName, password } = data;
      const authData = { id, userName, password };

      return store.upsert(TABLE, authData);
    };

    return {
      upsert,
    }
};
