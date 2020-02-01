const winston = require('winston');

/*
const winstonLevels = {
error: 0,
warn: 1,
info: 2,
verbose: 3,
debug: 4,
silly: 5,
};
*/

module.exports = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
});
