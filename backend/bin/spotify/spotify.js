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

// function to return config to pass to request to search for track
Spotify.prototype.searchTrack = function(q) {
  return {
    method: 'GET',
    uri: `https://api.spotify.com/v1/search?type=track&limit=${process.env.TRACK_RETURN_LIMIT}&q=${q}`,
    headers: {
      Authorization: 'Bearer ' + this.getAccessToken(),
    },
  };
};

Spotify.prototype.processTracks = function(data) {
  data = JSON.parse(data);
  let processedData = [];
  data.tracks.items.forEach(q => {
    // append all artist names
    let artists = [];
    q.artists.forEach(v => {
      artists.push(v.name);
    });

    // check if album art exists
    let image = null;
    if (q.album.images) {
      image = q.album.images;
    }

    processedData.push({
      name: q.name,
      artist: artists,
      explicit: q.explicit,
      popularity: q.popularity,
      media: image,
      url: q.external_urls.spotify,
    });
  });
  return processedData;
  //   return data;
};

module.exports = new Spotify();