const request = require('request');

const { log } = console;

function createRemoteBD(host, port) {
  const URL = `http://${host}:${port}`;
  const list = (table) => req('GET', table);
  
  const req = (method, table, data = {}) => {
    const url = `${URL}/${table}`;
    let bodyStub;
    
    return new Promise((resolve, reject) => {
      request({
        method,
        headers: {
          'content-type': 'application/json',
        },
        url,
        body: bodyStub,
      }, (err, req, body) => {
        if(err) {
          log('[Remote BD ERROR]', err);
          return reject(err.message);
        }
        const resp = JSON.parse(body);
        return resolve(resp.body);
      });
    });
  }

  return {
    list,
  };
};

module.exports = createRemoteBD;