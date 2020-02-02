const winston = require('winston');

/*
const winstonLevels = {
error: 0,
warn: 1,
info: 2,
};
*/

module.exports = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
});
