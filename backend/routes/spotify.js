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

const router = express.Router();

// define routes
router.get('/', (req, res) => {
	res.json(req.query);
});

router.get('/step1', (req, res) => {

	// if local tokens are stored
	if (fs.existsSync(process.env.LOCAL_FILE_NAME)) {
		logger.info('Local Tokens flound, loading');

		// parse the data from local file
		const data = JSON.parse(fs.readFileSync(process.env.LOCAL_FILE_NAME, 'utf8'));
		spotify.saveAccessToken(data.access_token);
		spotify.saveRefreshToken(data.refresh_token);

		// send response to user
		res.send('Local tokes loaded');
	} else {
		return res.redirect(spotify.getOAuthUrl());
	}
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

			//   now save the data locally
			const data = JSON.stringify({
				access_token: spotify.getAccessToken(),
				refresh_token: spotify.getRefreshToken(),
			});
			fs.writeFileSync(process.env.LOCAL_FILE_NAME, data, 'utf8');
			logger.info('Saved Access Tokens and Refresh Tokens to local file');

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

router.get('/expose', (req, res) => {
	res.json({
		access_token: spotify.getAccessToken(),
		refresh_token: spotify.getRefreshToken(),
		creation_time: spotify.getTokenCreationTime(),
	});
});

module.exports = router;
