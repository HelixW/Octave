require('dotenv').config();

// load express
const express = require('express');

// load bodyparser to parse post bosy
const bodyparser = require('body-parser');

// load request module
const request = require('request');

// load logger for easy debug
const logger = require('./bin/logger/logger');

// create instance of express
const app = express();

// define port to start server on
const port = process.env.PORT || 3000;

// connect to databse
const database = require('./bin/database/connect');

// for refreshing
const spotify = require('./bin/spotify/spotify');
const TokenStorage = require('./bin/database/tokens.schema');

spotify.seed();

// load routes for various handles
const apiRoutes = require('./routes/apiRoutes');
const googleRoutes = require('./routes/googleRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes');
const landingPageRoutes = require('./routes/landingPageRoutes');

// parse valid requests only
app.use(
  bodyparser.urlencoded({
    extended: true,
  }),
);

app.use(bodyparser.json());

// bind routes to application
app.use('/', landingPageRoutes);
app.use('/api', apiRoutes);
app.use('/spotify', spotifyRoutes);
app.use('/google', googleRoutes);

// start listening on ports
app.listen(port, () => {
  logger.info(`Express server started at port: ${port}`);
});

function refreshToken() {
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
    } else {
      // handle non 200 response from server
      logger.error('Error Refreshing Access Code');
    }
  });

  //   ends
}

// setTimeout(refreshToken, 1000 * 2);
// setInterval(refreshToken, 1000 * 60 * 40);
