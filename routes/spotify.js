const express = require('express');

const logger = require('./../bin/logger/logger');

const router = express.Router();

router.get('/', (req, res) => {
  logger.info(req.query);
});
