/*
 * @router: To handle routes pointing to /spotify
 * @desc: to automate token reload and refresh
 */

require('dotenv').config();
const express = require('express');
const request = require('request');

// load spotify wrapper for all operations related to API
const spotify = require('./../bin/spotify/spotify');

// load logger
const logger = require('./../bin/logger/logger');

// load TokenStorage Database schema
const TokenStorage = require('./../bin/database/tokens.schema');

// load tracks schema from database
const Tracks = require('./../bin/database/track.schema');

// create instance of Router
const router = express.Router();

// Nothing Much to handle on homepage
router.get('/', (req, res) => {
  res.json(req.query);
});

// First Step towards token management, needs to be triggered when app starts
router.get('/step1', (req, res) => {
  // will find the token stored in DB
  TokenStorage.findOne({}, (err, tokens) => {
    // if error, log into console
    if (err) {
      res.json({
        error: err,
      });
      logger.error(`Error Exposing Tokens ${err}`);
    } else if (tokens == null) {
      // if collection empty, trigger creation to new tokens
      logger.info('No Tokens found in DB. Triggering Creation');
      return res.redirect(spotify.getOAuthUrl());
    } else {
      // if collection not empty, transfer tokens to local object
      spotify.saveAccessToken(tokens.access_token);
      spotify.saveRefreshToken(tokens.refresh_token);

      // log changes to console
      logger.info('Tokens Loaded from DB');
      return res.json({
        status: 'Loaded from DB',
      });
    }
  });
});

// router to handle callback from server, to save tokens
router.get('/callback', (req, res) => {
  // prepare parameters to make request
  const param = {
    method: 'POST',
    uri: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      client_id: spotify.clientId,
      client_secret: spotify.clientSecret,
      redirect_uri: spotify.redirectUri,
      code: req.query.code,
      grant_type: 'authorization_code',
    },
  };

  // make request to server to get tokens
  request(param, (err, response, body) => {
    if (response.statusCode === 200) {
      // when status OK

      // parse the body received
      res.json(JSON.parse(body));

      // store access_token and refresh_token
      const accessToken = JSON.parse(body).access_token;
      const refreshToken = JSON.parse(body).refresh_token;

      // sync tokens to local object
      spotify.saveAccessToken(accessToken);
      spotify.saveRefreshToken(refreshToken);

      // flush any old token stored in  DB
      TokenStorage.deleteOne({}, (error) => {
        if (error) {
          logger.error(`Error Flushing Tokens ${err}`);
        }
      });

      // to sync entries to database, populate model
      const tokenStorage = new TokenStorage({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      // sync model with database
      tokenStorage.save((error) => {
        if (error) {
          logger.error(`Error syncing Tokens ${err}`);
        } else {
          logger.info('Tokens saved to database');
        }
      });
    } else {
      // if invalid response from API, report to console.
      logger.error('Invalid Response from Spotify API');
    }
  });
});

// route to regenerate token
router.get('/refresh', (req, res) => {
  // prepare parameters to make request
  const param = {
    method: 'POST',
    uri: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: spotify.getRefreshToken(),
      client_id: spotify.clientId,
      client_secret: spotify.clientSecret,
    },
  };

  // make request to server with params
  request(param, (error, response, body) => {
    if (response.statusCode === 200) {
      // if status OK, save access_token to local object
      const accessToken = JSON.parse(body).access_token;
      spotify.saveAccessToken(accessToken);

      // update database with new token
      TokenStorage.findOneAndUpdate(
        {},
        {
          access_token: accessToken,
        },
        (err) => {
          // log into console if error
          if (err) {
            logger.info('Error Syncing New Token with DB');
          } else {
            // log success operation
            logger.info('New Token Synced with DB');
          }
        },
      );

      // send status to user
      res.json({
        success: 1,
        newAccessToken: accessToken,
      });
    } else {
      // handle non 200 response from server
      logger.error('Error Refreshing Access Code');
      res.end();
    }
  });
});

// route to test song search
router.get('/search', (req, res) => {
  request(spotify.searchTrack(req.query.q), (error, response, body) => {
    if (response.statusCode === 200) {
      res.json(spotify.processTracks(body));
    } else {
      logger.error(`Could not search for string: ${req.query.q}`);
      res.json(JSON.parse(body));
    }
  });
});

// route to display currently operational tokens
router.get('/expose', (req, res) => {
  // query database for token, and dispaly
  TokenStorage.findOne({}, (err, tokens) => {
    if (err) {
      res.json({
        error: err,
      });
      logger.error(`Error Exposing Tokens ${err}`);
    } else if (tokens == null) {
      // when no tokens in db, tigger creation of new
      logger.info('No Tokens found in DB. Triggering Creation');
      return res.redirect(spotify.getOAuthUrl());
    } else {
      // display tokens to end user
      res.json({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        created_at: tokens.createdAt,
      });
      logger.info('Tokens Exposed');
    }
  });
});

