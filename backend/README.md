# :notes: Octave: Backend

A handy application to manage music in events, based on public review.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install octave. Browse to the component you wish to install, then

```bash
npm install
```

## Usage

To make all services functional, you need to save configurations in a `.env` file. The file must contain the following entries

```
# Spotify Credentials
SPOTIFY_CLIENT_ID=1000000000854cb19773a5xxxxxxxxxx
SPOTIFY_CLIENT_SECRET=b0000000000a4a45b546eexxxxxxxxxx
SPOTIFY_REDIRECT=http://localhost:3000/spotify/callback

#Number of tracks API must return on search
TRACK_RETURN_LIMIT = 5;

```

When the configurations are set, run the server using

```javascript
node app.js
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](./LICENSE)
