require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const logger = require('./bin/logger/logger');

const app = express();
const port = process.env.PORT || 3000;

app.use(
  bodyparser.urlencoded({
    extended: true,
  }),
);

app.use(bodyparser.json());
app.listen(port, () => {
  logger.info(`Express server started at port: ${port}`);
});
