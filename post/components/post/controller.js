const { nanoid } = require('nanoid');

const TABLE = 'post';

module.exports = (injectedStore) => {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/mysql');
  }

  /**
   * Function to list posts
   */
  const list = () =>  store.list(TABLE);

  /**
   * Function for get a post by id.
   * @param {*} id 
   */
  const get = (id) => store.get(TABLE, id);


  /**
   * Function for insert or update a post
   * @param {*} body 
   */
  const upsert = async (body) => {
    /* const { id, text, user_id } = body;
    const post = {
      id: id || nanoid(),
      text,
      user_id,
    }; */
    return store.upsert(TABLE, body);
  };

  return {
    list,
    get,
    upsert,
  };
};