const auth = require('../../../auth');
const bcrypt = require('bcrypt');

const TABLE = 'auth';

const { log } = console;

module.exports = (injectedStore) => {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/dummy');
  }

  /**
   * Function to login the user
   * @param {*} username 
   * @param {*} password 
   */
  const login = async (username, password) => {
    const data = await store.query(TABLE, { username });
    const isValid = bcrypt.compare(password, data.password);
    if (isValid) {
      const token = await auth.sign(data);
      return { token };
    } else {
      log('There is an error with the login');
      throw new Error("Invalid data");
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
