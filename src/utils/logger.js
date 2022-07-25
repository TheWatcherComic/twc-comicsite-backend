const pino = require('pino');

const log = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
});

module.exports = log;