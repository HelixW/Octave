/*
 * @router: To handle routes pointing to /api
 * @desc: to provide search / seek api for frontend
 */

require('dotenv').config();

const express = require('express');
const request = require('request');

// load spotify wrapper for all operations related to API
const spotify = require('./../bin/spotify/spotify');

// load google items
const google = require('./../bin/google/google');

// load logger
const logger = require('./../bin/logger/logger');

// seed objects with environment data
spotify.seed();
google.seed();

// create instance of Router
const router = express.Router();

// define a middleware to check authentication
router.use((req, res, next) => {
  logger.info('Middleware working');

  //   if no header is present, then return error
  if (!req.headers.authorization) {
    return res.status(403).json({
      error: true,
      message: 'Not allowed without headers',
    });
  }

  //   try ripping apart the header to see if data sent in correct format
  const auth = req.headers.authorization.split(' ');
  if (auth.length !== 2) {
    logger.error('Invalid Header String Sent');
    return res.status(403).json({
      error: true,
      message: 'Invalid Header String',
    });
  }

  // extract jwt from header
  const data = google.decodeToken(auth[1]);
  if (data.error !== false) {
    return res.status(403).json({
      error: true,
      message: 'Trouble Decoding Token',
    });
  }

  //   now our const data has the data we need
  req.profile = data;
  logger.info('Middleware Test Success');
  next();
});

// route to /api. shows welcome message, and (maybe) other stuff too
router.get('/', (req, res) => {
  res.json({
    message: 'This series of routes handle all calls from frontend',
  });
});

// route to handle song search requests
router.post('/search', (req, res) => {
  const q = req.body.query;

  // if passed query is less than 4 characters, or is null, return error
  if (q === null || q === 'null' || q.length < 2) {
    logger.info(`Search for track '${q}' could not be completed`);
    res.json({
      error: true,
      message:
        'Passed query must be greater than or equal to 2 characters',
    });
  }

  // else fetch the results from api
  const param = spotify.searchTrack(q);

  // make the request to spotify servers
  request(param, (err, response, body) => {
    // check if request made errors
    if (err) {
      logger.err(`Track Search Error:: ${q} :: ${err}`);
    }
    // check if proper response obtained
    if (response.statusCode === 200) {
      // then send data to client
      res.json(spotify.processTracks(body));

      logger.info(`Track Search Complete :: ${q}`);
    } else {
      // handle not ok error codes
      logger.error(
        `Track Search Error :: ${q} :: ${response.statusCode}`,
      );
      res.json({
        error: true,
        message: response.statusCode,
        body: response.body,
      });
    }
  });
});

// export everything !
module.exports = router;
