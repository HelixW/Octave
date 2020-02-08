// load instance of mongoose to create model
const mongoose = require('mongoose');
const validator = require('validator');

const internalParticipant = new mongoose.Schema({
  googleID: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    default: 'undefined',
    minlength: 10,
  },
  hostelRoom: {
    type: String,
    default: 'undefined',
  },
  refreshToken: {
    type: String,
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
  picture: {
    type: String,
  },
});

// export schema
module.exports = mongoose.model(
  'internalParticipant',
  internalParticipant,
);
