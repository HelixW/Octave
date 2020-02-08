// load instance of mongoose to create model
const mongoose = require('mongoose');
const validator = require('validator');

const externalParticipant = new mongoose.Schema({
  googleID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    default: 'undefined',
  },
  phoneNumber: {
    type: String,
    unique: true,
    default: 'undefined',
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: '{value} is invalid email',
    },
  },
  refreshToken: {
    type: String,
  },
  picture: {
    type: String,
  },
});

// export schema
module.exports = mongoose.model(
  'externalParticipant',
  externalParticipant,
);
