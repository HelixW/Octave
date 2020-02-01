/*
 * @router: To handle routes pointing to /spotify
 * @desc: to automate token reload and refresh
 */

require('dotenv').config();

const express = require('express');

const logger = require('./../bin/logger/logger');

const Spotify = require('./../bin/spotify/spotify');

const request = require('request');

const spotify = new Spotify();

const router = express.Router();

// create one instance of spotify

// define routes
router.get('/', (req, res) => {
  res.json(req.query);
});

// handle step 1 of auth, take admin to other part
router.get('/step1', (req, res) => {
  res.send(spotify.getOAuthUrl());
});

// router to handle callback from server
//   make request -> help needed here
router.get('/callback', (req, res) => {
  spotify.storeCode(req.query.code);
  const param = {
    method: 'POST',
    uri: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: 'Bearer ' + spotify.getCode(),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      client_id: spotify.clientId,
      client_secret: spotify.clientSecret,
      redirect_uri: spotify.redirectUri,
      code: spotify.code,
      grant_type: 'authorization_code',
    },
  };

  // this should return data resembling -> method working on postman, some issues when same done using requests
  // {
  // "access_token": "BQBgZQfY1JuLFi-NAh_P0bUaPYSl7Dm71Olk65tUhwkg-8Dyg5ebdraG9a9Gayhnd3fr-_5m0P6wgKCGGyM9qz2ksljLImUPV54GXrgSyPIKEEePp_6bdG9yIxnR9JUDGuRn7sgUBFW3HjMU3Io-DKtr9ZB_Z0qSDrAEnebAxupxen4",
  // "token_type": "Bearer",
  // "expires_in": 3600,
  // "refresh_token": "AQA9m-pLeRQNZfuQCa5Dz0ImVzYe6Tqaz0lii_12b_tng_IqOAWUBqLHdobQkcwpmxD7Mk_NhRtOSyyvs4VRyrKKQE0-rlYXDeMO2gfbolpHGKeLHGkkM9wsn3mOd1ZXtug",
  // "scope": "user-read-private"
  // }
  request(param, (err, response, body) => {
    res.json({
      code: req.query.code,
      body: body,
      response: response,
    });

    // save___________________________________________________________________ access token (manual workaround)
    const accessToken =
      'BQBgZQfY1JuLFi-NAh_P0bUaPYSl7Dm71Olk65tUhwkg-8Dyg5ebdraG9a9Gayhnd3fr-_5m0P6wgKCGGyM9qz2ksljLImUPV54GXrgSyPIKEEePp_6bdG9yIxnR9JUDGuRn7sgUBFW3HjMU3Io-DKtr9ZB_Z0qSDrAEnebAxupxen4';
    spotify.saveAccessToken(accessToken);
  });
});

// unexpected behavior -> when i open this url, for the first instance, it shows the stored variables, later on it shows nothing. blank
router.get('/expose', (req, res) => {
  res.json({
    code: spotify.getCode(),
    access_token: spotify.getAccessToken(),
  });
});

module.exports = router;
