const { nanoid } = require('nanoid');

const auth = require('../auth');

const TABLE = 'user';

module.exports = (injectedStore) => {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/mysql');
  }

  const list = async () => {
    return store.list(TABLE);
  };

  const get = async (id) => {
    return store.get(TABLE, id);
  };

  const upsert = async (body) => {
    const { id, name, username, password } = body;
    const user = {
      id: id || nanoid(),
      name,
      username,
    };

    if (password || username) {
      await auth.upsert({
        id: user.id,
        username,
        password,
      });
    }

    return store.upsert(TABLE, user);
  };

  /**
   * Function to follow another user.
   * @param {*} from
   * @param {*} to 
   */
  const follow = (from, to) => store.upsert(`${TABLE}_follow`, {
    user_from: from,
    user_to: to
  });

  return {
    list,
    get,
    upsert,
    follow,
  };
};