/*
 * @router: To handle routes pointing to /spotify
 * @desc: to automate token reload and refresh
 */

require('dotenv').config();

const express = require('express');
const request = require('request');
const spotify = require('./../bin/spotify/spotify');
const logger = require('./../bin/logger/logger');

const router = express.Router();

// define routes
router.get('/', (req, res) => {
  res.json(req.query);
});

router.get('/step1', (req, res) => {
  return res.redirect(spotify.getOAuthUrl());
});

// router to handle callback from server
router.get('/callback', (req, res) => {
  //   prepare parameters to make request
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

  // make request to server
  request(param, (err, response, body) => {
    if (response.statusCode == 200) {
      res.json(JSON.parse(body));
      spotify.saveAccessToken(JSON.parse(body).access_token);
      spotify.saveRefreshToken(JSON.parse(body).refresh_token);
      logger.info('Saved Access Tokens and Refresh Tokens');
    } else {
      logger.error('Invalid Response from Spotify API');
    }
  });
});

router.get('/expose', (req, res) => {
  res.json({
    access_token: spotify.getAccessToken(),
    refresh_token: spotify.getRefreshToken(),
    creation_time: spotify.getTokenCreationTime(),
  });
});

module.exports = router;
