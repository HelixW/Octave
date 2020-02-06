const mongoose = require('mongoose');
const Track = require('./track.schema');

// define leaderBoardEntry
const leaderBoard = new mongoose.Schema({
  track: Track,
  upvotes: {
    type: Number,
    default: 0,
  },
  upvoters: [
    {
      email: {
        type: String,
        required: true,
      },
    },
  ],
  rank: {
    type: Number,
    default: -1,
    required: true,
  },
});

module.exports = mongoose.model('leaderBoard', leaderBoard);
