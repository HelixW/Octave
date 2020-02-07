/*
 * @router: To handle routes pointing to / -> homepage
 * @desc: to show basic details of API
 */

require('dotenv').config();

const express = require('express');

// load logger
const logger = require('./../bin/logger/logger');

// create instance of Router
const router = express.Router();

// route to /api. shows welcome message, and (maybe) other stuff too
router.get('/', (req, res) => {
  return res.json({
    message: "Welcome to Octave: ACM's In house music engine",
    documentation: 'https://acmoctave.azurewebsites.net/',
    author: {
      name: 'Yash Kumar Verma',
      profile: 'http://github.com/yashkumarverma',
    },
  });
});

// export everything !
module.exports = router;
