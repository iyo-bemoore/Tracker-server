const mongoose = require("mongoose");

const pointShema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  }
});

const trackShema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    default: ""
  },
  distance: {
    type: Number,
    default: 0
  },
  snapShot: {
    type: String,
    dafault: ""
  },
  seconds: {
    type: Number,
    default: 0
  },
  locations: [pointShema]
});

mongoose.model("Track", trackShema);
