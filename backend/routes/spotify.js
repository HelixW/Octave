/*
 * @router: To handle routes pointing to /spotify
 * @desc: to automate token reload and refresh
 */

require('dotenv').config();

const express = require('express');
const request = require('request');
const fs = require('fs');
const spotify = require('./../bin/spotify/spotify');
const logger = require('./../bin/logger/logger');
const database = require('./../bin/database/connect');
const TokenStorage = require('./../bin/database/tokens.schema');

const router = express.Router();

// define routes
router.get('/', (req, res) => {
	res.json(req.query);
});

// route to initiate token generation process
router.get('/step1', (req, res) => {
	TokenStorage.findOne({}, (err, tokens) => {
		if (err) {
			res.json({
				error: err
			});
			logger.error(`Error Exposing Tokens ${err}`);
		} else if (tokens == null) {
			logger.info(`No Tokens found in DB. Triggering Creation`)
			return res.redirect(spotify.getOAuthUrl());
		}
		else {
			spotify.saveAccessToken(tokens.access_token);
			spotify.saveRefreshToken(tokens.refresh_token)
			logger.info(`Tokens Loaded from DB`);
			return res.json({
				status: `Loaded from DB`
			});
		}
	});
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
			const access_token = JSON.parse(body).access_token;
			const refresh_token = JSON.parse(body).refresh_token;

			spotify.saveAccessToken(access_token);
			spotify.saveRefreshToken(refresh_token);

			// write entries to database;
			const tokenStorage = new TokenStorage({
				access_token: access_token,
				refresh_token: refresh_token,
			});

			// delete any old token stored
			TokenStorage.deleteOne({}, (err) => {
				if (err) {
					logger.error(`Error Flushing Tokens ${err}`);
				}
			});

			// now save the new tokens
			tokenStorage.save((err, data) => {
				if (err) {
					logger.error(`Error syncing Tokens ${err}`);
				} else {
					logger.info('Tokens saved to database');
				}
			});
		} else {
			logger.error('Invalid Response from Spotify API');
		}
	});
});

// function to regenerate application tokens
router.get('/refresh', (req, res) => {
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
	request(param, (error, response, body) => {
		if (response.statusCode == 200) {
			spotify.saveAccessToken(JSON.parse(body).access_token);
			logger.info('Saved Renewed Access Token');
			res.json({
				success: 1,
				body: JSON.parse(body)
			});
		} else {
			logger.error('Error Refreshing Access Code');
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

// function to display currently saved tokens
router.get('/expose', (req, res) => {
	// query database for token, and dispaly
	TokenStorage.findOne({}, (err, tokens) => {
		if (err) {
			res.json({
				error: err
			});
			logger.error(`Error Exposing Tokens ${err}`);
		} else if (tokens == null) {
			// when no tokens in db
			logger.info(`No Tokens found in DB. Triggering Creation`)
			return res.redirect(spotify.getOAuthUrl());
		} else {
			res.json({
				access_token: tokens.access_token,
				refresh_token: tokens.refresh_token,
				created_at: tokens.createdAt,
			});
			logger.info(`Tokens Exposed`);
		}
	});
});

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

module.exports = router;
