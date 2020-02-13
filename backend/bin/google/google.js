require('dotenv').config();

// load requests module
const request = require('request-promise');

// const tokens
const jwt = require('jsonwebtoken');

// load logger
const logger = require('./../logger/logger');

// declare the function to handle everything
function Google() {}

// initialize the object with environment varaibles
Google.prototype.seed = () => {
  this.clientId = process.env.GOOGLE_CLIENT_ID;
  this.clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  this.callbackUrl = process.env.GOOGLE_CALLBACK;
  this.jwtSecret = process.env.JWT_SECRET;
};

// function to generate consent screen url
Google.prototype.generateUrl = (state) => {
  logger.info(`Generating URL :: Current State: ${state}`);
  let url = 'https://accounts.google.com/o/oauth2/auth?';
  url += 'response_type=code';
  url += '&scope=https://www.googleapis.com/auth/userinfo.profile+';
  url += 'https://www.googleapis.com/auth/userinfo.email&';
  url += `&client_id=${this.clientId}`;
  url += `&state=${state}`;
  url += `&redirect_uri=${this.callbackUrl}`;
  url += '&access_type=offline&prompt=consent';
  return url;
};

// funciton to parse information returned from Consent Screen into request body. aka middleware
Google.prototype.exchangeCode = async (req, res, next) => {
  try {
    const body = await request.post({
      url: 'https://accounts.google.com/o/oauth2/token',
      json: true,
      form: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: this.callbackUrl,
      },
    });

    const data = await request.get({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      json: true,
      auth: {
        bearer: body.access_token,
      },
    });

    // save incoming data to request object
    req.profile = data;

    // log new entry to console
    logger.info(`Processing Profile: ${req.profile.given_name}`);

    // save user token
    req.refresh_token = body.refresh_token;

    // pass operation to next
    next();
  } catch (e) {
    logger.error(`ERROR in google.js : ${e.message}`);
    res.json({
      message: 'Something Broke. Sorry',
    });
  }
};

// function to check if passed email is a genuine VIT Email
Google.prototype.checkIfVitEmail = (email) => {
  const exp = /^[a-zA-Z]+\.[a-zA-Z]*201[6789]\@vitstudent.ac.in$/;
  return exp.test(email);
};

// function to generate and return JWTs
Google.prototype.generateToken = (user, state) => {
  const data = {
    id: user.id,
    name: user.given_name,
    picture: user.picture,
    state,
  };

  return jwt.sign(data, this.jwtSecret).toString();
};

// function to decode JWT's
Google.prototype.decodeToken = (token) => {
  try {
    //   being too verbose
    // logger.info('Attempting to decode token');
    return {
      error: false,
      payload: jwt.verify(token, this.jwtSecret),
    };
  } catch (error) {
    logger.error(`Error Decoding Token ${error.message}`);
    return {
      error: true,
      payload: error,
    };
  }
};

module.exports = new Google();
