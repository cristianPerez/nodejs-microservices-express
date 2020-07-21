const auth = require('../../../auth');
const bcrypt = require('bcrypt');

const error = require('../../../utils/error');

const TABLE = 'auth';

const { log } = console;

module.exports = (injectedStore) => {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/mysql');
  }

  /**
   * Function to login the user
   * @param {*} username 
   * @param {*} password 
   */
  const login = async (username, password) => {
    const data = await store.query(TABLE, { username });
    if (data) {
      const isValid = await bcrypt.compare(password, data.password);
      if (isValid) {
        const token = await auth.sign({ username, password, id: data.id });
        return { token };
      } else {
        log('There is an error with the login');
        throw error("Invalid data", 401);
      }
    } else {
      log('We do not find the username');
      throw error('We do not find the username', 401);
    }
  };

  const upsert = async (data) => {
    const { id, username, password } = data;
    const authData = { id, username, password: await bcrypt.hash(password, 5) };
    return store.upsert(TABLE, authData);
  };

  return {
    upsert,
    login
  }
};
