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

// function to save access token
Spotify.prototype.saveAccessToken = function(code) {
  this.setTokenCreationTime();
  this.access_token = code;
};
Spotify.prototype.getAccessToken = function() {
  return this.access_token;
};

// function to interact with refresh tokens
Spotify.prototype.saveRefreshToken = function(code) {
  this.refresh_token = code;
};
Spotify.prototype.getRefreshToken = function() {
  return this.refresh_token;
};

// save time of creation
Spotify.prototype.setTokenCreationTime = function() {
  this.tokenCreationTime = Math.floor(new Date().getTime() / 1000);
};

Spotify.prototype.getTokenCreationTime = function() {
  return this.tokenCreationTime;
};

module.exports = new Spotify();
