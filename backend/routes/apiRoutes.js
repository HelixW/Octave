/*
 * @router: To handle routes pointing to /api
 * @desc: to provide search / seek api for frontend
 */

require('dotenv').config();

const express = require('express');
const request = require('request');

// load spotify wrapper for all operations related to API
const spotify = require('./../bin/spotify/spotify');

spotify.seed();

// load logger
const logger = require('./../bin/logger/logger');

// create instance of Router
const router = express.Router();

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
