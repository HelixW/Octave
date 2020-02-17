/*
 * @router: To handle routes pointing to /api
 * @desc: to provide search / seek api for frontend
 */

require('dotenv').config();

// load express engine
const express = require('express');

// to make requests
const request = require('request');

// load spotify wrapper for all operations related to API
const spotify = require('./../bin/spotify/spotify');

// load google items
const google = require('./../bin/google/google');

// load logger
const logger = require('./../bin/logger/logger');

// load database model
const Track = require('./../bin/database/track.schema');

// seed objects with environment data
spotify.seed();
google.seed();

// create instance of Router
const router = express.Router();

// define a middleware to check authentication
router.use((req, res, next) => {
  //   logger.info('Middleware working');

  //   if no header is present, then return error
  if (!req.headers.authorization) {
    logger.warn('Stopped unauthorized access, without header');
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
  //   being too berbose
  //   logger.info('Middleware Test Success');
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
      //   res.json(JSON.parse(body));
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

router.post('/upvote', (req, res) => {
  // check if sufficient data sent to complete request
  if (!req.body.id) {
    logger.error('No ID passed to upvote');
    res.json({
      error: 1,
      message: 'No Id to identify track',
    });
  }

  //   get id from request
  const { id } = req.body;

  // check if particular id exists in database
  Track.findOne({ id }, (error, data) => {
    // if any random runtime error, handle it
    if (error) {
      // log about it on console
      logger.error('Error fetching leaderboard');
      res.json({
        error: 1,
        message: error,
      });

      //   if no data was returned from db, then invalid track was passed
    } else if (data == null) {
      logger.warn('Track with given ID Not in database');
      //   display error to user
      res.json({
        error: 1,
        message: 'Error locating track in leaderboard',
      });
      //   check if given user already in database
    } else if (data.upvoters.includes(req.profile.payload.id)) {
      // user already in upvoters list, so time to take the upvote back
      Track.updateOne(
        { id },
        {
          $inc: { upvotes: -1 },
          $pull: { upvoters: req.profile.payload.id },
        },
        { multi: false },
        (err, resp) => {
          //   if any error updating data
          if (err) {
            //   log error to console
            logger.error(err);
            res.json({
              error: 1,
              message: 'Error processing upvote',
            });
          } else {
            logger.info(
              `Removing upvoter ${req.profile.payload.id} from ${id}`,
            );
            // send what happened, newVote, or removeVote
            res.json({
              error: 0,
              upvoteStatus: 'voteRemoved',
              math: -1,
            });
          }
        },
      );

      // user not in upvoters list, add user to upvoter list
    } else {
      Track.updateOne(
        { id },
        {
          $inc: { upvotes: 1 },
          $push: { upvoters: req.profile.payload.id },
        },
        (err, resp) => {
          // check if any error in updating
          if (err) {
            //   log out the error
            logger.error(err);

            // show error to user
            res.json({
              error: 1,
              message: 'Error updating track upvotes',
            });
            // if upvoter success
          } else {
            //   logggggin
            logger.info(
              `Adding upvoter ${req.profile.payload.id} to ${id}`,
            );

            // send what happened, newVote, or removeVote
            res.json({
              error: 0,
              upvoteStatus: 'voteCounted',
              math: 1,
            });
          }
        },
      );
    }
  });
});

router.post('/request', (req, res) => {
  // if body is incomplete
  if (!req.body.id) {
    logger.error('Incomplete Request Received');
    return res.json({
      error: 1,
      message: 'Incomplete Request',
    });
  }

  //   load id from post body
  const { id } = req.body;

  // check if entry already in database
  Track.findOne({ id }, (error, data) => {
    // if any general runtime error, log it and tackle it
    if (error) {
      logger.error(`Error finding track with id: ${id}`);

      // display error to user
      res.json({
        error: 1,
        message: 'Error connecting to database',
      });

      //   now if database didn't throw any error, check if data was null -> item not in db
    } else if (data == null) {
      // now get all data about passed id from spotify
      //   get all parameters fror request
      const param = spotify.getTrackFromId(id);

      // make request to spotify servers
      request(param, (err, resp) => {
        // if any error in making request, tackle it
        if (err) {
          //   log the error in console
          logger.error(`Error getting data of passed id ${id}`);

          //   show error message to user
          res.json({
            error: 1,
            message: 'Error getting data',
          });

          //   if request was made successfully, check if valid code received
        } else if (resp.statusCode === 200) {
          // get data in acceptable format
          const songData = spotify.processTrack(resp.body);

          //   create new object to store data into database
          const track = new Track({
            id: songData.id,
            title: songData.name,
            explicit: songData.explicit,
            media: songData.media,
            url: songData.url,
            popularity: songData.popularity,
            artists: songData.artist,
            upvotes: 1,
            upvoters: [req.profile.payload.id],
            length: songData.length,
          });

          // save the object to database
          track.save((e) => {
            // if any error in saving data
            if (e) {
              logger.error(
                `Error saving data of id ${id} : ${e.message}`,
              );
              res.json({
                error: 1,
                message: 'Internal database Error',
              });

              //   if no error, then show success message to user
            } else {
              logger.info(`New track added id:${id}`);
              res.json({
                error: 0,
                message: 'Track Added to LeaderBoard',
              });
            }
          });
        } else {
          // if invalid response received
          logger.error(`Non 200 Status Code : ${resp.statusCode}`);
          res.json({
            error: 1,
            message: `Invalid status code : ${resp.statusCode}`,
          });
        }
      });
      //   if data of particular id already in database, show error
    } else {
      logger.warn(`Re-Insert Request for id : ${id}`);
      res.json({
        error: 1,
        message:
          'Track already in leaderboard. Upvote request expected',
      });
    }
  });
  //   track finding ends here
});

// just vomit all data
router.get('/leaderBoard', (req, res) => {
  Track.find({}, (err, data) => {
    if (err) {
      res.json({
        error: 1,
        message: err,
      });
    } else {
      res.json({ data });
    }
  });
});

// export everything !
module.exports = router;
