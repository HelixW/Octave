/*
 * @router: To handle routes pointing to /spotify
 * @desc: to automate token reload and refresh
 */

require('dotenv').config();

const express = require('express');
const request = require('request');
const fs = require('fs');

// load spotify wrapper for all operations related to API
const spotify = require('./../bin/spotify/spotify');

// load logger
const logger = require('./../bin/logger/logger');

// load TokenStorage Database schema
const database = require('./../bin/database/connect')
const TokenStorage = require('./../bin/database/tokens.schema');

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
				error: err
			});
			logger.error(`Error Exposing Tokens ${err}`);

		} else if (tokens == null) {
			// if collection empty, trigger creation to new tokens
			logger.info(`No Tokens found in DB. Triggering Creation`)
			return res.redirect(spotify.getOAuthUrl());
		}
		else {
			// if collection not empty, transfer tokens to local object
			spotify.saveAccessToken(tokens.access_token);
			spotify.saveRefreshToken(tokens.refresh_token);

			// log changes to console
			logger.info(`Tokens Loaded from DB`);
			return res.json({
				status: `Loaded from DB`
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
		if (response.statusCode == 200) {
			// when status OK

			// parse the body received
			res.json(JSON.parse(body));

			// store access_token and refresh_token
			const access_token = JSON.parse(body).access_token;
			const refresh_token = JSON.parse(body).refresh_token;

			// sync tokens to local object
			spotify.saveAccessToken(access_token);
			spotify.saveRefreshToken(refresh_token);

			// flush any old token stored in  DB
			TokenStorage.deleteOne({}, (err) => {
				if (err) {
					logger.error(`Error Flushing Tokens ${err}`);
				}
			});

			// to sync entries to database, populate model
			const tokenStorage = new TokenStorage({
				access_token: access_token,
				refresh_token: refresh_token,
			});


			// sync model with database
			tokenStorage.save((err, data) => {
				if (err) {
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
		if (response.statusCode == 200) {
			// if status OK, save access_token to local object
			const access_token = JSON.parse(body).access_token;
			spotify.saveAccessToken(access_token);

			// update database with new token
			TokenStorage.findOneAndUpdate({}, {
				access_token: access_token
			}, (err) => {
				// log into console if error
				if (err) {
					logger.info(`Error Syncing New Token with DB`);
				} else {
					// log success operation
					logger.info(`New Token Synced with DB`);
				}
			});

			// send status to user
			res.json({
				success: 1,
				newAccessToken: access_token,
			});
		} else {
			// handle non 200 response from server
			logger.error(`Error Refreshing Access Code`);
			res.end();
		}
	});
});

// route to test song search
router.get('/search', (req, res) => {
	request(
		spotify.searchTrack(req.query.q),
		(error, response, body) => {
			if (response.statusCode == 200) {
				res.json(spotify.processTracks(body));
			} else {
				logger.error(`Could not search for string: ${req.query.q}`);
				res.json(JSON.parse(body));
			}
		},
	);
});

// route to display currently operational tokens
router.get('/expose', (req, res) => {
	// query database for token, and dispaly
	TokenStorage.findOne({}, (err, tokens) => {
		if (err) {
			res.json({
				error: err
			});
			logger.error(`Error Exposing Tokens ${err}`);
		} else if (tokens == null) {
			// when no tokens in db, tigger creation of new
			logger.info(`No Tokens found in DB. Triggering Creation`)
			return res.redirect(spotify.getOAuthUrl());
		} else {
			// display tokens to end user
			res.json({
				access_token: tokens.access_token,
				refresh_token: tokens.refresh_token,
				created_at: tokens.createdAt,
			});
			logger.info(`Tokens Exposed`);
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
			logger.info(`Tokens Flushed`);
			res.json({
				status: 'OK',
			});
		}
	});
});

// export everything !
module.exports = router;
