require('dotenv').config();

function Spotify() {
  // store information about environment
  this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  this.clientId = process.env.SPOTIFY_CLIENT_ID;
  this.redirectUri = process.env.SPOTIFY_REDIRECT;
}

// function to return login url
Spotify.prototype.getOAuthUrl = function() {
  return `https://accounts.spotify.com/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&scope=user-read-private`;
};

// function to store code received from
Spotify.prototype.storeCode = function(code) {
  this.code = code;
};

Spotify.prototype.getCode = function() {
  return this.code;
};

// function to save access token
Spotify.prototype.saveAccessToken = function(code) {
  this.access_token = code;
};
Spotify.prototype.getAccessToken = function() {
  return this.access_token;
};

module.exports = Spotify;
