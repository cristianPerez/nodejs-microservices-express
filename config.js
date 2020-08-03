module.exports =  {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.PORT || 3000,
  },
  post: {
    port: process.env.POST_PORT || 3002,
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
  redis: {
    host: process.env.REDIS_HOST || 'redis-13138.c12.us-east-1-4.ec2.cloud.redislabs.com',
    port: process.env.REDIS_PORT || '13138',
    password: process.env.REDIS_PASSWORD || 'W61XAQ9Acv2dWAizIWWFbayPzfNHcg0i',
  },
  mysqlService: {
    host: process.env.MYSQL_SVR_HOST || 'localhost',
    port: process.env.MYSQL_SVR_PORT || 3001,
  },
  cacheService: {
    host: process.env.REDIS_SVR_HOST || 'localhost',
    port: process.env.REDIS_SVR_PORT || 3003,
  },
};