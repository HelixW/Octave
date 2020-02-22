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
    length: {
      type: Number,
      required: true,
    },
    playing: {
      type: Boolean,
      default: false,
    },
    played: {
      type: Boolean,
      default: false,
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
    timestamps: false,
  },
);

module.exports = mongoose.model('track', track);
