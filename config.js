module.exports =  {
  api: {
    port: process.env.PORT || 3000,
  },
  jwt: {
    secret: process.env.secret || 'secret',
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '1qaz2wsx3edC@',
    database: process.env.MYSQL_DATABASE || 'social_network',
  },
  mysqlService: {
    host: process.env.MYSQL_SVR_HOST || 'localhost',
    port: process.env.MYSQL_SVR_PORT || 3001,
  },
};