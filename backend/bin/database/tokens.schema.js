const mongoose = require('mongoose');

// define attributes for a track
const tokenStorage = new mongoose.Schema({
	access_token: {
		type: String,
		required: true,
	},
	refresh_token: {
		type: String,
		required: true,
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('tokenStorage', tokenStorage);
