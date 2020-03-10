const mongoose = require("mongoose");

const pointShema = new mongoose.Schema({
  latitude: Number,
  longitude: Number
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
  timeElapsed: {
    type: String,
    default: 0
  },
  locations: [pointShema]
});

mongoose.model("Track", trackShema);
