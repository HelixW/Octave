const mongoose = require('mongoose');

// define attributes for a track
const track = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artists: [
      {
        name: {
          type: String,
        },
      },
    ],
    explicit: {
      type: Boolean,
      required: true,
    },
    media: [
      {
        height: {
          type: Number,
          required: true,
        },
        width: {
          type: Number,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    url: {
      type: String,
      required: true,
    },
    popularity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('track', track);
