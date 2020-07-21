const error = (message, code) => {
  debugger
  let e = new Error(message);
  if(code) {
    e.statusCode = code;
  }
  return e;
};

module.exports = error;