const mongoose = require('mongoose');

// define attributes for a track
const track = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    artists: [
      {
        type: String,
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
    upvotes: {
      type: Number,
      default: 0,
    },
    upvoters: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('track', track);
