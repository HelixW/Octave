// load configurations
require('dotenv').config();

// load mongoose wrapper
const mongoose = require('mongoose');

// define an instance of database
class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(
        `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
      )
      .then(() => {
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error('Database connection error');
      });
  }
}

// pass instance of database
module.exports = new Database();
