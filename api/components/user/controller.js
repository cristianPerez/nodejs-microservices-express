const { nanoid } = require('nanoid');

const auth = require('../auth');

const TABLE = 'user';

module.exports = (injectedStore) => {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/mysql');
  }

  const list = () => store.list(TABLE);

  const get = (id) => store.get(TABLE, id);

  /**
   * Function for insert or update a post.
   * @param {*} body 
   */
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

  /**
   * Function to follow another user.
   * @param {*} user 
   */
  const following = (user) => {
    const join = {};
    join[TABLE] = 'user_to'; // { USER: `user_to` }
    const query = { user_from: user };
    return store.query(`${TABLE}_follow`, query, join);
  };

  return {
    list,
    get,
    upsert,
    follow,
    following,
  };
};