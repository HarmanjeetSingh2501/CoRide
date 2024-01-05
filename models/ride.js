const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  pickupLocation: {
    type: String,
    required: true,
  },
  dropoffLocation: {
    type: String,
    required: true,
  },
  selectedAmount: {
    type: Number,
    required: true,
  },
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