// route to flush currently existing tokens
router.get(`/${process.env.FLUSH_ROUTE}`, (req, res) => {
  // delete any old token stored
  TokenStorage.deleteOne({}, (err) => {
    if (err) {
      logger.error(`Error Flushing Tokens ${err}`);
      res.json({
        status: 'NOT OK',
      });
    } else {
      logger.info('Tokens Flushed');
      res.json({
        status: 'OK',
      });
    }
  });
});

function workLive() {
  let oldId, oldName;
  request(spotify.getCurrentPlayerConfig(), (err, resp) => {
    // if any error in making request
    if (err) {
      // log about it
      logger.error(`Error getting Live Status : ${err.message}`);

      //  show response to user
      //   res.json({
      //     error: true,
      //     message: 'Internal systems error',
      //   });
      //   if empty response code received, thanks to spotify for using this status code :)
    } else if (resp.statusCode === 204) {
      // return response to caller
      logger.error('Player inactive');
      //   res.json({
      //     error: true,
      //     payload: undefined,
      //     message: 'Player inactive',
      //   });
      //   if we somehow end our rate limit
    } else if (resp.statusCode === 429) {
      logger.error('Rate Limit Touched');

      //   if valid response received from spotify, handle it
    } else if (resp.statusCode === 200) {
      const data = JSON.parse(resp.body);
      // get current playing songs length
      if (data == null) {
        logger.error('ADS !!!');
        return;
      }

      const progress = data.progress_ms;
      const length = data.item.duration_ms;
      const diff = Math.floor((length - progress) / 1000);

      //   TODO -> prevent continous addition of song to playlist

      //   mark the song as "playing"
      Tracks.updateOne({ id: data.item.id }, { playing: true }, (err) => {
        if (err) {
          logger.error(`Error ${err.message}`);
        } else {
          logger.info(`Track : ${data.item.name} : Ends in ${diff} seconds`);
        }
      });

      // when only 10 seconds remain to add a new song
      if (diff < 10) {
        //   time to load a new song from database
        // change status of currently playing song

        // now time to mark it as "played"
        Tracks.updateOne({ id: data.item.id }, { played: true, playing: false }, (err) => {
          if (err) {
            logger.error(`Error ${err.message}`);
          } else {
            logger.info(`Track : ${data.item.name} : play ${diff} seconds more`);
          }
        });

        Tracks.findOne({ played: false })
          .sort('-upvotes')
          .exec((error, track) => {
            if (error) {
              logger.error(`Error finding new track to add ${error.message}`);

              // no more tracks left :(
            } else if (track == null) {
              logger.error('LeaderBoard Empty. Let Spotify play automatically');

              //   if a new track is found, then set playing, played = true, and add it to the queue
            } else {
              //   add song to playlist
              request(spotify.addSongToPlaylist(track.id), (err, resp) => {
                // if any general error
                if (err) {
                  logger.error('Error making request to add song to playlist');
                  // if non 200 response code
                } else if (resp.statusCode !== 201) {
                  logger.error(`Invalid Status Code while adding song to playlist : ${resp.statusCode}`);
                  // if successful return
                } else {
                  logger.info(`Track : ${track.title} : Added to Playlist`);
                }
              });
              //   add song to playlist ends
            }
          });
      }
      //

      // show data to user
      //   res.json({
      //     error: false,
      //     payload: {
      //       something: 'awesome',
      //     },
      //     message: 'ok',
      //   });
    }
    // perform further operations
    //   if non 200 response code received, throw error
    else {
      // log about error in console
      logger.error(`Invalid statusCode while getting Live Status ${resp.statusCode}`);
      //   show message to user
      //   res.json({
      //     error: true,
      //     message: 'Abnormal response from server',
      //   });
    }
  });
}

router.get('/test', (req, res) => {
  let oldId = 'currentPlayingId';
  Tracks.findOne({ played: false })
    .sort('-upvotes')
    .exec((error, track) => {
      if (error) {
        logger.error(`Error finding new track to add ${error.message}`);

        // no more tracks left :(
      } else if (track == null) {
        logger.error('LeaderBoard Empty. Let Spotify play automatically');

        //   if a new track is found, then set playing, played = true, and add it to the queue
      } else {
        //   add song to playlist
        request(spotify.addSongToPlaylist(track.id), (err, resp) => {
          // if any general error
          if (err) {
            logger.error('Error making request to add song to playlist');
            // if non 200 response code
          } else if (resp.statusCode !== 201) {
            logger.error(`Invalid Status Code while adding song to playlist : ${resp.statusCode}`);
            // if successful return
          } else {
            logger.info(`Song ${track.title} added to live spotify platlist`);
          }
        });
        //   add song to playlist ends
      }
    });
});
router.get('/reset', (req, res) => {
  res.send('CLEARED');
  Tracks.updateMany({}, { played: false }, { multi: true }, (err) => {
    console.log(err);
  });
});

// function to return live data about player. supposed to be called once every n seconds
// router.get('/live', (req, res) => {});
setInterval(workLive, 11 * 1000);

// export everything !
module.exports = router;
