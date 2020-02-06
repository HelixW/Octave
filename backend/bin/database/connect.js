// load configurations
require('dotenv').config();

// load mongoose wrapper
const mongoose = require('mongoose');
const logger = require('./../logger/logger');

logger.info(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`);

// define an instance of database
class Database {
	constructor() {
		this._connect();
	}

	_connect() {
		mongoose
			.connect(
				`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
				{
					useNewUrlParser: true,
					useUnifiedTopology: true,
					useFindAndModify: false,
				},
			)
			.then(() => {
				logger.info('Database Connected');
			})
			.catch((err) => {
				logger.error('Database connection error');
				logger.error(err);
			});
	}
}

// pass instance of database
module.exports = new Database();
