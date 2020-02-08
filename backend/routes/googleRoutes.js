require('dotenv').config();

// load express
const express = require('express');

// load logger
const logger = require('./../bin/logger/logger');

// load google oauth object
const google = require('./../bin/google/google');

// seed object with environment data
google.seed();

// load database models
const InternalParticipant = require('./../bin/database/internalParticipant.schema');
const ExternalParticipant = require('./../bin/database/externalParticipant.schema');

// create instance of Router
const router = express.Router();

// route to /api. shows welcome message, and (maybe) other stuff too
router.get('/', (req, res) => {
  res.json({
    message: 'This series of routes handle all authentication',
  });
});

// function to take user to consent screen
router.get('/signIn', (req, res) => {
  // check which type of participant it is
  const q = req.query.type;
  let state;
  //   if no parameter passed, then consider participant as internal
  if (q === 'internal' || q === 'external') {
    state = q;
  } else {
    state = 'internal';
  }

  //   log about it on console
  logger.info(`New ${state} participant request`);

  //   take user to logIn
  return res.redirect(google.generateUrl(state));
});

// function to handle data received from OAuth server
router.get('/callback', google.exchangeCode, (req, res) => {
  //   get current state of application
  const { state } = req.query;

  // if request was made as internal participant
  if (state === 'internal') {
    // if non vit email passed by internal participant
    if (!google.checkIfVitEmail(req.profile.email)) {
      logger.warn('Non VIT Email passed by Internal Participant');
      return res.json({
        error: true,
        message: 'Please VIT Email only',
      });
    }

    // check if the user just who just logged in is already registered
    InternalParticipant.findOne(
      {
        googleID: req.profile.id,
      },
      (err, participant) => {
        if (err) {
          return res.json(err);
        }

        // if the given user doesn't exist in database, aka new user
        if (participant == null) {
          logger.info(
            'No Entry about User found in DB, saving right now',
          );

          //  create a new participant instance
          const newParticipant = new InternalParticipant({
            googleID: req.profile.id,
            name: req.profile.name,
            registrationNumber: req.profile.family_name,
            refreshToken: req.refresh_token,
            email: req.profile.email,
            picture: req.profile.picture,
            phoneNumber: null,
            hostelRoom: null,
          });

          //   sync the newly created instance with database
          newParticipant.save((error) => {
            //   if any error, log to console and dispaly error
            if (error) {
              logger.error('Error Saving New Participant');
              return res.json({ error: true, ...error });
            }
            // else show success message
            logger.info(`New User Saved to DB ${req.profile.name}`);
            res.json({
              error: false,
              message: 'New User',
              token: google.generateToken(req.profile, state),
            });
          });
        } else {
          logger.warn('Returning User Encountered');
          return res.json({
            error: false,
            message: 'Existing User',
            token: google.generateToken(req.profile, state),
          });
        }
      },
    );
  } else {
    // check if VIT email passed as external participant
    if (google.checkIfVitEmail(req.profile.email)) {
      logger.warn('VIT Email passed by external participant');
      return res.json({
        error: true,
        message: 'VIT Email passed by external participant',
      });
    }

    // handle external participant information

    ExternalParticipant.findOne(
      { googleID: req.profile.id },
      (err, participant) => {
        // if general runtime error, display it
        if (err) {
          logger.error('Terminating at @googleRoutes.js#128');
          return res.json({
            error: true,
            message: err,
          });
        }

        // if the given user doesn't exist in database, aka new user
        if (participant == null) {
          logger.info(
            'No Entry about User found in DB, saving right now',
          );

          //   create new participant instance
          const newParticipant = new ExternalParticipant({
            googleID: req.profile.id,
            name: req.profile.name,
            email: req.profile.email,
            refreshToken: req.refresh_token,
            picture: req.profile.picture,
          });

          //   sync the newly created instance with database
          newParticipant.save((error) => {
            //   if any error, log to console and dispaly error
            if (error) {
              logger.error('Error Saving New Participant');
              res.json({
                error: true,
                message: error,
              });
            } else {
              // else show success message
              logger.info(`New User Saved to DB ${req.profile.name}`);
              res.json({
                error: false,
                message: 'New User',
                token: google.generateToken(req.profile, state),
              });
            }
          });
        } else {
          logger.warn('Returning User Encountered');
          res.json({
            error: false,
            message: 'Existing User',
            token: google.generateToken(req.profile, state),
          });
        }
      },
    );
  }
});

// function to decode and test JWTs
router.get('/decode/:token', (req, res) => {
  res.json(google.decodeToken(req.params.token));
});

// export everything !
module.exports = router;
